from django.urls import path
from .views import SpotifyLogin, SpotifyCallback, RefreshSpotifyToken, SpotifyRecentlyPlayed

urlpatterns = [
    path('login/', SpotifyLogin.as_view(), name='login'),
    path('callback/', SpotifyCallback.as_view(), name='callback'),
    path('refresh/', RefreshSpotifyToken.as_view(), name='refresh'),
    path('recently-played/', SpotifyRecentlyPlayed.as_view(), name='recently-played')
]
