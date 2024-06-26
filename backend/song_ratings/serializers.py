from rest_framework import serializers
from drf_yasg import openapi
from .models import Rating, Song


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['user_id', 'song_id', 'rating']


class SongSerializer(serializers.ModelSerializer):
    user_rating = serializers.ListField(
        child=serializers.CharField(), required=False)

    class Meta:
        model = Song
        fields = ['spotify_id', 'number_of_reviews',
                  'overall_rating', 'user_rating']


class UserRatingSerializer(serializers.ModelSerializer):
    spotifyId = serializers.CharField(source='song_id')

    class Meta:
        model = Rating
        fields = ['spotifyId', 'rating']


rating_param = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'rating': openapi.Schema(type=openapi.TYPE_INTEGER, description='Rating value')
    },
    required=['rating']
)

rating_result = openapi.Schema(type=openapi.TYPE_OBJECT,
                               properties={'spotify_id': openapi.Schema(type=openapi.TYPE_STRING, description='Spotify ID of the song'),
                                           'number_of_reviews': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of reviews'),
                                           'overall_rating': openapi.Schema(type=openapi.TYPE_NUMBER, description='Overall rating'),
                                           })
