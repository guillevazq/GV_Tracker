# Generated by Django 3.2.6 on 2021-09-07 07:52

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_rename_distance_unit_usersettings_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersettings',
            name='language',
            field=models.CharField(default='English', max_length=100),
        ),
        migrations.AlterField(
            model_name='usersettings',
            name='unit',
            field=models.CharField(default='Miles', max_length=100),
        ),
        migrations.AlterField(
            model_name='usersettings',
            name='weekly_goal',
            field=models.FloatField(default=10.0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
