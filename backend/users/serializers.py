from rest_framework.serializers import ModelSerializer
from .models import Follows

class FollowsSerializer(ModelSerializer):
    class Meta:
        model = Follows
        fields = ('followers', 'following', 'is_private', 'sent_follow_requests', 'recieved_follow_requests')