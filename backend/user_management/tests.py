import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import UserLocalization
from rest_framework import status
from music_recommender.settings import BASE_URL


class UserLoginTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testaaja@gmail.com', password='testpassword', first_name='test', last_name='user')
        self.localization =  UserLocalization.objects.create(
                user=self.user, language_code='fi', first_name='test', last_name='user')
        
        self.user2 = User.objects.create_user(
            username='明子', password='明子明子明子', first_name='明子', last_name='明子')
        self.localization2 =  UserLocalization.objects.create(
                user=self.user2, language_code='ja', first_name='明子', last_name='明子')
        
    def test_login_success(self):
        response = self.client.post(
            f'{BASE_URL}/api/user/login', {'email': 'testaaja@gmail.com', 'password': 'testpassword'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.post(
            f'{BASE_URL}/api/user/login', {'email': '明子', 'password': '明子明子明子'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_language_code_return(self):
        response = self.client.post(
            f'{BASE_URL}/api/user/login', {'email': '明子', 'password': '明子明子明子'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('preferredLanguage', response.data['user'])
        self.assertEqual(response.data['user']['preferredLanguage'], "ja")

    def test_login_failure(self):
        response = self.client.post(
            f'{BASE_URL}/api/user/login', {'email': 'wronguser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class RegisterUserTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_register_success(self):
        response = self.client.post(f'{BASE_URL}/api/user/register', {'email': 'testuser',
                                    'password': 'testpassword', 'first_name': 'Test', 'last_name': 'User', 'preferred_language': 'fi'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_failure(self):
        response = self.client.post(
            f'{BASE_URL}/api/user/register', {'email': '', 'password': '', 'first_name': '', 'last_name': ''})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateUserTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create_user(
            username='testuser', password='testpassword', first_name='Test', last_name='User')
        self.client.login(username='testuser', password='testpassword')

    def test_update_user(self):
        session = self.client.session
        session['user_id'] = self.test_user.id
        session.save()

        response = self.client.put(f'{BASE_URL}/api/user/update',
                                   data=json.dumps({
                                       'email': 'newemail@test.com',
                                       'password': 'newpassword',
                                       'first_name': 'newfirstname',
                                       'last_name': 'newlastname'
                                   }),
                                   content_type='application/json'
                                   )

        self.test_user.refresh_from_db()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.test_user.username, 'newemail@test.com')
        self.assertEqual(self.test_user.first_name, 'newfirstname')
        self.assertEqual(self.test_user.last_name, 'newlastname')
        self.assertTrue(self.test_user.check_password('newpassword'))


class LogoutUserTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

    def test_logout_user(self):
        session = self.client.session
        session['user_id'] = self.test_user.id
        session.save()

        response = self.client.post(f'{BASE_URL}/api/user/logout')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('user_id', self.client.session)


class DeleteUserTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.test_user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

    def test_delete_user(self):
        session = self.client.session
        session['user_id'] = self.test_user.id
        session.save()

        response = self.client.delete(f'{BASE_URL}/api/user/delete')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        with self.assertRaises(User.DoesNotExist):
            User.objects.get(id=self.test_user.id)
