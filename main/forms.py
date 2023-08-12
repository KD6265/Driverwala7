from django import forms
from .models import State, District, Subdistrict,ContactUS
from django.forms.widgets import DateTimeInput, DateInput


# class BookingForm(forms.ModelForm):
#     # pickup_time = forms.TimeField(widget=forms.TimeInput(format='%H:%M'))
#     # pickup_time = forms.DateTimeField(widget=DateTimeInput(format='%Y-%m-%d %H:%M'))
#     # pickup_date = forms.DateField(widget=DateInput(attrs={'type': 'date'}))
#     class Meta:
#         model = Booking
#         fields = ('customer_name', 'customer_phone', 'pickup_address', 'drop_address', 'pickup_date', 'pickup_time', 'notes')
#         widgets = {
#             'pickup_time': DateTimeInput(attrs={'type': 'time'}),
#             'pickup_date': DateInput(attrs={'type': 'date'}),
#         }   
        

class DriverCreateForm(forms.Form):
    num_drivers = forms.IntegerField(label='Number of Drivers', min_value=1, max_value=100000)

from django import forms 
from .models import DriverSignUP,Driver
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.hashers import make_password

 
class DriverForm(forms.ModelForm):  
    class Meta:  
        model =   DriverSignUP
        fields = ('fname','mname','lname','age', 'phone','email','state','district','subdistrict','address','zipcode','aadharno','vytpe','driver_type','driving_licence','selfie','password','cpassword',)  
        widgets = {
            'fname': forms.TextInput(attrs={'name':'fname','id': 'fname','class': 'form-control','placeholder':'First Name'}),
            'mname': forms.TextInput(attrs={'name':'mname','id': 'mname','class': 'form-control','placeholder':'Middle Name'}),
            'lname': forms.TextInput(attrs={'name':'lname','id': 'lname','class': 'form-control','placeholder':'Last Name'}),
            'age': forms.NumberInput(attrs={'name':'age','id': 'age','class': 'form-control','placeholder':'Age'}),
            'phone': forms.NumberInput(attrs={'name':'phone','id': 'phone','class': 'form-control','placeholder':'Phone Number'}),
            'email': forms.EmailInput(attrs={'name':'email','id': 'email','class': 'form-control','placeholder':'Email Address'}),
            'state': forms.Select(attrs={'name':'state','id': 'state','class': 'form-control'}),
            'district': forms.Select(attrs={'name':'district','id': 'district','class': 'form-control'}),
            'subdistrict': forms.Select(attrs={'name':'subdistrict','id': 'subdistrict','class': 'form-control'}),
            'address': forms.Textarea(attrs={'name':'address','id': 'address','class': 'form-control','placeholder':'Address','rows':3}),
            'zipcode': forms.NumberInput(attrs={'name':'zipcode','id': 'zipcode','class': 'form-control','placeholder':'Zip Code'}),
            'aadharno': forms.NumberInput(attrs={'name':'aadharno','id': 'aadharno','class': 'form-control','placeholder':'Aadhar Number'}),
            'vytpe': forms.Select(attrs={'name':'vytpe','id': 'vytpe','class': 'form-control'}),
            'driver_type': forms.Select(attrs={'name':'driver_type','id': 'driver_type','class': 'form-control'}),
            'driving_licence': forms.ClearableFileInput(attrs={'name':'driving_licence','id': 'driving_licence','class': 'form-control-file'}),
            'selfie': forms.ClearableFileInput(attrs={'name':'selfie','id': 'selfie','class': 'form-control-file'}),
            'password': forms.PasswordInput(attrs={'name':'password','id': 'password','class': 'form-control','placeholder':'Password'}),
            'cpassword': forms.PasswordInput(attrs={'name':'cpassword','id': 'cpassword','class': 'form-control','placeholder':'Confirm Password'}),
        }  
    def save(self, commit=True):
        user = super().save(commit=False)
        user.password = make_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user
# class DriverForm(forms.ModelForm):  
#     fname = forms.CharField(label='First Name',max_length=70,widget=forms.TextInput(attrs={'name':'fname','id': 'fname','class': 'form-control','placeholder':'First Name'}))
#     mname = forms.CharField(label='Middle Name',max_length=70,widget=forms.TextInput(attrs={'name':'mname','id': 'mname','class': 'form-control ','placeholder':'Middle Name'}))
#     lname = forms.CharField(label='Last Name',max_length=70,widget=forms.TextInput(attrs={'name':'lname','id': 'lname','class': 'form-control ','placeholder':'Last Name'}))
#     age = forms.CharField(label='Age',max_length=50,widget=forms.NumberInput(attrs={'name':'age','id': 'age','class': 'form-control ','placeholder':'Age'}))
#     phone = forms.IntegerField(label='Phone Number',widget=forms.NumberInput(attrs={'name':'phone','id': 'phone','class': 'form-control ','placeholder':'Phone','maxlength':'10',}))
#     email = forms.EmailField(label='Email',max_length=30,widget=forms.EmailInput(attrs={'name':'email','id': 'email','class': 'form-control ','placeholder':'Email'}))
   
#    #             'state': forms.Select(attrs={'name':'state','id': 'state','class': 'form-control'}),
# #             'district': forms.Select(attrs={'name':'district','id': 'district','class': 'form-control'}),
# #             'subdistrict': forms.Select(attrs={'name':'subdistrict','id': 'subdistrict','class': 'form-control'}),

    
#     address = forms.CharField(label='Address',max_length=50,widget=forms.Textarea(attrs={'name':'address','id': 'address validationTextarea','class': 'form-control ','placeholder':'Address','rows':'2'}))
#     zipcode = forms.IntegerField(label='Zip/Postal Code',widget=forms.NumberInput(attrs={'name':'zipcode','id': 'zipcode','class': 'form-control ','placeholder':'Zip/Postal Code','maxlength':'10',}))
#     state = forms.CharField(label='State',max_length=50,widget=forms.TextInput(attrs={'name':'state','id': 'state','class': 'form-control ','placeholder':'State'}))
#     aadharno = forms.IntegerField(label='Aadhar Number',widget=forms.NumberInput(attrs={'name':'aadharno','id': 'aadharno','class': 'form-control ','placeholder':'Aadhar Number','maxlength':'10',}))
#     vytpe = forms.ChoiceField(label='Gear type',widget=forms.Select(attrs={'name':'vytpe','id': 'vytpe','class': 'form-control ','placeholder':'Gear type',}),initial='select')
   
#     driving_licence = forms.ImageField(label='Driving licence',widget=forms.FileInput(attrs={'name':'driving_licence','id': 'driving_licence','class': 'form-control ','placeholder':'Driving licence',}))
#     selfie = forms.ImageField(label='Your Photo',widget=forms.FileInput(attrs={'name':'selfie','id': 'selfie','class': 'form-control ','placeholder':'Your Photo',}))
#     password = forms.CharField(label='Password',max_length=50,widget=forms.PasswordInput(attrs={'name':'password','id': 'password','class': 'form-control ','placeholder':'Password',}))
#     cpassword = forms.CharField(label='Confirm Password',max_length=50,widget=forms.PasswordInput(attrs={'name':'cpassword','id': 'cpassword','class': 'form-control ','placeholder':'Confirm Password',}))
#     class Meta:  
#         model =   DriverSignUP
#         fields = ('fname','mname','lname','age', 'phone','email','state','district','subdistrict','address','zipcode','aadharno','vytpe','driver_type','driving_licence','selfie','password','cpassword',)  
    
#     def save(self, commit=True):
#         user = super().save(commit=False)
#         user.password = make_password(self.cleaned_data['password'])
#         if commit:
#             user.save()
#         return user


class ResetPasswordForm(PasswordChangeForm):
    new_password1 = forms.CharField(label='New Password', widget=forms.PasswordInput(attrs={'class': 'form-control ps-5'}))
    new_password2 = forms.CharField(label='Confirm New Password', widget=forms.PasswordInput(attrs={'class': 'form-control ps-5'}))

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('old_password')

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data.get('new_password1') != cleaned_data.get('new_password2'):
            raise forms.ValidationError('The new password and confirmation password do not match.')
        
class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Driver
        fields =  '__all__'

class ContactUsForm(forms.Form):
    name = forms.CharField(label='Your Name', max_length=100, widget=forms.TextInput(attrs={'id':'name','class': 'form-control ps-5 ', 'placeholder': 'Your Name'}))
    email = forms.EmailField(label='Your Email', max_length=100, widget=forms.EmailInput(attrs={'id':'email','class': 'form-control ps-5 ', 'placeholder': 'Your Email'}))
    subject = forms.CharField(label='Subject', max_length=100, widget=forms.TextInput(attrs={'id':'subject','class': 'form-control ps-5 ', 'placeholder': 'Subject','rows':'4'}))
    comments = forms.CharField(label='Message', widget=forms.Textarea(attrs={'id':'comments','class': 'form-control ps-5 ', 'placeholder': 'Message'}))
    class Meta:
        model = ContactUS
        # fields =  '__all__'
        
    def save(self):
        # Save data to model
        contact = ContactUS(
            name=self.cleaned_data['name'],
            email=self.cleaned_data['email'],
            subject=self.cleaned_data['subject'],
            message=self.cleaned_data['comments'],
        )
        contact.save()
    
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from .models import Customer

class CustomerRegistrationForm(UserCreationForm):
    email = forms.EmailField(
        label='Your Email', 
        max_length=100, 
        widget=forms.EmailInput(
            attrs={
                'id': 'email', 
                'class': 'form-control ', 
                'placeholder': 'Your Email'
            }
        )
    )
    name = forms.CharField(
        label='Full Name', 
        max_length=255, 
        widget=forms.TextInput(
            attrs={
                'class': 'form-control ', 
                'placeholder': 'Your Full Name'
            }
        )
    )
    mobile = forms.CharField(
        label='Mobile Number', 
        max_length=20, 
        widget=forms.TextInput(
            attrs={
                'class': 'form-control ', 
                'placeholder': 'Your Mobile Number'
            }
        )
    )
    address = forms.CharField(
        label='Address', 
        widget=forms.Textarea(
            attrs={
                'class': 'form-control ', 
                'placeholder': 'Your Address', 
                'rows': 3
            }
        )
    )
    selfie = forms.ImageField(label='Selfie',required=False,widget=forms.FileInput(attrs={'class': 'form-control ', 'accept': 'image/*'}))
    password1 = forms.CharField(label='Password',strip=False,widget=forms.PasswordInput(attrs={'class': 'form-control ', 'placeholder': 'Your Password'}),)
    password2 = forms.CharField(label='Confirm Password',widget=forms.PasswordInput(attrs={'class': 'form-control ', 'placeholder': 'Confirm Your Password'}),strip=False,)

    class Meta(UserCreationForm.Meta):
        model = Customer
        fields = ['email', 'name', 'mobile', 'address', 'selfie', 'password1', 'password2']

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Passwords do not match')
        return password2

    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.email = self.cleaned_data.get('email')
        user.name = self.cleaned_data.get('name')
        user.mobile = self.cleaned_data.get('mobile')
        user.address = self.cleaned_data.get('address')
        user.selfie = self.cleaned_data.get('selfie')
        user.save()
        return user
