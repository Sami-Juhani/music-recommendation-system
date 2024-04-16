from django.urls import path
from .views import *

urlpatterns = [
    path('auth/', SpotifyAuth.as_view(), name='spotify_auth'),
    path('callback/', spotify_callback, name='callback'),
    path('is-authenticated/', IsAuthenticated.as_view(), name='is-authenticated'),
    path('access-token/', SpotifyAccessToken.as_view(), name='access-token'),
    path('recently-played/', SpotifyRecentlyPlayed.as_view(), name='recently-played'),
    path('playlists/', SpotifyPlaylists.as_view(), name='playlists'),
    path('playlist/<str:playlist_id>/',
         SpotifyOnePlaylist.as_view(), name='playlist'),
    path('playlists-and-tracks/', SpotifyPlaylistsWithTracks.as_view(),
         name='playlists-and-tracks'),
    path('player/playbackstate/', PlaybackState.as_view(), name="playbackstate"),
    path('player/pause/', Pause.as_view(), name="pause"),
    path('player/play/', Play.as_view(), name="play"),
    path('player/seek', Seek.as_view(), name="seek"),
]
