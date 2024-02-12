from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from spotify.utils import execute_spotify_api_request
from .services import generate_recommendations


class RecommendationView(APIView):
    """
    Get the user's recommendations based on the playlist

    Args:
    request: The request object

    Params:
    playlist_id (str): The id of the playlist to retrieve

    Returns:
    Response: 40 recommendations for the playlist
    """
    @swagger_auto_schema(operation_description="Get the user's recommendations based on the playlist", responses={200: 'Recommendations for the playlist'})
    def get(self, request, playlist_id):
        user_id: str = request.session.get('user_id')
        endpoint: str = f'playlists/{playlist_id}'

        playlist: dict = execute_spotify_api_request(user_id, endpoint)

        if 'message' in playlist or not playlist:
            return Response({"message" : playlist['message']}, status=status.HTTP_404_NOT_FOUND)

        # Get the user's recommendations
        recommendations = generate_recommendations(playlist, user_id)

        if 'message' in recommendations or recommendations.empty:
            return Response({"message" : recommendations['message']}, status=status.HTTP_404_NOT_FOUND)

        return Response(recommendations, status=status.HTTP_200_OK)
