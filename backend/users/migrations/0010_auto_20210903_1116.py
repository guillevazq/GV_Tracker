# Generated by Django 3.2.6 on 2021-09-03 11:16

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0009_follows_favorite_followed_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='follows',
            name='blocked_users',
            field=models.ManyToManyField(blank=True, related_name='blocked_users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='follows',
            name='favorite_followed_users',
            field=models.ManyToManyField(blank=True, related_name='favorite_users', to=settings.AUTH_USER_MODEL),
        ),
    ]
