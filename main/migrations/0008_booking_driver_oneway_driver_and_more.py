# Generated by Django 4.1.7 on 2023-04-06 19:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_booking_driver_oneway_booking_driver_roundway_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking_driver_oneway',
            name='driver',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.driver'),
        ),
        migrations.AddField(
            model_name='booking_driver_roundway',
            name='driver',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.driver'),
        ),
    ]
