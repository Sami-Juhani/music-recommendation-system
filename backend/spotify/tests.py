from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.sessions.middleware import SessionMiddleware
from unittest.mock import patch, Mock
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth.models import User
from spotify.models import SpotifyToken

class SpotifyAuthTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('spotify_auth') 

    @patch.dict('os.environ', {'SPOTIFY_CLIENT_ID': 'test_id', 'SPOTIFY_CLIENT_SECRET': 'test_secret'})
    def test_get(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 302)  # 302 because it should redirect

    @patch.dict('os.environ', {'SPOTIFY_CLIENT_ID': '', 'SPOTIFY_CLIENT_SECRET': ''})
    def test_get_no_credentials(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)  # 401 because credentials are missing


class SpotifyCallbackTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('callback') 
        self.user = User.objects.create(username="test@test.com", password="testpassword", first_name="test", last_name="user")  # create a test user

    def test_get_no_user_id(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 404)  # 404 because user_id is missing from session

    def test_get_with_user_id(self):
        session = self.client.session
        session['user_id'] = self.user.id
        session.save()

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 400)  # 400 because state is missing from request


class IsAuthenticatedTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('is-authenticated') 
        self.user = User.objects.create(username="test@test.com", password="testpassword", first_name="test", last_name="user")  # create a test user

    def test_get_no_user_id(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 400)  # 400 because user_id is missing from session

    def test_get_with_user_id(self):
        session = self.client.session
        session['user_id'] = self.user.id
        session.save()

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)  # 200 because user_id is in session and user exists


class SpotifyAccessTokenTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = reverse('access-token')  
        self.user = User.objects.create(username="test@test.com", password="testpassword", first_name="test", last_name="user")  # create a test user
        SpotifyToken.objects.create(
            user=self.user,
            refresh_token='test_refresh_token',
            access_token='test_access_token',
            expires_in=timezone.now() + timedelta(days=1),  # set the token to expire in 1 day
            token_type='Bearer'
        )

    @patch('spotify.utils.get_access_token', return_value='test_access_token')  
    def test_get_with_user_id(self, mock_get_access_token):
        session = self.client.session
        session['user_id'] = self.user.id
        session.save()

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)  # 200 because user_id is in session and get_access_token returns a token
        self.assertEqual(response.json(), {'access_token': 'test_access_token'})

    @patch('spotify.utils.get_access_token', return_value='test_access_token')  
    def test_get_no_user_id(self, mock_get_access_token):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 404)  # 404 because user_id is missing from session