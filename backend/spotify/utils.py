import requests
import base64
import dotenv
import os
from typing import Union, Dict
from django.utils import timezone # type: ignore
from datetime import timedelta
from django.contrib.auth.models import User # type: ignore
from spotify.models import SpotifyToken
from django.http import HttpResponse, JsonResponse # type: ignore
from requests import post, put, get

dotenv.load_dotenv()

SPOTIFY_CLIENT_ID = os.environ.get('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.environ.get('SPOTIFY_CLIENT_SECRET')
SPOTIFY_BASE_URL = 'https://api.spotify.com/v1/'


def update_or_create_user_tokens(user : User, access_token, token_type, expires_in, refresh_token) -> str:
    """
    Update or create the SpotifyToken for the user

    Args:
    user (User-Model): The user to update the token for
    access_token (str): The access token to update
    token_type (str): The token type to update
    expires_in (int): The expiry time of the token
    refresh_token (str): The refresh token to update

    Returns:
    The spotify token objecct
    """
    try:
        spotify_token = SpotifyToken.objects.get(user=user)
    except SpotifyToken.DoesNotExist:
        spotify_token = None

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

    return spotify_token


def refresh_spotify_token(user: User, refresh_token: str) -> str:
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
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + base64.b64encode(f"{SPOTIFY_CLIENT_ID}:{SPOTIFY_CLIENT_SECRET}".encode()).decode()
    }

    data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
    }

    try:
        response = requests.post(
            'https://accounts.spotify.com/api/token', headers=headers, data=data)
    except requests.exceptions.RequestException as e:
        return HttpResponse('Failed to refresh token', status=401)

    data = response.json()
    
    if 'error' in data or not data:
        return None

    access_token = data.get('access_token')
    token_type = data.get('token_type')
    expires_in = data.get('expires_in')

    spotify_token = update_or_create_user_tokens(
        user, access_token, token_type, expires_in, refresh_token)
    
    return spotify_token


def is_authenticated(user: User) -> bool:
    """
    Check if the access token is valid

    Args:
    user (User-Model): The user to check

    Returns:
    bool: True if the token is valid, False otherwise
    """
    try:
        spotify_token = SpotifyToken.objects.get(user=user)
    except SpotifyToken.DoesNotExist:    
        return False

    expiry = spotify_token.expires_in
    if expiry <= timezone.now():
        refresh_spotify_token(user, spotify_token.refresh_token)

    return True


def get_access_token(user_id: int) -> Union[str, Dict[str, str]]:
    """
    Get the access token for the user

    Args:
    user_id: The id of the user to get the token for

    Returns:
    str: The access token
    """
    try:
        user: User = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None


    try:
        spotify_token = SpotifyToken.objects.get(user=user)
    except SpotifyToken.DoesNotExist:
        return None

    if spotify_token.expires_in <= timezone.now():
        spotify_token = refresh_spotify_token(user, spotify_token.refresh_token)

    return spotify_token.access_token


def execute_spotify_api_request(user_id: int, endpoint: str, post_: bool=False, put_: bool=False) -> Union[str, Dict[str, str]]:
    """
    Execute a request on the Spotify API

    Args:
    user_id (int): The id of the user to get the token for
    endpoint (str): The endpoint to request
    post_ (bool): True if the request is a POST request
    put_ (bool): True if the request is a PUT request

    Returns:
    dict: The response data
    """
    access_token: Union[str, Dict[str, str]] = get_access_token(user_id)

    if not access_token:
        return None

    headers = {'Content-Type': 'application/json',
               'Authorization': "Bearer " + access_token}

    if post_:
        post(SPOTIFY_BASE_URL + endpoint, headers=headers)
    if put_:
        put(SPOTIFY_BASE_URL + endpoint, headers=headers)

    response = get(SPOTIFY_BASE_URL + endpoint, {}, headers=headers)
    try:
        return response.json()
    except:
        return None
 