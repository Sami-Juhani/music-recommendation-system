from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema
from django.db.utils import IntegrityError
from .serializers import UserLoginRequestSerializer, UserLoginResponseSerializer, RegisterUserRequestSerializer, RegisterUserResponseSerializer


class UserLogin(APIView):
    @swagger_auto_schema(request_body=UserLoginRequestSerializer, responses={200: UserLoginResponseSerializer})
    def post(self, request):
        email: str = request.data.get('email')
        password: str = request.data.get('password')

        if not email or not password:
             return Response({"message": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user: User = authenticate(username=email, password=password)

        if not user:
            # A backend authenticated the credentials
            return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
        
        request.session['user_id'] = user.id

        return Response({"user": {"id": user.id, "first_name": user.first_name, "last_name": user.last_name}})
    

class RegisterUser(APIView):
    @swagger_auto_schema(request_body=RegisterUserRequestSerializer, responses={201: RegisterUserResponseSerializer})
    def post(self, request):
        email: str = request.data.get('email')
        password: str = request.data.get('password')
        first_name: str = request.data.get('first_name')
        last_name: str = request.data.get('last_name')


        if not email or not password:
            return Response({"message": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not first_name or not last_name:
            return Response({"message": "First name and last name are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user: User = User.objects.create_user(username=email, password=password, first_name=first_name, last_name=last_name)
        except IntegrityError:
            return Response({"message": f"User already exists with email: {email}"}, status=status.HTTP_400_BAD_REQUEST)

        if not user:
            return Response({"message": "User not created"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
    

class UpdateUser(APIView):
    @swagger_auto_schema(request_body=RegisterUserRequestSerializer, responses={201: RegisterUserResponseSerializer})
    def put(self, request):
        email: str = request.data.get('email')
        password: str = request.data.get('password')
        first_name: str = request.data.get('first_name')
        last_name: str = request.data.get('last_name')

        if not email or not password:
            return Response({"message": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not first_name or not last_name:
            return Response({"message": "First name and last name are required"}, status=status.HTTP_400_BAD_REQUEST)

        user_id: int = request.session.get('user_id')

        if not user_id:
            return Response({"message" : 'No user id found'}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            user: User = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message" : 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user.username = email
        user.set_password(password)
        user.first_name = first_name
        user.last_name = last_name

        user.save()
        
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
    

class LogoutUser(APIView):
    """
    Log out the user by clearing the session
    """
    @swagger_auto_schema(responses={200: "Logged out"})
    def post(self, request):
        request.session.flush()
        return Response({"message": "Logged out"}, status=status.HTTP_200_OK)


class DeleteUser(APIView):
    """
    Delete the user by clearing the session
    """
    @swagger_auto_schema(responses={200: "User deleted"})
    def delete(self, request):
        user_id: int = request.session.get('user_id')

        if not user_id:
            return Response({"message" : 'No user id found'}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            user: User = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message" : 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        user.delete()
        
        return Response({"message": "User deleted"}, status=status.HTTP_200_OK)
