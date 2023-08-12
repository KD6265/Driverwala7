# Generated by Django 4.1.7 on 2023-04-13 21:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_remove_driver_district_remove_driver_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='driver',
            name='city',
        ),
        migrations.AddField(
            model_name='driver',
            name='district',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.district'),
        ),
        migrations.AddField(
            model_name='driver',
            name='state',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.state'),
        ),
        migrations.AddField(
            model_name='driver',
            name='subdistrict',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.subdistrict'),
        ),
    ]