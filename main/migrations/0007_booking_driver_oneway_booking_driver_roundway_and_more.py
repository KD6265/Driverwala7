# Generated by Django 4.1.7 on 2023-04-06 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_booking_driver_drop_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking_Driver_Oneway',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ride_type', models.CharField(max_length=50)),
                ('ride_for', models.CharField(max_length=50)),
                ('pickup_location', models.CharField(max_length=50)),
                ('drop_location', models.CharField(max_length=50, null=True)),
                ('vehicle_type', models.CharField(max_length=50)),
                ('vehicle_sub_type', models.CharField(max_length=50)),
                ('pickup_date', models.DateTimeField()),
                ('payment_mode', models.CharField(max_length=50)),
                ('city_id', models.IntegerField()),
                ('amount', models.FloatField()),
                ('duration', models.CharField(max_length=50)),
                ('discount_amount', models.FloatField()),
                ('promo_amount', models.FloatField()),
                ('payable_amount', models.FloatField()),
                ('ap_code_final', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Booking_Driver_Roundway',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ride_type', models.CharField(max_length=50)),
                ('ride_for', models.CharField(max_length=50)),
                ('pickup_location', models.CharField(max_length=50)),
                ('vehicle_type', models.CharField(max_length=50)),
                ('vehicle_sub_type', models.CharField(max_length=50)),
                ('pickup_date', models.DateTimeField()),
                ('drop_date', models.DateTimeField(null=True)),
                ('payment_mode', models.CharField(max_length=50)),
                ('city_id', models.IntegerField()),
                ('amount', models.FloatField()),
                ('duration', models.CharField(max_length=50)),
                ('discount_amount', models.FloatField()),
                ('promo_amount', models.FloatField()),
                ('payable_amount', models.FloatField()),
                ('ap_code_final', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Booking_driver',
        ),
    ]
