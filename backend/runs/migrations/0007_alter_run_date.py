# Generated by Django 3.2.6 on 2021-08-25 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0006_alter_run_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='run',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
