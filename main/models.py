from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

# Create your models here.
import datetime
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

# class Customer(models.Model):
#     name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     selfie = models.ImageField(upload_to="CustSelfie", max_length=500, null=True, default=None)
#     mobile = models.CharField(max_length=20)
#     address = models.TextField()
#     password = models.CharField(max_length=128)
#     cpassword=models.CharField(max_length=128,default="KDIT21022")
#     last_login = models.DateTimeField(null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     USERNAME_FIELD = 'email'  # set email as the username field
#     def save(self, *args, **kwargs):
#         # Call set_password() to encrypt the password
#         self.set_password(self.password)
#         # Call the parent class's save() method to save the object
#         super().save(*args, **kwargs)
#     def set_password(self, raw_password):
#         self.password = make_password(raw_password)
#     def __str__(self):
#         return '{}{}'.format(self.name,self.email)
# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# from django.db import models
# from django.utils import timezone
# from django.utils.translation import gettext_lazy as _

# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError(_('The Email field must be set'))
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         if extra_fields.get('is_staff') is not True:
#             raise ValueError(_('Superuser must have is_staff=True.'))
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError(_('Superuser must have is_superuser=True.'))
#         return self.create_user(email, password, **extra_fields)

# class CustomUser(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(_('email address'), unique=True)
#     first_name = models.CharField(_('first name'), max_length=30, blank=True)
#     last_name = models.CharField(_('last name'), max_length=150, blank=True)
#     is_staff = models.BooleanField(
#         _('staff status'),
#         default=False,
#         help_text=_('Designates whether the user can log into this admin site.'),
#     )
#     is_active = models.BooleanField(
#         _('active'),
#         default=True,
#         help_text=_(
#             'Designates whether this user should be treated as active. '
#             'Unselect this instead of deleting accounts.'
#         ),
#     )
#     date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

#     objects = CustomUserManager()

#     EMAIL_FIELD = 'email'
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     class Meta:
#         verbose_name = _('user')
#         verbose_name_plural = _('users')

#     def clean(self):
#         super().clean()
#         self.email = self.__class__.objects.normalize_email(self.email)

#     def get_full_name(self):
#         """
#         Return the first_name plus the last_name, with a space in between.
#         """
#         full_name = '%s %s' % (self.first_name, self.last_name)
#         return full_name.strip()

#     def get_short_name(self):
#         """Return the short name for the user."""
#         return self.first_name

#     def email_user(self, subject, message, from_email=None, **kwargs):
#         """Send an email to this user."""
#         send_mail(subject, message, from_email, [self.email], **kwargs)

# from django.contrib.auth import get_user_model

# class Customer(models.Model):
#     user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='customer', default=1)
#     name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     selfie = models.ImageField(upload_to="CustSelfie", max_length=500, null=True, default=None)
#     mobile = models.CharField(max_length=20)
#     address = models.TextField()
#     cpassword=models.CharField(max_length=128,default="KDIT21022")
#     last_login = models.DateTimeField(null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return '{}{}'.format(self.name, self.email)

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

class Customer(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    mobile = models.CharField(max_length=20)
    address = models.TextField()
    selfie = models.ImageField(upload_to="CustSelfie", max_length=500, null=True, default=None)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'  # set email as the username field
    objects = CustomUserManager()
    groups = models.ManyToManyField(
    Group,
    verbose_name=_('groups'),
    blank=True,
    help_text=_(
        'The groups this user belongs to. A user will get all permissions '
        'granted to each of their groups.'
    ),
    related_name='customer_groups',  # Add related_name here
    related_query_name='customer',
)
    user_permissions = models.ManyToManyField(
    Permission,
    verbose_name=_('user permissions'),
    blank=True,
    help_text=_('Specific permissions for this user.'),
    related_name='customer_user_permissions',  # Add related_name here
    related_query_name='customer',
)

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        return '{}'.format(self.name)

class DriverSignUP(models.Model):
    fname = models.CharField(max_length=70, null =False, blank=False,default="Krunal")
    mname = models.CharField(max_length=70, null =False, blank=False,default="D")
    lname = models.CharField(max_length=70, null =False, blank=False,default="Ninama")
    age = models.PositiveIntegerField()
    phone  = models.BigIntegerField(null =False, blank=False,default=1598526540)
    email = models.EmailField(max_length=300, null =False,unique=True, blank=False,default="KD@gmail.com")
    state = models.ForeignKey('State', on_delete=models.CASCADE,default=1)
    district = models.ForeignKey('District', on_delete=models.CASCADE,default=1)
    subdistrict = models.ForeignKey('Subdistrict', on_delete=models.CASCADE,default=1)
    address = models.TextField(max_length=300, null =False, blank=False,default="anand")
    zipcode = models.IntegerField(null =False, blank=False,default=388001)
    aadharno = models.BigIntegerField(null = False, blank=False,default=1547419630145)
    EXPERIENCE = [
        ('Manual', 'Manual'),
        ('Automatic', 'Automatic'),
        ('Both', 'Both'),
    ]
    vytpe = models.CharField(max_length=20,choices=EXPERIENCE,default="both")
    driver_type = models.ForeignKey('DriverType', on_delete=models.CASCADE,default=1)
    driving_licence = models.ImageField(upload_to="RegLicence/",max_length=500,null=False,default=None)
    selfie = models.ImageField(upload_to="RegSelfie",max_length=500,null=False,default=None)
    password = models.CharField(max_length=200,null =False, blank=False,default="KDIT21022")
    cpassword = models.CharField(max_length=200,null =False, blank=False,default="KDIT21022")
    plan = models.ForeignKey('Plan', on_delete=models.SET_NULL, null=True, blank=True)
    last_paid_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    approved = models.BooleanField(default=True)
    USERNAME_FIELD = 'email'
    def save(self, *args, **kwargs):
        # Call set_password() to encrypt the password
        self.set_password(self.password)

        # Call the parent class's save() method to save the object
        super().save(*args, **kwargs)
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    def __str__(self):
        return '{}{}{}'.format(self.fname,self.mname,self.lname)

class Driver(models.Model):
    fname = models.CharField(max_length=70, null =False, blank=False,default="Krunal")
    mname = models.CharField(max_length=70, null =False, blank=False,default="D")
    lname = models.CharField(max_length=70, null =False, blank=False,default="Ninama")
    age = models.PositiveIntegerField()
    phone  = models.BigIntegerField(null =False, blank=False,default=1598526540)
    email = models.EmailField(max_length=300, null =False,unique=True, blank=False,default="KD@gmail.com")
    state = models.ForeignKey('State', on_delete=models.CASCADE,default=1)
    district = models.ForeignKey('District', on_delete=models.CASCADE,default=1)
    subdistrict = models.ForeignKey('Subdistrict', on_delete=models.CASCADE,default=1)
    address = models.TextField(max_length=300, null =False, blank=False,default="anand")
    zipcode = models.IntegerField(null =False, blank=False,default=388001)
    aadharno = models.BigIntegerField(null = False, blank=False,default=1547419630145)
    EXPERIENCE = [
        ('Manual', 'Manual'),
        ('Automatic', 'Automatic'),
        ('Both', 'Both'),
    ]
    vytpe = models.CharField(max_length=20,choices=EXPERIENCE,default="both")
    driver_type = models.ForeignKey('DriverType', on_delete=models.CASCADE,default=1)
    driving_licence = models.ImageField(upload_to="RegLicence/",max_length=500,null=False,default=None)
    selfie = models.ImageField(upload_to="RegSelfie",max_length=500,null=False,default=None)
    password = models.CharField(max_length=200,null =False, blank=False,default="KDIT21022")
    cpassword = models.CharField(max_length=200,null =False, blank=False,default="KDIT21022")
    forget_password_token = models.CharField(max_length=255, null=True, blank=True)
    plan = models.ForeignKey('Plan', on_delete=models.SET_NULL, null=True, blank=True)
    last_paid_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    approved = models.BooleanField(default=True)
    # USERNAME_FIELD = 'email'
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
    def __str__(self):
        return '{}{}{}'.format(self.fname,self.mname,self.lname)


    def activate_profile(self):
        self.is_active = True
        self.last_paid_date = timezone.now()
         
  
class Booking_Driver_Oneway(models.Model):
        
        driver = models.ForeignKey(Driver, on_delete=models.CASCADE,default=1)
        customer = models.ForeignKey(Customer, on_delete=models.CASCADE,default=4)
        ride_type = models.CharField(max_length=50)
        ride_for = models.CharField(max_length=50)
        pickup_location = models.CharField(max_length=100)
        drop_location = models.CharField(max_length=100,null=True)
        vehicle_type = models.CharField(max_length=50)
        vehicle_sub_type = models.CharField(max_length=50)
        pickup_date = models.DateTimeField()
        payment_mode = models.CharField(max_length=50)
        city_id = models.IntegerField()
        amount = models.FloatField()
        duration = models.CharField(max_length=50)
        discount_amount = models.FloatField()
        promo_amount = models.FloatField()
        payable_amount = models.FloatField()
        ap_code_final = models.CharField(max_length=50,null=True)
        
class Booking_Driver_Roundway(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE,null=False,default=1)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,default=4)

    ride_type = models.CharField(max_length=50)
    ride_for = models.CharField(max_length=50)
    pickup_location = models.CharField(max_length=50)
    vehicle_type = models.CharField(max_length=50)
    vehicle_sub_type = models.CharField(max_length=50)
    pickup_date = models.DateTimeField()
    drop_date = models.DateTimeField(null=True)
    payment_mode = models.CharField(max_length=50)
    city_id = models.IntegerField()
    amount = models.FloatField()
    duration = models.CharField(max_length=50)
    discount_amount = models.FloatField()
    promo_amount = models.FloatField()
    payable_amount = models.FloatField()
    ap_code_final = models.CharField(max_length=50,null=True)    


class ContactUS(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True)
    comments = models.TextField()
    def __str__(self):
        return f"{self.name} - {self.email}"

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='blog_images/')
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.CharField(max_length=255, editable=False)

    def save(self, *args, **kwargs):
        # get the current logged in user object
        user = kwargs.pop('user', None)
        if user:
            self.author = user.username
        super(BlogPost, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
    
class PaymentDetails(models.Model):
    PAYMENT_CHOICES = (
        ('oneway', 'One Way'),
        ('roundway', 'Round Way'),
        ('plan', 'Plan'),
    )
    payment_for = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    booking_oneway = models.OneToOneField(Booking_Driver_Oneway, on_delete=models.CASCADE, blank=True, null=True)
    booking_roundway = models.OneToOneField(Booking_Driver_Roundway, on_delete=models.CASCADE, blank=True, null=True)
    booking_plan = models.OneToOneField(Plan, on_delete=models.CASCADE, blank=True, null=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE,blank=True,null=True)
    # plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    transaction_id = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):  
        return self.booking_oneway 