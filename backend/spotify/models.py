from django.contrib.auth.models import User
from django.db import models

class SpotifyToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=400)
    access_token = models.CharField(max_length=400)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

    class Meta:
        db_table = 'spotify_tokens'