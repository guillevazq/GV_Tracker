# Generated by Django 3.2.6 on 2021-08-22 22:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('runs', '0005_alter_run_minutes'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='run',
            options={'ordering': ('-date',)},
        ),
    ]