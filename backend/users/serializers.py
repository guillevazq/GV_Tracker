from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Follows, UserSettings

class FollowsSerializer(ModelSerializer):
    following_data = serializers.ListField(read_only=True)
    follower_data = serializers.ListField(read_only=True)
    sent_requests_data = serializers.ListField(read_only=True)
    recieved_requests_data = serializers.ListField(read_only=True)
    favorites_data = serializers.ListField(read_only=True)
    is_account_verified = serializers.BooleanField(read_only=True)

    class Meta:
        model = Follows
        fields = (
            "followers",
            "following",
            "sent_follow_requests",
            "recieved_follow_requests",
            "is_private",
            "following_data",
            "follower_data",
            "sent_requests_data",
            "recieved_requests_data",
            "favorites_data",
            "favorite_followed_users",
            "blocked_users",
            "is_account_verified",
        )

class SettingsSerializer(ModelSerializer):
    class Meta:
        fields = ("language", "unit", "weekly_goal")
        model = UserSettings