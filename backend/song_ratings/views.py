from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Song
from .models import Rating
from rest_framework import status
from django.utils.translation import gettext, get_language_from_request, activate
from .serializers import SongSerializer, rating_param, rating_result
from django.contrib.auth.models import User
from drf_yasg.utils import swagger_auto_schema


class AddRatingView(APIView):
    """
    Add a rating to a song

    POST /api/song_ratings/<int:song_id>/
    """
    @swagger_auto_schema(operation_description="Add a rating to a song", request_body=rating_param, responses={status.HTTP_201_CREATED: SongSerializer(),
                                                                                                               status.HTTP_200_OK: SongSerializer(),
                                                                                                               status.HTTP_400_BAD_REQUEST: 'Rating is required',
                                                                                                               status.HTTP_401_UNAUTHORIZED: 'User not logged in',
                                                                                                               status.HTTP_404_NOT_FOUND: 'User not found'})
    def post(self, request, song_id: int, format=None):
        user_id: int = request.session.get('user_id')
        rating: int = request.data.get('rating')
        preferred_language: str = get_language_from_request(request)

        activate(preferred_language)

        if not user_id:
            return Response({"message": gettext("user_not_logged_in")}, status=status.HTTP_401_UNAUTHORIZED)

        if not rating:
            return Response({"message": gettext("rating_required")}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user: User = User.objects.get(id=user_id)
        except User.DoesNotExist:
            #User not found
            return Response({"message": gettext("user_not_found")}, status=status.HTTP_404_NOT_FOUND)

        song, exists = Song.objects.get_or_create(spotify_id=song_id)

        if exists:
            song.save()

        try:
            saved_rating = Rating.objects.get(user=user, song=song)
            saved_rating.rating = rating
            saved_rating.save()
        except Rating.DoesNotExist:
            Rating.objects.create(user=user, song=song, rating=rating)
            song.number_of_reviews += 1
            song.save()

        # Calculate the new overall rating
        song.overall_rating = song.calculate_overall_rating()
        song.save()

        song = Song.objects.get(spotify_id=song_id)

        song_serializer = SongSerializer(song)

        if exists:
            return Response(song_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(song_serializer.data, status=status.HTTP_201_CREATED)


class GetRatingView(APIView):
    """
    Get the rating of a song

    GET /api/song_ratings/<int:song_id>/

    Returns:
    - spotify_id: str
    - number_of_reviews: int
    - overall_rating: float
    """
    @swagger_auto_schema(operation_description="Get the rating of a song", responses={200: rating_result})
    def get(self, request, song_id: int, format=None):
        """
        Get the rating of a song

        GET /api/song_ratings/<int:song_id>/

        Returns:
        - number_of_reviews: int
        - overall_rating: float
        """
        try:
            song = Song.objects.get(spotify_id=song_id)
        except Song.DoesNotExist:
            return JsonResponse({'spotify_id': song_id, 'number_of_reviews': 0, 'overall_rating': 0}, status=status.HTTP_200_OK)

        return JsonResponse({'spotify_id': song.spotify_id, 'number_of_reviews': song.number_of_reviews, 'overall_rating': song.overall_rating}, status=status.HTTP_200_OK)


def get_song_rating(song_id):
    """
    Get the rating of a song

    GET /api/song_ratings/<int:song_id>/

    Returns:
    - number_of_reviews: int
    - overall_rating: float
    """
    try:
        song = Song.objects.get(spotify_id=song_id)
    except Song.DoesNotExist:
        return {'spotify_id': song_id, 'number_of_reviews': 0, 'overall_rating': 0}

    return {'spotify_id': song.spotify_id, 'number_of_reviews': song.number_of_reviews, 'overall_rating': song.overall_rating}
