# Generated by Django 4.1.7 on 2023-04-15 10:38

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_alter_driver_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='driver',
            name='forget_password_token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.CreateModel(
            name='DriverSignUP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(default='Krunal', max_length=70)),
                ('mname', models.CharField(default='D', max_length=70)),
                ('lname', models.CharField(default='Ninama', max_length=70)),
                ('age', models.PositiveIntegerField()),
                ('phone', models.BigIntegerField(default=1598526540)),
                ('email', models.EmailField(default='KD@gmail.com', max_length=300, unique=True)),
                ('address', models.TextField(default='anand', max_length=300)),
                ('zipcode', models.IntegerField(default=388001)),
                ('aadharno', models.BigIntegerField(default=1547419630145)),
                ('vytpe', models.CharField(choices=[('Manual', 'Manual'), ('Automatic', 'Automatic'), ('Both', 'Both')], default='both', max_length=20)),
                ('driving_licence', models.ImageField(default=None, max_length=500, upload_to='RegLicence/')),
                ('selfie', models.ImageField(default=None, max_length=500, upload_to='RegSelfie')),
                ('password', models.CharField(default='KDIT21022', max_length=200)),
                ('cpassword', models.CharField(default='KDIT21022', max_length=200)),
                ('last_paid_date', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('approved', models.BooleanField(default=True)),
                ('district', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.district')),
                ('driver_type', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.drivertype')),
                ('plan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.plan')),
                ('state', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.state')),
                ('subdistrict', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='main.subdistrict')),
            ],
        ),
    ]
