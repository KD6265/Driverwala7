# Generated by Django 4.1.7 on 2023-04-06 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_booking_driver_drop_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking_driver',
            name='drop_location',
            field=models.CharField(max_length=50, null=True),
        ),
    ]