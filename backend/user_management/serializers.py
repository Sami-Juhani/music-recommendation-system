from rest_framework import serializers

class UserLoginRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

class UserLoginResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

class RegisterUserRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

class RegisterUserResponseSerializer(serializers.Serializer):
    message = serializers.CharField()