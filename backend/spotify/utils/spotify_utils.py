import requests
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
from spotify.models import SpotifyToken


def update_or_create_user_tokens(user : User, access_token, token_type, expires_in, refresh_token) -> None:
    """
    Update or create the SpotifyToken for the user

    Args:
    user (User-Model): The user to update the token for
    access_token (str): The access token to update
    token_type (str): The token type to update
    expires_in (int): The expiry time of the token
    refresh_token (str): The refresh token to update

    Returns:
    None
    """
    
    spotify_token = SpotifyToken.objects.filter(user=user)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if spotify_token:
        spotify_token.access_token = access_token
        spotify_token.refresh_token = refresh_token
        spotify_token.expires_in = expires_in
        spotify_token.token_type = token_type
        spotify_token.save(update_fields=['access_token',
                                          'refresh_token', 'expires_in', 'token_type'])
    else:
        spotify_token = SpotifyToken(user=user, access_token=access_token,
                                     refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)

        spotify_token.save()


def refresh_spotify_token(user: User, refresh_token: str):
    """
    Refresh the Spotify access token

    Args:
    refresh_token (str): The refresh token to use for the request

    Returns:
    dict: The new token data
    """
    if not refresh_token:
        raise ValueError('No refresh token provided')

    headers = {
        'Authorization': 'Basic NmE5MjUxMjIwNzg0NGYwYmE5NzYxYjIzZjI1ZjEwMzI6MzYwZjI1ZjQzZjU5NGUyZmIwNzUwYjQzZmIwYzI1MzY='
    }

    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    }

    try:
        response = requests.post(
            'https://accounts.spotify.com/api/token', headers=headers, data=data)
    except requests.exceptions.RequestException as e:
        raise ValueError('Failed to refresh the token')

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(
        user, access_token, token_type, expires_in, refresh_token)


def is_authenticated(user: User) -> bool:
    """
    Check if the access token is valid

    Args:
    user (User-Model): The user to check

    Returns:
    bool: True if the token is valid, False otherwise
    """
    spotify_token = SpotifyToken.objects.filter(user=user)

    if not spotify_token.exists():
        return False

    expiry = spotify_token.expires_in
    if expiry <= timezone.now():
        refresh_spotify_token(spotify_token.refresh_token)

    return True


def spotify_get_track(access_token: str, track_id: str) -> dict:
    """
    Get a track from Spotify by its id

    Args:
    access_token (str): The access token to use for the request
    track_id (str): The id of the track to retrieve

    Returns:
    dict: The track data
    """

    if not access_token:
        raise ValueError('No access token provided')

    if not track_id:
        raise ValueError('No track id provided')

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    try:
        response = requests.get(
            f'https://api.spotify.com/v1/tracks/{track_id}', headers=headers)
    except requests.exceptions.RequestException as e:
        raise ValueError(f'No track foud by id {track_id}')

    return response.json()


def spotify_get_a_playlist(access_token: str, playlist_id: str) -> dict:
    """
    Get a playlist from Spotify by its id

    Args:
    access_token (str): The access token to use for the request
    playlist_id (str): The id of the playlist to retrieve

    Returns:
    dict: The playlist data
    """
    if not access_token:
        raise ValueError('No access token provided')

    if not playlist_id:
        raise ValueError('No playlist id provided')

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    try:
        response = requests.get(
            f'https://api.spotify.com/v1/playlists/{playlist_id}', headers=headers)
    except requests.exceptions.RequestException as e:
        raise ValueError(f'No playlist found by id {playlist_id}')

    return response.json()
