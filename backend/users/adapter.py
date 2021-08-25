from allauth.account.adapter import DefaultAccountAdapter
from django.forms import ValidationError

class UsernameMaxAdapter(DefaultAccountAdapter):
    def clean_username(self, username):
        if len(username) < 4 or len(username) > 40:
            raise ValidationError('Please enter a username of at least 4 characters and less than 40')
        return DefaultAccountAdapter.clean_username(self,username)