from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.views import View
import urllib.parse
import secrets
import requests
import base64

class SpotifyLogin(View):
    def get(self, request):
        client_id = 'YOUR_SPOTIFY_CLIENT_ID'
        redirect_uri = request.build_absolute_uri(reverse('callback'))
        state = secrets.token_urlsafe(16)
        scope = 'user-read-private user-read-email'
        params = urllib.parse.urlencode({
            'response_type': 'code',
            'client_id': client_id,
            'scope': scope,
            'redirect_uri': redirect_uri,
            'state': state
        })
        auth_url = f'https://accounts.spotify.com/authorize?{params}'
        return HttpResponseRedirect(auth_url)

class SpotifyCallback(View):
    def get(self, request):
        code = request.GET.get('code')
        state = request.GET.get('state')
        error = request.GET.get('error')

        if error:
            return HttpResponse(f'Error occurred: {error}')

        if not state:
            return HttpResponse('State mismatch')

        client_id = 'YOUR_SPOTIFY_CLIENT_ID'
        client_secret = 'YOUR_SPOTIFY_CLIENT_SECRET'
        redirect_uri = request.build_absolute_uri(reverse('callback'))

        response = requests.post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri
        }, headers={
            'Authorization': f'Basic {base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()}'
        })

        if response.status_code != 200:
            return HttpResponse('Failed to retrieve token')

        data = response.json()
        access_token = data['access_token']
        # Save the access token in session or database

        return HttpResponse('Logged in successfully')