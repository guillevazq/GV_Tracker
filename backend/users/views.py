import json
from django.contrib.auth.models import User
from django.core.checks.messages import Error
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import AnonymousUser

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView

from rest_framework import generics, serializers, status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import FollowsSerializer, SettingsSerializer
from .models import Follows, UserSettings

class FollowsView(views.APIView):
    permission_classes = [IsAuthenticated,]

    def get(self, request, username, action, *args, **kwargs):
        if username == "me":
            username = request.user.username
        try:
            target_user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        target_follows, request_user_follows = Follows.objects.get(user=target_user), Follows.objects.get(user=request.user)
        target_serializer, request_user_serializer = FollowsSerializer(target_follows), FollowsSerializer(request_user_follows)
        request_user_favorites_ids = request_user_serializer.data["favorite_followed_users"]
        request_user_blocked = request_user_serializer.data["blocked_users"]
        target_user_blocked = target_serializer.data["blocked_users"]
        target_user_followers = target_serializer.data["followers"] 
        target_user_following = target_serializer.data["following"] 
        target_user_is_private = target_serializer.data["is_private"] 
        target_user_sent_follow_requests = target_serializer.data["sent_follow_requests"] 
        target_user_recieved_follow_requests = target_serializer.data["recieved_follow_requests"] 

        if action == "follows":
            if target_user_is_private and request.user.pk not in target_user_followers and target_user != request.user:
                return Response({'detail': "This profile is private"}, status=status.HTTP_401_UNAUTHORIZED)
            
            if target_user == request.user:
                return Response(target_serializer.data, status=status.HTTP_200_OK)
            
            return Response({"target_user_followers": target_user_followers, "target_user_following": target_user_following}, status=status.HTTP_200_OK)

        if request.user == target_user:
            return Response({'detail': 'You cannot do this to your own profile'}, status=status.HTTP_401_UNAUTHORIZED)

        if not request_user_serializer.data["is_verified"]:
            return Response({'detail': "Account not verified"}, status=status.HTTP_401_UNAUTHORIZED)

        elif action == "follow-user":
            if request.user.pk in target_user_blocked:
                return Response({'detail': "This user has blocked you"}, status=status.HTTP_401_UNAUTHORIZED)

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
        
        elif action == 'remove-follower':
            if request.user.pk not in target_user_following:
                return Response({'detail': "This user is not following you"}, status=status.HTTP_401_UNAUTHORIZED)

            target_follows.stop_following(request.user)
            return Response({'detail': "This user is no longer your follower"}, status=status.HTTP_202_ACCEPTED)
        
        elif action == "block-user":
            if target_user.pk in request_user_blocked:
                return Response({'detail': "User has already been blocked"}, status=status.HTTP_401_UNAUTHORIZED)

            if request.user.pk in target_user_following:
                target_follows.stop_following(request.user)
            
            if request.user.pk in target_user_followers:
                request_user_follows.stop_following(target_user)
            
            request_user_follows.block_user(target_user)
            return Response({'detail': "You've blocked this user"}, status=status.HTTP_401_UNAUTHORIZED)
        
        elif action == "unblock-user":
            if target_user.pk not in request_user_blocked:
                return Response({'detail': "This user wasn't blocked"}, status=status.HTTP_401_UNAUTHORIZED)
            
            request_user_follows.unblock_user(target_user)
            return Response({'detail': "You've unblocked this user"}, status=status.HTTP_202_ACCEPTED)
        
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
        
        elif action == "add-favorite-user":
            if len(request_user_favorites_ids) > 4:
                return Response({'detail': "The maximum amount of favorite users is 4"}, status=status.HTTP_401_UNAUTHORIZED)

            if request.user.pk not in target_user_followers:
                return Response({'detail': "In order to add someone as favorite you must follow them first"}, status=status.HTTP_401_UNAUTHORIZED)

            if target_user.pk in request_user_favorites_ids:
                return Response({'detail': "This user is already in your favorites"}, status=status.HTTP_401_UNAUTHORIZED)

            request_user_follows.add_favorite_user(target_user)        
            return Response({'detail': "Favorite user added succesfully"}, status=status.HTTP_201_CREATED)
        
        elif action == "remove-favorite-user":
            if target_user.pk not in request_user_favorites_ids:
                return Response({'detail': "User is not in your favorites"}, status=status.HTTP_401_UNAUTHORIZED)
            
            request_user_follows.remove_favorite_user(target_user)
            return Response({'detail': "User removed from favorites"}, status=status.HTTP_200_OK)

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
    
class ChangeSettings(views.APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        user_settings = UserSettings.objects.get(user=request.user)
        serializer = SettingsSerializer(user_settings)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        user_settings = UserSettings.objects.get(user=request.user)

        try:
            if (request.data["language"] == "Spanish" or request.data["language"] == "English"):
                user_settings.language = request.data["language"]
        except KeyError:
            pass

        try:
            if (request.data["unit"] == "Miles" or request.data["unit"] == "Kilometers"):
                user_settings.unit = request.data["unit"]
        except KeyError:
            pass

        try:
            if (type(request.data["weekly_goal"]) == float):
                user_settings.weekly_goal = request.data["weekly_goal"]
        except KeyError:
            pass

        user_settings.save()

        return Response(SettingsSerializer(user_settings).data, status=status.HTTP_200_OK)

class VerificationCode(views.APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        follows_user = Follows.objects.get(user=request.user)

        try:
            code_submitted = request.data["code"]
            code_submitted = int(code_submitted)
        except:
            return Response({'detail': "Code empty"}, status=status.HTTP_401_UNAUTHORIZED)

        if code_submitted != int(follows_user.verification_code):
            return Response({'detail': "Code doesn't match"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            follows_user.verify_user()
            return Response({'detail': "User verified"}, status=status.HTTP_202_ACCEPTED)

class VerifyPasswordReset(views.APIView):
    def post(self, request, *args, **kwargs):
        try:
            email = request.data['email']
            code = request.data['code']
            password1 = request.data['password1']
            password2 = request.data['password2']
        except:
            return Response({'detail': "Arguments not provided"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            curr_user = User.objects.get(email=email)
            user_follows = Follows.objects.get(user__email=email)
        except:
            return Response({'detail': "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if password1 != password2:
            return Response({'detail': "Password don't match"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if len(str(password1)) <= 8 or len(str(password1)) >= 50:
            return Response({'detail': "Password length has to be from 8 to 50 characters"}, status=status.HTTP_401_UNAUTHORIZED)

        if int(code) != int(user_follows.verification_code):
            return Response({'detail': "Code doesn't match"}, status=status.HTTP_401_UNAUTHORIZED)

        else:
            # Change password
            curr_user.set_password(password1)
            curr_user.save()
            # user_follows.generate_new_code()
            return Response({'detail': "Password Changed"}, status=status.HTTP_202_ACCEPTED)

class SendResetPasswordMail(views.APIView):
    def post(self, request, *args, **kwargs):
        try:
            email = request.data['email']
        except:
            return Response({'detail': "Email not found"}, status=status.HTTP_401_UNAUTHORIZED)
            
        try:
            curr_user_follows = Follows.objects.get(user__email=email)
        except:
            return Response({'detail': "Not found"}, status=status.HTTP_401_UNAUTHORIZED)


        if request.user.id != None:
            return Response({'detail': "Not permitted"}, status=status.HTTP_401_UNAUTHORIZED)

        time_since_last_mail = curr_user_follows.time_since_last_mail()
        if time_since_last_mail < 10:
            return Response({'detail': "You have to wait at least one minute since the last sent mail"}, status=status.HTTP_401_UNAUTHORIZED)

        curr_user_follows.generate_new_code()

        send_mail(
            "Account Activation Code",
            f"Hello {curr_user_follows.user.username}, the code to reset your password is {curr_user_follows.verification_code}",
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False
        )
        return Response({'detail': "Success"}, status=status.HTTP_200_OK)

class SendVerificationMail(views.APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        curr_user_follows = Follows.objects.get(user=request.user)
        if curr_user_follows.is_verified:
            return Response({'detail': "User is already verified"}, status=status.HTTP_401_UNAUTHORIZED)

        time_since_last_mail = curr_user_follows.time_since_last_mail()
        if time_since_last_mail < 60:
            return Response({'detail': "You have to wait at least one minute since the last sent mail"}, status=status.HTTP_401_UNAUTHORIZED)

        elif time_since_last_mail > 60 * 15:
            curr_user_follows.generate_new_code();

        try:
            send_mail(
                "Account Activation Code", 
                f"The code to verify your email is {curr_user_follows.verification_code}", 
                settings.EMAIL_HOST_USER, 
                [request.user.email], 
                fail_silently=False
            )
        except Exception as exc:
            print(exc)

        return Response({'detail': "Email sent"}, status=status.HTTP_200_OK)

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter