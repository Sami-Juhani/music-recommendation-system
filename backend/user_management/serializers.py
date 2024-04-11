from rest_framework import serializers
from song_ratings.serializers import UserRatingSerializer

class UserLoginRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class UserLoginResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    userRatings = UserRatingSerializer()


class RegisterUserRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()


class RegisterUserResponseSerializer(serializers.Serializer):
    message = serializers.CharField()
