from django.contrib.auth.backends import BaseBackend
from .models import DriverSignUP ,Driver
from .models import Customer
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.hashers import make_password,check_password
class DriverAuthBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            try:
                driver = Driver.objects.get(email=email)
                if check_password(password, driver.password):
                    return driver
            except Driver.DoesNotExist:
                return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except Driver.DoesNotExist:
            try:
                return Driver.objects.get(pk=user_id)
            except Driver.DoesNotExist:
                return None
       
class CustomerBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            customer = Customer.objects.get(email=email)
            print("paaswoed",customer.password)
            if check_password(password,customer.password):
                return customer
        except Customer.DoesNotExist:
            return None

    def get_user(self, customer_id):
        try:
            return Customer.objects.get(pk=customer_id)
        except Customer.DoesNotExist:
            return None 


