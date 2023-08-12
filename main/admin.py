from django.contrib import admin
from .models import State,District,Subdistrict,Driver,DriverType,Plan,Booking_Driver_Oneway,Booking_Driver_Roundway,ContactUS,BlogPost,Customer,PaymentDetails

# Register your models here.
from .models import DriverSignUP,Driver
from django.urls import reverse
from django.utils.html import format_html
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import User
# Register your models here.

class DriverSignUPAdmin(admin.ModelAdmin):
    list_display =('fname','mname','lname','age', 'phone','email','state','district','subdistrict','address','zipcode','aadharno','vytpe','driver_type','driving_licence','selfie','password','cpassword','approved','approval_status',) 
    actions = ['approve_selected', 'reject_selected']# list_display = ('id', 'name', )ZB NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNnnnnn
    def approval_status(self, obj):
        if obj.approved:
            return format_html('<span style="color: green;">Approved</span>')
        else:
            return format_html('<span style="color: red;">Pending</span>')

    def approve_selected(self, request, queryset):
        for driver_signup in queryset:
            # Send Email To Drivars
            subject = "Your DriverSignUp request has been approved"
            message = f"Dear {driver_signup.fname} {driver_signup.lname} ,\nYour DriverSignUp request has been approved. You can now login to our system as a driver. Thank you for your interest in our service.\nBest regards,\nThe Admin Team"
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [driver_signup.email]
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)
            
            # Send Email To Admins
            Approve_superuser = request.user
            recipients =  [user.email for user in User.objects.filter(is_superuser=True)] 
            print("admin",recipients)  
            Admin_subject = "DriverSignUp request has been approved"
            Admin_message = f"Dear Admin,\n\nThe DriverSignup with id {driver_signup.id} and name {driver_signup.fname} {driver_signup.lname}has been approved by {Approve_superuser.username}.\n\nBest regards,\nThe Admin Team"
            from_email = settings.DEFAULT_FROM_EMAIL
            recipients =  [user.email for user in User.objects.filter(is_superuser=True)]
            send_mail(Admin_subject, Admin_message, from_email, recipients, fail_silently=False)

            # Send data to Main Driver table
            driver = Driver.objects.create(fname=driver_signup.fname,mname=driver_signup.mname,lname=driver_signup.lname,age=driver_signup.age,state=driver_signup.state,district=driver_signup.district,subdistrict=driver_signup.subdistrict, email=driver_signup.email, phone=driver_signup.phone,address=driver_signup.address,zipcode=driver_signup.zipcode,aadharno=driver_signup.aadharno,vytpe=driver_signup.vytpe,driving_licence=driver_signup.driving_licence,driver_type=driver_signup.driver_type,selfie=driver_signup.selfie,password=driver_signup.password,cpassword=driver_signup.cpassword,)

            driver_signup.delete()
           
    approve_selected.short_description = "Approve selected DriverSignUp"

    def reject_selected(self, request, queryset):
        queryset.delete()
    reject_selected.short_description = "Reject selected DriverSignUp"
admin.site.register(DriverSignUP, DriverSignUPAdmin)



class DriverAdmin(admin.ModelAdmin):
    list_display =('fname','mname','lname', 'phone','email','state','district','subdistrict','address','zipcode','aadharno','vytpe','driver_type','driving_licence','selfie','password','cpassword','forget_password_token')
    def has_module_perms(self, request):
        return False
admin.site.register(Driver, DriverAdmin)






admin.site.register(State)
# admin.site.register(District)
admin.site.register(Subdistrict)
# admin.site.register(Driver)
# admin.site.register(Booking)
# admin.site.register(DriverType)
admin.site.register(Plan)
# admin.site.register(PaymentDetails)
admin.site.register(Booking_Driver_Oneway)
admin.site.register(Booking_Driver_Roundway)


# class SubdistrictAdmin(admin.ModelAdmin):
#     list_display =('name','district',)
# admin.site.register(District, SubdistrictAdmin)

class DistrictAdmin(admin.ModelAdmin):
    list_display =('name','state',)
admin.site.register(District, DistrictAdmin)

class DriverTypeAdmin(admin.ModelAdmin):
    list_display =('name','image',)
admin.site.register(DriverType, DriverTypeAdmin)

class ContactUSAdmin(admin.ModelAdmin):
    list_display =('name','email','subject','comments')
admin.site.register(ContactUS, ContactUSAdmin)

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date_posted')
    list_filter = ('author', 'date_posted')
    search_fields = ('title', 'author')
    date_hierarchy = 'date_posted'

    def save_model(self, request, obj, form, change):
        if not change:  # if creating new object
            obj.author = request.user  # set the author to the current user
        obj.save()

admin.site.register(BlogPost, BlogPostAdmin)


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile', 'address', 'created_at', 'updated_at',)
    search_fields = ('name', 'email', 'mobile', 'address')
    list_filter = ('created_at', 'updated_at')

admin.site.register(Customer, CustomerAdmin)


class PaymentDetailsAdmin(admin.ModelAdmin):
    list_display = ('payment_for', 'transaction_id','amount', 'status', 'created_at', 'updated_at')
    list_filter = ('payment_for', 'status', 'created_at',)
    search_fields = ('payment_for','transaction_id')
    date_hierarchy = 'created_at'

admin.site.register(PaymentDetails, PaymentDetailsAdmin)


