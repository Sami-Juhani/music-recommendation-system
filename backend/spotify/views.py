import urllib.parse
import secrets
import requests
import base64
import os
import dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from django.contrib.auth.models import User
from music_recommender.settings import BASE_URL
from .utils import *
from drf_yasg.utils import swagger_auto_schema
from .serializers import *
from song_ratings.views import get_song_rating

dotenv.load_dotenv()

SPOTIFY_CALLBACK_URL: str = BASE_URL + '/api/spotify/callback/'
SPOTIFY_CLIENT_ID: str = os.environ.get('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET: str = os.environ.get('SPOTIFY_CLIENT_SECRET')


class SpotifyAuth(APIView):
    """
    Redirect to Spotify Auth
    """
    @swagger_auto_schema(operation_description="Redirect to Spotify Auth", responses={302: 'Redirect to Spotify Auth'})
    def get(self, request):

        SPOTIFY_CLIENT_ID: str = os.environ.get('SPOTIFY_CLIENT_ID')
        SPOTIFY_CLIENT_SECRET: str = os.environ.get('SPOTIFY_CLIENT_SECRET')

        if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
            return Response({"message": 'SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be provided'}, status=status.HTTP_401_UNAUTHORIZED)

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


def spotify_callback(request) -> Response:
    """
    Callback for Spotify login

    Args:
    request (HttpRequest): The request object

    Returns:
    Response: The response object with the user data
    """

    user_id = request.session.get('user_id')
    code: str = request.GET.get('code')
    state: str = request.GET.get('state')
    error: str = request.GET.get('error')

    if not user_id:
        return JsonResponse({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    if error:
        return HttpResponse(error, status=status.HTTP_400_BAD_REQUEST)

    if not state:
        return JsonResponse({"message:": "State not found"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    SPOTIFY_CLIENT_ID: str = os.environ.get('SPOTIFY_CLIENT_ID')
    SPOTIFY_CLIENT_SECRET: str = os.environ.get('SPOTIFY_CLIENT_SECRET')
    redirect_uri = request.build_absolute_uri(reverse('callback'))

    try:
        response = requests.post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri
        }, headers={
            'Authorization': f'Basic {base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()}'
        })
    except requests.exceptions.RequestException as e:
        return JsonResponse({"message": 'Failed to retrieve access token'}, status=status.HTTP_401_UNAUTHORIZED)

    data: dict = response.json()
    access_token: str = data['access_token']
    refresh_token: str = data['refresh_token']
    expires_in = data['expires_in']
    token_type = data['token_type']

    # Save the access token in database
    update_or_create_user_tokens(
        user, access_token, token_type, expires_in, refresh_token)

    return redirect('http://localhost:3000/')


class IsAuthenticated(APIView):
    """
    Check if a user is authenticated

    Returns:
    Response: The response object with the status True/False
    """
    @swagger_auto_schema(operation_description="Check if a user is authenticated", responses={200: IsAuthenticatedSerializer()})
    def get(self, request):
        user_id: int = request.session.get('user_id')

        if not user_id:
            return JsonResponse({"message": 'No user id found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user: User = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({"message": 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if not user:
            return JsonResponse({"message": 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        is_auth: bool = is_authenticated(user)

        return JsonResponse({'status': is_auth}, status=status.HTTP_200_OK)


### For development purposes only ###
class SpotifyAccessToken(APIView):
    """
    Get the access token for a user for development purposes only

    Returns:
    Response: The response object with the access token
    """
    @swagger_auto_schema(operation_description="Get the access token for a user for development purposes only", responses={200: AccessTokenSerializer()})
    def get(self, request):
        user_id: int = request.session.get('user_id')
        access_token: str = get_access_token(user_id)

        if 'message' in access_token or not access_token:
            return JsonResponse({"message": 'No access token found'}, status=status.HTTP_404_NOT_FOUND)

        return JsonResponse({"access_token": access_token}, status=status.HTTP_200_OK)


class SpotifyRecentlyPlayed(APIView):
    """
    Get the recently played tracks for the user

    Returns:
    Response: The response object with the recently played tracks
    """
    @swagger_auto_schema(operation_description="Get the recently played tracks for the user", responses={200: TrackSerializer(many=True)})
    def get(self, request):
        user_id: int = request.session.get('user_id')
        endpoint: str = 'me/player/recently-played'

        recently_played: dict = execute_spotify_api_request(user_id, endpoint)

        if 'message' in recently_played or not recently_played:
            return Response(recently_played, status=status.HTTP_404_NOT_FOUND)

        return Response(recently_played, status=status.HTTP_200_OK)


class SpotifyPlaylists(APIView):
    """
    Get the playlists for the user

    Returns:
    Response: The response object with the playlists
    """
    @swagger_auto_schema(operation_description="Get the playlists for the user", responses={200: PlaylistSerializer(many=True)})
    def get(self, request):
        user_id: int = request.session.get('user_id')
        endpoint: str = 'me/playlists'

        playlists: dict = execute_spotify_api_request(user_id, endpoint)

        if 'message' in playlists or not playlists:
            return Response(playlists, status=status.HTTP_404_NOT_FOUND)

        return Response(playlists, status=status.HTTP_200_OK)


class SpotifyOnePlaylist(APIView):
    """
    Get a playlist by its id

    Args:
    playlist_id (str): The id of the playlist to retrieve

    Returns:
    Response: The response object with the playlist
    """
    @swagger_auto_schema(operation_description="Get a playlist by its id", responses={200: PlaylistSerializer()})
    def get(self, request, playlist_id):
        user_id: int = request.session.get('user_id')
        endpoint: str = f'playlists/{playlist_id}'

        playlist: dict = execute_spotify_api_request(user_id, endpoint)

        if 'message' in playlist or not playlist:
            return Response(playlist, status=status.HTTP_404_NOT_FOUND)

        for track in playlist['tracks']['items']:
           track['rating'] = get_song_rating(track['track']['id'])

        return Response(playlist, status=status.HTTP_200_OK)


class SpotifyPlaylistsWithTracks(APIView):
    """
    Get playlists with their tracks for the user

    Returns:
    Response: The response object with the playlists and their tracks
    """
    @swagger_auto_schema(operation_description="Get playlists with their tracks for the user", responses={200: PlaylistSerializer(many=True)})
    def get(self, request):
        playlists_with_tracks = []
        user_id: int = request.session.get('user_id')
        endpoint: str = 'me/playlists'

        # Get the playlists
        playlists: dict = execute_spotify_api_request(user_id, endpoint)

        if 'message' in playlists or not playlists:
            return Response(playlists, status=status.HTTP_404_NOT_FOUND)

        # Get the tracks for each playlist
        for playlist in playlists['items']:
            playlists_with_tracks.append(execute_spotify_api_request(
                user_id, f"playlists/{playlist['id']}"))

        if 'message' in playlists_with_tracks or not playlists_with_tracks:
            return Response(playlists_with_tracks, status=status.HTTP_404_NOT_FOUND)

        return Response(playlists_with_tracks, status=status.HTTP_200_OK)
    
class SpotifyRecentlyPlayed(APIView):
    """
    Get user's recently played songs

    Returns:
    Response: The response object with the recently played songs
    """
    @swagger_auto_schema(operation_description=" Get user's recently played songs", responses={200: TrackSerializer(many=True)})
    def get(self, request):
        user_id: int = request.session.get('user_id')
        endpoint: str = "me/player/recently-played?limit=50"

        recently_played: dict = execute_spotify_api_request(user_id, endpoint)

        if 'message' in recently_played or not recently_played:
            return Response(recently_played, status=status.HTTP_404_NOT_FOUND)

        return Response(recently_played, status=status.HTTP_200_OK)

    
