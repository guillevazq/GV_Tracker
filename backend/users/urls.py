from django.urls import path, include
from .views import ChangeEmail, TwitterLogin, FacebookLogin, AppleLogin, GoogleLogin, ChangeEmail
from allauth.account.views import EmailView, LogoutView, EmailAddress
from dj_rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    # path('logout/', LogoutView.as_view(), name='account_logout'),
    path('change-email-custom/', ChangeEmail, name='change-email-custom'),
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),

    # Social logins
    path('twitter/', TwitterLogin.as_view(), name='twitter_login'),
    path('facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('apple/', AppleLogin.as_view(), name='apple_login'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
]