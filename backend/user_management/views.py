from django.shortcuts import redirect
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from spotify.utils.spotify_utils import is_authenticated
from django.http import HttpResponseRedirect
from music_recommender.settings import BASE_URL


class UserLogin(APIView):
    # TODO: Change to post method and get the email and password from the request
    def get(self, request):
        # email = request.data.get('email')
        # password = request.data.get('password')

        # if not email or not password:
        #     return Response({"message": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username="sami.paananen@gmail.com", password="jeejeejee")

        if not user:
            # A backend authenticated the credentials
            return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

        if not is_authenticated(user):
            request.session['user_id'] = user.id
            return redirect('spotify_login')

        return Response({"message": "Logged in"}, status=status.HTTP_200_OK)
    

class RegisterUser(APIView):
    #TODO: Change to post method and get the email and password from the request 
    def get(self, request):

        # email = request.data.get('email')
        # password = request.data.get('password')
        email = 'sami.paananen@gmail.com'
        password = 'jeejeejee'

        if not email or not password:
            return Response({"message": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=email, password=password)

        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
