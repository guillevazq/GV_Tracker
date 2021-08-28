from django.db.models.base import Model
from rest_framework import serializers
from .models import Run

class RunSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("seconds", "distance", "unix_date", "id")
        model = Run