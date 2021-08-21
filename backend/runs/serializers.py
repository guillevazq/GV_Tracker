from django.db.models.base import Model
from rest_framework import serializers
from .models import Run

class RunSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("minutes", "seconds", "distance", "date", "id")
        model = Run