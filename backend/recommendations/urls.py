from django.urls import path
from .views import *

urlpatterns = [
    path('generate/<str:playlist_id>', RecommendationView.as_view(), name='recommendations'),
    path('generate/recently-played/', RecommendationViewRecentlyPlayed.as_view(), name='recommendations-recently-played')
]
