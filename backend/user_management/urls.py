from django.urls import path
from .views import UserLogin, RegisterUser

urlpatterns = [
    path('login/', UserLogin.as_view(), name='login'),
    path('register/', RegisterUser.as_view(), name='register'),
]
