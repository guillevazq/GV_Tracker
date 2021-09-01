from django.db import models
from django.db.models.signals import post_init, post_save
from django.contrib.auth.models import User

class Follows(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="main_user")
    followers = models.ManyToManyField(User, blank=True, related_name="followers")
    following = models.ManyToManyField(User, blank=True, related_name="following")
    is_private = models.BooleanField(default=True)
    sent_follow_requests = models.ManyToManyField(User, blank=True, related_name="sent_requests")
    recieved_follow_requests = models.ManyToManyField(User, blank=True, related_name="recieved_requests")

    def start_following(self, account):
        self.following.add(account)
        Follows.objects.get(user=account).followers.add(self.user)
    
    def stop_following(self, account):
        self.following.remove(account)
        Follows.objects.get(user=account).followers.remove(self.user)

    def send_follow_request(self, account):
        self.sent_follow_requests.add(account)
        Follows.objects.get(user=account).recieved_follow_requests.add(self.user)
        
    def abort_follow_request(self, account):
        self.sent_follow_requests.remove(account)
        Follows.objects.get(user=account).recieved_follow_requests.remove(self.user)
    
    def accept_follow_request(self, account):
        self.recieved_follow_requests.remove(account)
        Follows.objects.get(user=account).sent_follow_requests.remove(self.user)
        self.followers.add(account)
        Follows.objects.get(user=account).following.add(self.user)
    
    def reject_follow_request(self, account):
        self.recieved_follow_requests.remove(account)
        Follows.objects.get(user=account).sent_follow_requests.remove(self.user)

    def set_account_private(self):
        self.is_private = True
        self.save()

    def set_account_public(self):
        self.is_private = False
        self.save()

    def __str__(self):
        return self.user.username + "'s Follows"

    class Meta:
        verbose_name = "Follows"
        verbose_name_plural = "Follows"


# Signals
def create_profile(sender, instance, created, **kwargs):
    if created: 
        Follows.objects.create(user=instance)

post_save.connect(create_profile, User)