# Generated by Django 4.1.7 on 2023-04-06 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_rename_payble_amount_booking_driver_payable_amount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking_driver',
            name='ap_code_final',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
