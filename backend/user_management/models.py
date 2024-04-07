from django.contrib.auth.models import User
from django.db import models


class UserLocalization(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    language_code = models.CharField(max_length=5)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('user', 'language_code')


    def get_user_localized_data(user):
        try:
            localization = UserLocalization.objects.get(user=user)
            return {"first_name": localization.first_name, "last_name":  localization.last_name, "language_code": localization.language_code}
        except UserLocalization.DoesNotExist:
            # Fallback to default language (e.g., user's original name)
            return {"first_name": user.first_name, "last_name": user.last_name}
