from django.db import models
from django.contrib.auth.models import User

class Run(models.Model):
    runner = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.TimeField()
    distance = models.FloatField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.runner.username} - {self.distance} - {self.date.strftime('%Y-%m-%d')}"