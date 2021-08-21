# Generated by Django 3.2.6 on 2021-08-21 13:26

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0004_auto_20210821_1320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='run',
            name='minutes',
            field=models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(4320)]),
        ),
    ]