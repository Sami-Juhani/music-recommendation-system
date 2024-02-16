from django.urls import path
from .views import *

urlpatterns = [
    path('generate/<str:playlist_id>/', RecommendationView.as_view(), name='recommendations'),
]
