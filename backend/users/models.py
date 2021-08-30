from django.db import models
from django.contrib.auth.models import User

class Follows(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    followers = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")