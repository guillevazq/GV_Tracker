# Generated by Django 3.2.6 on 2021-09-18 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_alter_follows_verification_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='follows',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
