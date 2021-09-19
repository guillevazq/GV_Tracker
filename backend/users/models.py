from random import randint
import time

from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

from runs.models import Run

def generate_random_verification_code():
    return randint(100_000, 999_999)

class Follows(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="main_user")
    followers = models.ManyToManyField(User, blank=True, related_name="followers")
    following = models.ManyToManyField(User, blank=True, related_name="following")
    is_private = models.BooleanField(default=True)
    sent_follow_requests = models.ManyToManyField(User, blank=True, related_name="sent_requests")
    recieved_follow_requests = models.ManyToManyField(User, blank=True, related_name="recieved_requests")
    favorite_followed_users = models.ManyToManyField(User, blank=True, related_name="favorite_users")
    blocked_users = models.ManyToManyField(User, blank=True, related_name="blocked_users")
    verification_code = models.CharField(default=generate_random_verification_code, max_length=6)
    is_verified = models.BooleanField(default=False)
    last_sent_email = models.PositiveIntegerField(default=0)

    def generate_new_code(self):
        self.verification_code = generate_random_verification_code()
        self.save()

    def time_since_last_mail(self):
        seconds_since_last_mail = time.time() - self.last_sent_email
        return seconds_since_last_mail
    
    def set_new_mail_time(self):
        self.last_sent_email = time.time()
        self.save()

    def verify_user(self):
        self.is_verified = True
        self.save()

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

    def is_account_verified(self):
        return self.is_verified

    def add_favorite_user(self, account):
        self.favorite_followed_users.add(account)

    def remove_favorite_user(self, account):
        self.favorite_followed_users.remove(account)
    
    def block_user(self, account):
        self.blocked_users.add(account)
    
    def unblock_user(self, account):
        self.blocked_users.remove(account)

    def __str__(self):
        return self.user.username + "'s Follows"
    
    def number_of_followers(self):
        return self.followers.count

    def number_of_following(self):
        return self.following.count

    def get_total_distance_and_time(self):
        runs = Run.objects.filter(runner=self.user)
        total_distance = 0
        total_time = 0
        for run in runs.iterator():
            total_distance += run.distance
            total_time += run.seconds
        return total_distance, total_time

    def following_data(self):
        following = []
        for user in self.following.iterator():
            current_profile = Follows.objects.get(user=user)
            total_distance, total_time = self.get_total_distance_and_time()
            is_favorite = user in self.favorite_followed_users.all()
            following.append({
                "username": user.username,
                "followers": current_profile.followers.count(),
                "following": current_profile.following.count(),
                "total_time": total_time,
                "total_distance": total_distance,
                "followed_by_you": True,
                "is_favorite": is_favorite
            })
        return following
    
    def follower_data(self):
        followers = []
        for user in self.followers.iterator():
            current_profile = Follows.objects.get(user=user)
            is_followed = self.user in current_profile.followers.all()
            if user in self.sent_follow_requests.all():
                is_followed = "request-sent"
            total_distance, total_time = self.get_total_distance_and_time()
            followers.append({
                "username": user.username,
                "followers": current_profile.followers.count(),
                "following": current_profile.following.count(),
                "followed_by_you": is_followed,
                "total_time": total_time,
                "total_distance": total_distance,
                "is_private": current_profile.is_private,
            })
        return followers

    def sent_requests_data(self):
        users_sent = []
        for user in self.sent_follow_requests.iterator():
            current_profile = Follows.objects.get(user=user)
            total_distance, total_time = self.get_total_distance_and_time()
            users_sent.append({
                "username": user.username,
                "followers": current_profile.followers.count(),
                "following": current_profile.following.count(),
                "total_time": total_time,
                "total_distance": total_distance,
            })
        return users_sent

    def recieved_requests_data(self):
        recieved_requests = []
        for user in self.recieved_follow_requests.iterator():
            current_profile = Follows.objects.get(user=user)
            total_distance, total_time = self.get_total_distance_and_time()
            recieved_requests.append({
                "username": user.username,
                "followers": current_profile.followers.count(),
                "following": current_profile.following.count(),
                "total_time": total_time,
                "total_distance": total_distance,
            })
        return recieved_requests

    def favorites_data(self):
        favorite_users = []
        for user in self.favorite_followed_users.iterator():
            favorite_users.append(user.username)
        return favorite_users
    
    class Meta:
        verbose_name = "Follows"
        verbose_name_plural = "Follows"

class UserSettings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    unit = models.CharField(max_length=100, default="Miles")
    language = models.CharField(max_length=100, default="English")
    weekly_goal = models.FloatField(default=10.00, validators=[MinValueValidator(0.1)])

    def __str__(self):
        return f"Settings - {self.user}"

# Signals
def create_profile(sender, instance, created, **kwargs):
    if created: 
        curr_user_follows = Follows.objects.create(user=instance)
        UserSettings.objects.create(user=instance)

post_save.connect(create_profile, User)