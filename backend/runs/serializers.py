from django.db.models.base import Model
from rest_framework import serializers
from .models import Run

class RunSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("duration", "distance", "date", "id")
        model = Run