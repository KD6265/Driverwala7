from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, name, tc, password=None,password2=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            tc=tc,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,name, tc, password=None, password2=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email= self.normalize_email(email),
            password=password,
            name = name,
            tc= tc,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=255)
    tc =  models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name","tc"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
# ------------------------------------------ For Drivers --------------------------------
# class Driver(models.Model):
#     fname = models.CharField(max_length=70, null =False, blank=False,default="Krunal")
#     mname = models.CharField(max_length=70, null =False, blank=False,default="D")
#     lname = models.CharField(max_length=70, null =False, blank=False,default="Ninama")
#     age = models.PositiveIntegerField()
#     phone  = models.BigIntegerField(null =False, blank=False,default=1598526540)
#     email = models.EmailField(max_length=300, null =False,unique=True, blank=False,default="KD@gmail.com")
#     state = models.ForeignKey('State', on_delete=models.CASCADE,default=1)
#     district = models.ForeignKey('District', on_delete=models.CASCADE,default=1)
#     subdistrict = models.ForeignKey('Subdistrict', on_delete=models.CASCADE,default=1)
#     address = models.TextField(max_length=300, null =False, blank=False,default="anand")
#     zipcode = models.IntegerField(null =False, blank=False,default=388001)
#     aadharno = models.BigIntegerField(null = False, blank=False,default=1547419630145)
#     EXPERIENCE = [
#         ('Manual', 'Manual'),
#         ('Automatic', 'Automatic'),
#         ('Both', 'Both'),
#     ]
#     vytpe = models.CharField(max_length=20,choices=EXPERIENCE,default="both")
#     driver_type = models.ForeignKey('DriverType', on_delete=models.CASCADE,default=1)
#     driving_licence = models.ImageField(upload_to="RegLicence/",max_length=500,null=False,default=None)
#     selfie = models.ImageField(upload_to="RegSelfie",max_length=500,null=False,default=None)
#     password = models.CharField(max_length=200,null =False, blank=False,default="KDIT21022")
#     cpassword = models.CharField(max_length=200,null =False, blank=False,default="KDIT21022")
#     forget_password_token = models.CharField(max_length=255, null=True, blank=True)
#     plan = models.ForeignKey('Plan', on_delete=models.SET_NULL, null=True, blank=True)
#     last_paid_date = models.DateTimeField(null=True, blank=True)
#     created_at = models.DateTimeField(default=timezone.now)
#     last_login = models.DateTimeField(null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     approved = models.BooleanField(default=True)
    
    
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from dateutil.relativedelta import relativedelta

class State(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class District(models.Model):
    name = models.CharField(max_length=255)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Subdistrict(models.Model):
    name = models.CharField(max_length=255)
    district = models.ForeignKey(District, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class DriverType(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='driver_types/', null=True, blank=True)
    
    def __str__(self):
        return self.name
    
class Plan(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    months = models.PositiveIntegerField()

    def __str__(self):
        return self.name

    def get_expiry_date(self, last_paid_date):
        return last_paid_date + relativedelta(months=self.months)

class DriverManager(BaseUserManager):
    def create_user(self, fname, mname, lname, age, phone, email, state, district, subdistrict, address, zipcode,
                    aadharno, vytpe, driver_type, driving_licence, selfie, password, cpassword,
                    forget_password_token=None, plan=None, last_paid_date=None, is_active=True, is_staff=False,
                    approved=True):
        email = self.normalize_email(email)
        driver = self.model(
            fname=fname, mname=mname, lname=lname, age=age, phone=phone, email=email,
            state=state, district=district, subdistrict=subdistrict, address=address, zipcode=zipcode,
            aadharno=aadharno, vytpe=vytpe, driver_type=driver_type, driving_licence=driving_licence,
            selfie=selfie, password=password, cpassword=cpassword,
            forget_password_token=forget_password_token, plan=plan, last_paid_date=last_paid_date,
            is_active=is_active, is_staff=is_staff, approved=approved,
            created_at=timezone.now(), last_login=None
        )
        driver.set_password(password)
        driver.save(using=self._db)
        return driver

class Driver(AbstractBaseUser):
    fname = models.CharField(max_length=70, null=False, blank=False, default="Krunal")
    mname = models.CharField(max_length=70, null=False, blank=False, default="D")
    lname = models.CharField(max_length=70, null=False, blank=False, default="Ninama")
    age = models.PositiveIntegerField()
    phone = models.BigIntegerField(null=False, blank=False, default=1598526540)
    email = models.EmailField(max_length=300, null=False, unique=True, blank=False, default="KD@gmail.com")
    state = models.ForeignKey(State, on_delete=models.CASCADE, default=1)
    district = models.ForeignKey(District, on_delete=models.CASCADE, default=1)
    subdistrict = models.ForeignKey(Subdistrict, on_delete=models.CASCADE, default=1)
    address = models.TextField(max_length=300, null=False, blank=False, default="anand")
    zipcode = models.IntegerField(null=False, blank=False, default=388001)
    aadharno = models.BigIntegerField(null=False, blank=False, default=1547419630145)
    EXPERIENCE = [
        ('Manual', 'Manual'),
        ('Automatic', 'Automatic'),
        ('Both', 'Both'),
    ]
    vytpe = models.CharField(max_length=20, choices=EXPERIENCE, default="both")
    driver_type = models.ForeignKey(DriverType, on_delete=models.CASCADE, default=1)
    driving_licence = models.ImageField(upload_to="RegLicence/", max_length=500, null=False, default=None)
    selfie = models.ImageField(upload_to="RegSelfie", max_length=500, null=False, default=None)
    password = models.CharField(max_length=200, null=False, blank=False, default="KDIT21022")
    cpassword = models.CharField(max_length=200, null=False, blank=False, default="KDIT21022")
    forget_password_token = models.CharField(max_length=255, null=True, blank=True)
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, blank=True)
    last_paid_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    approved = models.BooleanField(default=True)

    objects = DriverManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email
