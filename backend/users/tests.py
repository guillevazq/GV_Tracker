from django.urls import reverse
import json
from rest_framework.test import APITestCase

from django.contrib.auth.models import User
from .models import Follows
from dj_rest_auth.models import TokenModel

class FollowingSystemTests(APITestCase):
    get_follows_url = staticmethod(lambda pk, action: reverse("follows", kwargs={'pk': pk, 'action': action}))
    get_visibility_url = staticmethod(lambda action: reverse("change-follow-visibility", kwargs={'privacy_type': action}))

    def set_token_in_header(self, token):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def register_user_get_info(self, username, email, password):
        user_registration_data = {"username": username, "email": email, "password1": password, "password2": password}
        response = json.loads(self.client.post("/users/registration/", user_registration_data, format='json').content)
        token = response["key"]
        user = User.objects.get(username=user_registration_data["username"])
        follows_user = Follows.objects.get(user=user)
        return user, token, follows_user

    def test_follow_account(self):
        user_1, token_1, follows_user_1 = self.register_user_get_info("Test_user_1", "test@test.com", "testing321")
        user_2, token_2, follows_user_2= self.register_user_get_info("Test_user_2", "test2@test.com", "testing321")

        self.client.force_login(user_1)
# 
        response = self.client.get(self.get_follows_url(user_2.pk, "follows"), format='json')
        self.assertEqual(response.data, {'detail': 'This profile is private'})

        response = self.client.get(self.get_follows_url(user_2.pk, "follow-user"), format='json')
        self.assertEqual(response.data, {'detail': 'Follow request sent succesfully'})

        response = self.client.get(self.get_follows_url(user_2.pk, "follow-user"), format='json')
        self.assertEqual(response.data, {'detail': "You've already sent a follow request to this user"})

        response = self.client.get(self.get_follows_url(user_1.pk, "follows"), format='json')
        self.assertEqual(response.data, {'detail': "You cannot do this to your own profile"})

        self.client.force_login(user_2)
        response = self.client.get(self.get_follows_url(user_1.pk, "follows"), format='json')
        # set_token_in_header(self.client, token_1)
        # set_token_in_header(self.client, token_2)