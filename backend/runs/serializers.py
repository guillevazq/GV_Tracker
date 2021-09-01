from django.db.models.base import Model
from rest_framework import serializers
from .models import Run

class RunSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='get_username', read_only=True)
    class Meta:
        fields = ("seconds", "distance", "unix_date", "id", "username")
        model = Run