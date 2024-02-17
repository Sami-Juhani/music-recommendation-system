from django.urls import path
from .views import *

urlpatterns = [
    path('auth/', SpotifyAuth.as_view(), name='spotify_auth'),
    path('callback/', spotify_callback, name='callback'),
    path('is-authenticated/', IsAuthenticated.as_view(), name='is-authenticated'),
    path('access-token/', SpotifyAccessToken.as_view(), name='access-token'),
    path('recently-played/', SpotifyRecentlyPlayed.as_view(), name='recently-played'),
    path('playlists/', SpotifyPlaylists.as_view(), name='playlists'),
    path('playlist/<str:playlist_id>/', SpotifyOnePlaylist.as_view(), name='playlist'),
    path('recently-player/', SpotifyRecentlyPlayed.as_view(), name='recently-played'),
    path('playlists-and-tracks/', SpotifyPlaylistsWithTracks.as_view(), name='playlists-and-tracks'),
]
