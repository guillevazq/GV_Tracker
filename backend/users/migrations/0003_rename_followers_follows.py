# Generated by Django 3.2.6 on 2021-08-30 09:27

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0002_auto_20210830_0927'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Followers',
            new_name='Follows',
        ),
    ]
