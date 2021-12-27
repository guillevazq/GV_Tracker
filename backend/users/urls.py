from django.urls import path, include
from .views import *

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('follows/<str:username>/<str:action>/', FollowsView.as_view(), name="follows"),
    path('follow-visibility/<str:privacy_type>/', ChangeFollowStatus.as_view(), name="change-follow-visibility"),
    path('verification-code/', VerificationCode.as_view(), name='verify-code'),
    path('verification-password-code/', VerifyPasswordReset.as_view(), name='verify-email-code'),
    path('send-verification-mail/', SendVerificationMail.as_view(), name='verify-mail'),
    path('send-reset-password-mail/', SendResetPasswordMail.as_view(), name='reset-password-mail'),
    path('settings/', ChangeSettings.as_view(), name='change-user-settings'),
    
    # Social logins
    path('twitter/', TwitterLogin.as_view(), name='twitter_login'),
    path('facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('apple/', AppleLogin.as_view(), name='apple_login'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
]