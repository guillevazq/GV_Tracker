# Generated by Django 3.2.6 on 2021-08-25 13:13

from django.db import migrations, models
import runs.models


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0010_alter_run_unix_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='run',
            name='unix_date',
            field=models.IntegerField(validators=[runs.models.present_or_future_date]),
        ),
    ]
