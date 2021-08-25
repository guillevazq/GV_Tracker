from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.account.models import EmailAddress
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import status
from rest_framework.views import View

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

@csrf_exempt
class ChangeEmail(View):
    def post(self):
        print(self.request.user)
        old_email = EmailAddress.objects.get(email=self.request.user.email)
        if old_email:
            old_email.change(self.request, self.request.new_email)
        return Response({"not_found", "The email address couldn't be retrieved"})