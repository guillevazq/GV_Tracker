# Generated by Django 3.2.6 on 2021-08-28 06:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0011_alter_run_unix_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='run',
            name='minutes',
        ),
        migrations.AlterField(
            model_name='run',
            name='seconds',
            field=models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(260000)]),
        ),
    ]