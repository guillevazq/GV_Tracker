import time

from django import forms
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from django.contrib.auth.models import User

def present_or_future_date(value):
    if value > time.time():
        raise forms.ValidationError("The date cannot be in the future!")
    return value

class Run(models.Model):
    runner = models.ForeignKey(User, on_delete=models.CASCADE)
    seconds = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(260_000)])
    distance = models.FloatField(validators=[MinValueValidator(0.1), MaxValueValidator(1000)])
    unix_date = models.IntegerField(validators=[present_or_future_date])

    class Meta:
        ordering = ('-unix_date',)

    def __str__(self):
        return f"{self.runner.username} - {self.distance} - {self.unix_date}"
    
    def get_username(self):
        return self.runner.username