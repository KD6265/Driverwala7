# Generated by Django 4.1.7 on 2023-04-17 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='cpassword',
            field=models.CharField(default='KDIT21022', max_length=128),
        ),
    ]
