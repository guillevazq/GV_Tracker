from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from django.contrib.auth.models import User

class Run(models.Model):
    runner = models.ForeignKey(User, on_delete=models.CASCADE)
    minutes = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4320)])
    seconds = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(59)])
    distance = models.FloatField(validators=[MinValueValidator(0.1), MaxValueValidator(1000)])
    date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-date',)

    def __str__(self):
        return f"{self.runner.username} - {self.distance} - {self.date.strftime('%Y-%m-%d')}"