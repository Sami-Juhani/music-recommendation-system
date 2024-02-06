from django.urls import path
from .views import *

urlpatterns = [
    path('login', UserLogin.as_view(), name='login'),
    path('register', RegisterUser.as_view(), name='register'),
    path('update', UpdateUser.as_view(), name='update')
]
