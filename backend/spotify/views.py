from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from django.views import View
from music_recommender.settings import BASE_URL
import json
import urllib.parse
import secrets
import requests
import base64
import os
import dotenv

dotenv.load_dotenv()

SPOTIFY_CALLBACK_URL: str = BASE_URL + '/api/spotify/callback/'
SPOTIFY_CLIENT_ID: str = os.environ.get('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET: str = os.environ.get('SPOTIFY_CLIENT_SECRET')


class SpotifyLogin(View):
    def get(self):

        if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
            return HttpResponse('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be provided', status=401)
    
        state: str = secrets.token_urlsafe(16)
        scope: str = 'user-read-private user-read-email playlist-modify-private playlist-modify-public user-read-currently-playing user-read-playback-position user-read-playback-state playlist-read-private user-read-recently-played user-top-read user-library-read user-modify-playback-state'
        params: dict = urllib.parse.urlencode({
            'response_type': 'code',
            'client_id': SPOTIFY_CLIENT_ID,
            'scope': scope,
            'redirect_uri': SPOTIFY_CALLBACK_URL,
            'state': state
        })
        auth_url = f'https://accounts.spotify.com/authorize?{params}'

        return HttpResponseRedirect(auth_url)


class SpotifyCallback(View):
    def get(self, request):
        code: str = request.GET.get('code')
        state: str = request.GET.get('state')
        error: str = request.GET.get('error')

        if error:
            return HttpResponse(f'Error occurred: {error}', status=401)

        if not state:
            return HttpResponse('State mismatch', status=401)

        client_id = SPOTIFY_CLIENT_ID
        client_secret = SPOTIFY_CLIENT_SECRET
        redirect_uri = request.build_absolute_uri(reverse('callback'))

        response = requests.post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri
        }, headers={
            'Authorization': f'Basic {base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()}'
        })

        if response.status_code == 401:
            # //TODO: Refresh token
            pass

        if response.status_code != 200:
            return HttpResponse('Failed to retrieve token', status=401)

        data: dict = response.json()
        access_token: str = data['access_token']
        refresh_token: str = data['refresh_token']

        # Save the access token in session or database

        return JsonResponse({'access_token': access_token, 'refresh_token': refresh_token}, status=200)


class RefreshSpotifyToken(View):
    def post(self, request):
        refresh_token: str = json.loads(request.body).get('refresh_token')

        if not refresh_token:
            return HttpResponse('No refresh token provided', status=401)
    
        client_id: str = SPOTIFY_CLIENT_ID
        client_secret: str = SPOTIFY_CLIENT_SECRET

        if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
            return HttpResponse('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be provided', status=401)

        # Prepare the request
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': f'Basic {base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()}'
        }
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': client_id,
        }

        # Send the request
        response = requests.post(
            'https://accounts.spotify.com/api/token', headers=headers, data=data)

        # Handle the response
        if response.status_code != 200:
            return HttpResponse('Failed to retrieve token', status=401)

        data = response.json()

        access_token = data['access_token']

        return JsonResponse({'access_token': access_token}, status=200)


class SpotifyRecentlyPlayed(View):
    def get(self, request):
        access_token: str = request.headers.get('Authorization').split(' ')[1]

        if not access_token:
            return HttpResponse('No access token provided', status=401)

        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        params = {
            'limit': 50,
        }

        response = requests.get(
            'https://api.spotify.com/v1/me/player/recently-played', headers=headers, params=params)

        if response.status_code != 200:
            return HttpResponse('Failed to retrieve recently played', status=401)

        data = response.json()

        return JsonResponse(data, status=200)
