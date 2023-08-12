# Generated by Django 4.1.7 on 2023-04-23 19:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_alter_customer_options_alter_customer_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking_driver_oneway',
            name='customer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.customer'),
        ),
        migrations.AddField(
            model_name='booking_driver_roundway',
            name='customer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.customer'),
        ),
    ]