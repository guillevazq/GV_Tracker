# Generated by Django 3.2.6 on 2021-09-18 09:47

from django.db import migrations, models
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0019_alter_follows_verification_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follows',
            name='verification_code',
            field=models.CharField(default=users.models.generate_random_verification_code, max_length=5),
        ),
    ]
