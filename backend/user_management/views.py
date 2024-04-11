from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.utils.translation import gettext, get_language_from_request, activate
from drf_yasg.utils import swagger_auto_schema
from django.db.utils import IntegrityError
from .serializers import UserLoginRequestSerializer, UserLoginResponseSerializer, RegisterUserRequestSerializer, RegisterUserResponseSerializer
from song_ratings.serializers import UserRatingSerializer
from song_ratings.models import Rating
from .models import UserLocalization


class UserLogin(APIView):
    @swagger_auto_schema(request_body=UserLoginRequestSerializer, responses={200: UserLoginResponseSerializer})
    def post(self, request):
        email: str = request.data.get('email')
        password: str = request.data.get('password')

        if not email or not password:
            return Response({"message": gettext("email_password_required")}, status=status.HTTP_400_BAD_REQUEST)

        user: User = authenticate(username=email, password=password)

        if not user:
            return Response({"message": gettext("invalid_email_password")}, status=status.HTTP_400_BAD_REQUEST)

        locale_user_data = UserLocalization.get_user_localized_data(user)

        try:
            ratings = Rating.objects.filter(user=user)
            parsed_ratings = UserRatingSerializer(ratings, many=True)
        except Rating.DoesNotExist:
            ratings = []

        request.session['user_id'] = user.id

        return Response({"user": 
                         {"id": user.id, 
                          "firstName": locale_user_data.get('first_name'), 
                          "lastName": locale_user_data.get('last_name'), 
                          "preferredLanguage": locale_user_data.get('language_code') or "", 
                          "userRatings" : parsed_ratings.data or ratings
                          }
                        }, status=status.HTTP_200_OK)


class RegisterUser(APIView):
    @swagger_auto_schema(request_body=RegisterUserRequestSerializer, responses={201: RegisterUserResponseSerializer})
    def post(self, request):
        email: str = request.data.get('email')
        password: str = request.data.get('password')
        first_name: str = request.data.get('first_name')
        last_name: str = request.data.get('last_name')
        preferred_language: str = get_language_from_request(request)

        activate(preferred_language)

        if not email or not password:
            return Response({"message": gettext("email_password_required")}, status=status.HTTP_400_BAD_REQUEST)

        if not first_name or not last_name:
            return Response({"message": gettext("firstname_lastname_required")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user: User = User.objects.create_user(
                username=email, password=password, first_name=first_name, last_name=last_name)
            UserLocalization.objects.create(
                user=user, language_code=preferred_language, first_name=first_name, last_name=last_name)
        except IntegrityError:
            return Response({"message": gettext("user_already_exists") + " " + {email}}, status=status.HTTP_400_BAD_REQUEST)

        if not user:
            return Response({"message": gettext("user_not_created")}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": gettext("user_created")}, status=status.HTTP_201_CREATED)


class GetUser(APIView):
    def get(self, request):
        user_id: int = request.session.get('user_id')
        preferred_language: str = get_language_from_request(request)

        activate(preferred_language)

        if not user_id:
            return Response({"message": gettext("no_user_id")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            locale_user_data = UserLocalization.get_user_localized_data(user)
        except User.DoesNotExist:
            return Response({"message": gettext("user_not_found")}, status=status.HTTP_404_NOT_FOUND)

        try:
            ratings = Rating.objects.filter(user=user)
            parsed_ratings = UserRatingSerializer(ratings, many=True)
        except Rating.DoesNotExist:
            ratings = []

        return Response({"user": 
                         {"id": user.id, 
                          "firstName": locale_user_data.get('first_name'), 
                          "lastName": locale_user_data.get('last_name'), 
                          "preferredLanguage": locale_user_data.get('language_code') or "", 
                          "userRatings" : parsed_ratings.data or ratings
                          }
                        }, status=status.HTTP_200_OK)


class UpdateUser(APIView):
    @swagger_auto_schema(request_body=RegisterUserRequestSerializer, responses={201: RegisterUserResponseSerializer})
    def put(self, request):
        email: str = request.data.get('email')
        password: str = request.data.get('password')
        first_name: str = request.data.get('first_name')
        last_name: str = request.data.get('last_name')
        preferred_language: str = get_language_from_request(request)

        activate(preferred_language)

        if not email or not password:
            return Response({"message": gettext("email_password_required")}, status=status.HTTP_400_BAD_REQUEST)

        if not first_name or not last_name:
            return Response({"message": gettext("firstname_lastname_required")}, status=status.HTTP_400_BAD_REQUEST)

        user_id: int = request.session.get('user_id')

        if not user_id:
            return Response({"message": gettext("no_user_id")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user: User = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message": gettext("user_not_found")}, status=status.HTTP_404_NOT_FOUND)

        try:
            locale_user_data = UserLocalization.objects.get(user=user)
        except UserLocalization.DoesNotExist:
            locale_user_data = None

        user.username = email
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name
        if (locale_user_data):
            locale_user_data.first_name = first_name
            locale_user_data.last_name = last_name
            locale_user_data.save()

        user.save()

        try:
            ratings = Rating.objects.filter(user=user)
            parsed_ratings = UserRatingSerializer(ratings, many=True)
        except Rating.DoesNotExist:
            ratings = []

        return Response({
            "user": {
                "id": user.id,
                "firstName": locale_user_data.first_name if locale_user_data else user.first_name,
                "lastName": locale_user_data.last_name if locale_user_data else user.last_name,
                "preferredLanguage": locale_user_data.language_code if locale_user_data else "",
                "userRatings" : parsed_ratings.data or ratings
            }
        }, status=status.HTTP_200_OK)


class LogoutUser(APIView):
    """
    Log out the user by clearing the session
    """
    @swagger_auto_schema(responses={200: "Logged out"})
    def post(self, request):
        request.session.flush()
        preferred_language: str = get_language_from_request(request)

        activate(preferred_language)

        return Response({"message": gettext("logged_out")}, status=status.HTTP_200_OK)


class DeleteUser(APIView):
    """
    Delete the user by clearing the session
    """
    @swagger_auto_schema(responses={200: "User deleted"})
    def delete(self, request):
        user_id: int = request.session.get('user_id')
        preferred_language: str = get_language_from_request(request)

        activate(preferred_language)

        if not user_id:
            return Response({"message": gettext("no_user_id")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user: User = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message": gettext("user_not_found")}, status=status.HTTP_404_NOT_FOUND)

        user.delete()

        return Response({"message": gettext("user_deleted")}, status=status.HTTP_200_OK)
