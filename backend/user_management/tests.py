import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from rest_framework import status
from music_recommender.settings import BASE_URL


class UserLoginTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser', password='testpassword')

    def test_login_success(self):
        response = self.client.post(
            f'{BASE_URL}/api/user/login', {'email': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {"user": {
                         "id": self.user.id, "first_name": self.user.first_name, "last_name": self.user.last_name}})

    def test_login_failure(self):
        response = self.client.post(
            f'{BASE_URL}/api/user/login', {'email': 'wronguser', 'password': 'wrongpassword'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json(), {
                         "message": "Invalid email or password"})


class RegisterUserTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_register_success(self):
        response = self.client.post(f'{BASE_URL}/api/user/register', {'email': 'testuser',
                                    'password': 'testpassword', 'first_name': 'Test', 'last_name': 'User'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json(), {"message": "User created"})

    def test_register_failure(self):
        response = self.client.post(
            f'{BASE_URL}/api/user/register', {'email': '', 'password': '', 'first_name': '', 'last_name': ''})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json(), {
                         "message": "Email and password are required"})


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

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
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
