from django.urls import path
from .views import *

urlpatterns = [
    path('login/', SpotifyLogin.as_view(), name='spotify_login'),
    path('callback/', spotify_callback, name='callback'),
    path('recently-played/', SpotifyRecentlyPlayed.as_view(), name='recently-played'),
]
