from django.db import models
from django.contrib.auth.models import User


class Song(models.Model):
    spotify_id = models.CharField(max_length=255, unique=True, primary_key=True)
    number_of_reviews = models.IntegerField(default=0)
    overall_rating = models.FloatField(default=0)

    def calculate_overall_rating(self):
        ratings = Rating.objects.filter(song=self)
        return sum(rating.rating for rating in ratings) / self.number_of_reviews if self.number_of_reviews else 0
    

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    rating = models.IntegerField()

    class Meta:
        unique_together = ('user', 'song',)
