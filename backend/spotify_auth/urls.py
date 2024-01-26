from django.urls import path
from .views import SpotifyLogin, SpotifyCallback

urlpatterns = [
    path('login/', SpotifyLogin.as_view(), name='login'),
    path('callback/', SpotifyCallback.as_view(), name='callback'),
]