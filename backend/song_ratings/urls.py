from django.urls import path
from .views import *

urlpatterns = [
    path('add-rating/<str:song_id>', AddRatingView.as_view(), name='song_ratings'),
    path('get-rating/<str:song_id>', GetRatingView.as_view(), name='get_song_rating'),
]