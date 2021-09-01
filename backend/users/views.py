from django.contrib.auth.models import User

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView

from rest_framework import serializers, status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Follows
from .serializers import FollowsSerializer

class FollowsView(views.APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, pk, action, *args, **kwargs):
        try:
            target_user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        target_follows, request_user_follows = Follows.objects.get(user=target_user), Follows.objects.get(user=request.user)
        target_serializer, request_user_serializer = FollowsSerializer(target_follows), FollowsSerializer(request_user_follows)
        target_user_followers = target_serializer.data["followers"] 
        target_user_following = target_serializer.data["following"] 
        target_user_is_private = target_serializer.data["is_private"] 
        target_user_sent_follow_requests = target_serializer.data["sent_follow_requests"] 
        target_user_recieved_follow_requests = target_serializer.data["recieved_follow_requests"] 

        if action == "follows":
            if target_user_is_private and request.user not in target_user_following and target_user != request.user:
                return Response({'detail': "This profile is private"}, status=status.HTTP_401_UNAUTHORIZED)
            
            if target_user == request.user:
                return Response(target_serializer.data, status=status.HTTP_200_OK)
            
            return Response({"target_user_followers": target_user_followers, "target_user_following": target_user_following}, status=status.HTTP_200_OK)

        if request.user == target_user:
            return Response({'detail': 'You cannot do this to your own profile'}, status=status.HTTP_401_UNAUTHORIZED)

        elif action == "follow-user":
            if request.user.pk in target_user_followers: 
                return Response({'detail': "You're already following this user"}, status=status.HTTP_208_ALREADY_REPORTED)
            if target_user_is_private:
                if request.user.pk in target_user_followers:
                    message = "You're already following this user"
                elif request.user.pk not in target_user_recieved_follow_requests:
                    request_user_follows.send_follow_request(target_user)
                    message = "Follow request sent succesfully"
                else:
                    message = "You've already sent a follow request to this user"
            else:
                request_user_follows.start_following(target_user)
                message = "You are now following the user"
        
            return Response({'detail': message}, status=status.HTTP_202_ACCEPTED)
        elif action == 'unfollow-user':
            if request.user.pk not in target_user_followers:
                return Response({'detail': "You're not following this user"}, status=status.HTTP_401_UNAUTHORIZED)

            request_user_follows.stop_following(target_user)
            return Response({'detail': "You've stopped following this user"}, status=status.HTTP_202_ACCEPTED)
        
        elif action == 'cancel-follow-request':
            if request.user.pk not in target_user_recieved_follow_requests:
                return Response({'detail': "You haven't sent a follow request to this user"}, status=status.HTTP_401_UNAUTHORIZED)
            
            request_user_follows.abort_follow_request(target_user)
            return Response({'detail': "You've cancelled your follow request"}, status=status.HTTP_202_ACCEPTED)
        
        elif action == 'reject-follow-request':
            if request.user.pk not in target_user_sent_follow_requests:
                return Response({'detail': "This user hasn't sent you a follow request"}, status=status.HTTP_401_UNAUTHORIZED)

            request_user_follows.reject_follow_request(target_user)
            return Response({'detail': "You've rejected the follow request"}, status=status.HTTP_202_ACCEPTED)
        
        elif action == 'accept-follow-request':
            if request.user.pk not in target_user_sent_follow_requests:
                return Response({'detail': "This user has not sent you a follow request"}, status=status.HTTP_401_UNAUTHORIZED)
            
            request_user_follows.accept_follow_request(target_user)
            return Response({'detail': "You've accepted the follow request"}, status=status.HTTP_202_ACCEPTED)

        return Response({'detail': "Method not available"}, status=status.HTTP_404_NOT_FOUND)

class ChangeFollowStatus(views.APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, privacy_type, *args, **kwargs):
        try:
            follows = Follows.objects.get(user=request.user)
        except Follows.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        if privacy_type == "private":
            if not follows.is_private:
                follows.set_account_private()
                return Response({'detail': "Account has been set private"}, status=status.HTTP_202_ACCEPTED)

            return Response({'detail': "Account is already private"}, status=status.HTTP_202_ACCEPTED)
        elif privacy_type == "public":
            if follows.is_private:
                follows.set_account_public()
                serializer = FollowsSerializer(follows)
                for pk in serializer.data['recieved_follow_requests']:
                    user = User.objects.get(pk=pk)
                    follows.accept_follow_request(user)
                return Response({'detail': "Account has been set public"}, status=status.HTTP_202_ACCEPTED)
            return Response({'detail': "Account is already public"}, status=status.HTTP_202_ACCEPTED)
    
class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter