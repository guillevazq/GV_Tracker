from django.urls import path, include
from .views import TwitterLogin, FacebookLogin, AppleLogin, GoogleLogin
from dj_rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),

    # Social logins
    path('twitter/', TwitterLogin.as_view(), name='twitter_login'),
    path('facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('apple/', AppleLogin.as_view(), name='apple_login'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
]