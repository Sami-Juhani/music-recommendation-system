import json
from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from .models import Song, Rating
from .views import get_song_rating
from django.contrib.auth.models import User


class AddRatingViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create(
            username='testuser', password='testpass', first_name='test', last_name='user')
        self.user2 = User.objects.create(
            username='testuser2', password='testpass', first_name='test', last_name='user')
        self.song = Song.objects.create(spotify_id='testspotifyid')
        self.url = reverse('song_ratings', args=[self.song.spotify_id])

    def test_add_rating(self):
        self.client.login(username='testuser', password='testpass')
        session = self.client.session
        session['user_id'] = self.user.id
        session.save()

        data = {
            'rating': 5,
        }

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Song.objects.get(
            spotify_id='testspotifyid').overall_rating, 5)
        self.assertTrue(Rating.objects.filter(
            user=self.user, song=self.song, rating=5).exists())

    def test_overall_rating_calculation(self):
        self.client.login(username='testuser', password='testpass')
        session = self.client.session
        session['user_id'] = self.user.id
        session.save()

        data = {
            'rating': 3,
        }

        self.client.post(self.url, data)

        self.client.login(username='testuser2', password='testpass')
        session = self.client.session
        session['user_id'] = self.user2.id
        session.save()

        data = {
            'rating': 5,
        }

        self.client.post(self.url, data)

        self.assertEqual(4.0, Song.objects.get(
            spotify_id='testspotifyid').overall_rating)

    def test_rating_update(self):
        self.client.login(username='testuser', password='testpass')
        session = self.client.session
        session['user_id'] = self.user.id
        session.save()

        data = {
            'rating': 4,
        }

        self.client.post(self.url, data)

        self.client.login(username='testuser2', password='testpass')
        session = self.client.session
        session['user_id'] = self.user2.id
        session.save()

        data = {
            'rating': 1,
        }

        self.client.post(self.url, data)

        self.assertEqual(2.5, Song.objects.get(
            spotify_id='testspotifyid').overall_rating)
        
        data = {
            'rating': 5,
        }

        self.client.post(self.url, data)

        self.assertEqual(4.5, Song.objects.get(
            spotify_id='testspotifyid').overall_rating)
        self.assertTrue(Rating.objects.filter(
            user=self.user2, song=self.song, rating=5).exists())
        self.assertEqual(2, Song.objects.get(
            spotify_id='testspotifyid').number_of_reviews)
        

    def test_get_song_rating(self):
        self.client.login(username='testuser', password='testpass')
        session = self.client.session
        session['user_id'] = self.user.id
        session.save()

        data = {
            'rating': 4,
        }

        self.client.post(self.url, data)

        self.client.login(username='testuser2', password='testpass')
        session = self.client.session
        session['user_id'] = self.user2.id
        session.save()

        data = {
            'rating': 1,
        }

        self.client.post(self.url, data)

        self.assertEqual({"spotify_id": "testspotifyid", "number_of_reviews": 2, "overall_rating": 2.5}, get_song_rating('testspotifyid'))
        


