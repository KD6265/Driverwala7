from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.http import JsonResponse
from .models import District, Subdistrict,State,Driver,DriverType,Plan,Customer,PaymentDetails
from django.conf import settings
from django.contrib.auth.hashers import make_password
from .forms import ContactUsForm,CustomerRegistrationForm
from django.shortcuts import render
from django.core.mail import send_mail
from .models import ContactUS
# Create your views here.
def index(request):
    #  return render(request,"customer/dashboard.html")
     return render(request,"index.html")
def city(request):
    states = State.objects.all()
    context = {'states': states}
    return render(request,"city.html",context)
def driverinahmedabad(request):
     return render(request,"driverinahmedabad.html")

def driverinbengaluru(request):
     return render(request,"driverinbengaluru.html")

def about(request):
    return render(request,'about.html')
# def blog(request):f
#     return render(request,'blog.html')

from django.shortcuts import render
from django.utils import timezone
from django.db.models import Q
from django.core.paginator import Paginator
from .models import BlogPost

def blog(request):
    # get all blog posts ordered by date posted
    blog_posts = BlogPost.objects.all()
    recent_posts = BlogPost.objects.order_by('-date_posted')[:5]
    # handle search query
    query = request.GET.get('q')
    if query:
        blog_posts = blog_posts.filter(
            Q(title__icontains=query) | Q(content__icontains=query)
        ).distinct()    
        
    # handle date filter
    date_filter = request.GET.get('date')
    if date_filter:
        blog_posts = blog_posts.filter(date_posted__year=date_filter)

    # handle pagination
    paginator = Paginator(blog_posts, 2)  # 10 posts per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        
        'recent_posts': recent_posts,
        'blog_posts': page_obj,
        'dates': BlogPost.objects.dates('date_posted', 'year', order='DESC'),
    }
    return render(request, 'blog.html', context)

def blog_detail(request, pk):
    blog_post = get_object_or_404(BlogPost, pk=pk)
    recent_posts = BlogPost.objects.order_by('-date_posted')[:5]
    context = {
        'recent_posts': recent_posts,
        'blog_post': blog_post,
    }
    return render(request, 'blog.html', context)
def business(request):
    return render(request,'business.html')
def businessaccount(request):
    return render(request,'businessaccount.html')
def captain(request):
    return render(request,'captain.html')
def chauffeur(request):
    return render(request,'chauffeur.html')
def contact(request):
    if request.method == 'POST':
        form = ContactUsForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            comments = form.cleaned_data['comments']
            
            # Save data to the model
            contact = ContactUS(name=name, email=email, subject=subject, comments=comments)
            contact.save()

            # Send email
            # send_mail(
            #     'New contact request from {}'.format(name),
            #     'Subject: {}\n\nName: {}\nEmail: {}\n\n{}'.format(subject, name, email, message),
            #     email,  # From email
            #     ['admin@example.com'],  # To email(s)
            #     fail_silently=False,
            # )
            
            # Render success page
            return render(request, 'contact_success.html')
    else:
        form = ContactUsForm()
    
    return render(request,'contact.html',{'form': form})
def driver(request):
    return render(request,'driver.html')
def driverinagra(request):
    return render(request,'driverinagra.html')
def driverinamritsar(request):
    return render(request,'driverinamritsar.html')
def driverinayodhya(request):
    return render(request,'driverinayodhya.html')
def driverinbhopal(request):
    return render(request,'driverinbhopal.html')
def driverinchandigarh(request):
    return render(request,'driverinchandigarh.html')
def driverinchennai(request):
    return render(request,'driverinchennai.html')
def driverincoimbatore(request):
    return render(request,'driverincoimbatore.html')
def driverindehradun(request):
    return render(request,'driverindehradun.html')
def driverindelhi(request):
    return render(request,'driverindelhi.html')
def driveringoa(request):
    return render(request,'driveringoa.html')
def driveringurugram(request):
    return render(request,'driveringurugram.html')
def driveringuwahati(request):
    return render(request,'driveringuwahati.html')
def driverinharidwar(request):
    return render(request,'driverinharidwar.html')
def driverinhyderabad(request):
    return render(request,'driverinhyderabad.html')
def driverinimphal(request):
    return render(request,'driverinimphal.html')
def driverinindore(request):
    return render(request,'driverinindore.html')
def driverinjaipur(request):
    return render(request,'driverinjaipur.html')
def driverinkanpur(request):
    return render(request,'driverinkanpur.html')
def driverinkochi(request):
    return render(request,'driverinkochi.html')
def driverinkolkata(request):
    return render(request,'driverinkolkata.html')
def driverinlucknow(request):
    return render(request,'driverinlucknow.html')
def driverinludhiana(request):
    return render(request,'driverinludhiana.html')
def driverinmadurai(request):
    return render(request,'driverinmadurai.html')
def driverinmumbai(request):
    return render(request,'driverinmumbai.html')
def driverinmysuru(request):
    return render(request,'driverinmysuru.html')
def driverinnagpur(request):
    return render(request,'driverinnagpur.html')
def driverinnashik(request):
    return render(request,'driverinnashik.html')
def driverinnoida(request):
    return render(request,'driverinnoida.html')
def driverinpatna(request):
    return render(request,'driverinpatna.html')
def driverinpune(request):
    return render(request,'driverinpune.html')
def driverinraipur(request):
    return render(request,'driverinraipur.html')
def driverinrajkot(request):
    return render(request,'driverinrajkot.html')
def driverinranchi(request):
    return render(request,'driverinranchi.html')
def driverinshimla(request):
    return render(request,'driverinshimla.html')
def driverinsiliguri(request):
    return render(request,'driverinsiliguri.html')
def driverinsurat(request):
    return render(request,'driverinsurat.html')
def driverinudaipur(request):
    return render(request,'driverinudaipur.html')
def driverinvadodara(request):
    return render(request,'driverinvadodara.html')
def driverinvaranasi(request):
    return render(request,'driverinvaranasi.html')
def driverinvisakhapatnam(request):
    return render(request,'driverinvisakhapatnam.html')

def about(request):
    return render(request,'about.html')
def help(request):
    return render(request,'help.html')
def home(request):
    return render(request,'home.html')
def howitworks(request):
    return render(request,'howitworks.html')
def offers(request):
    return render(request,'offers.html')
def privacy(request):
    return render(request,'privacy.html')
def refund(request):
    return render(request,'refund.html')
def services(request):
    return render(request,'services.html')
def terms(request):
    return render(request,'terms.html')
def velet(request):
    return render(request,'velet.html')
def abc(request):
    return render(request,'abc.html')

def customer_registration(request):
    if request.method == 'POST':
        form = CustomerRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # redirect to success page or login page
    else:
        form = CustomerRegistrationForm()
    return render(request, 'customer_registration.html', {'form': form})

def filter_drivers_state(request):
    state_id = request.GET.get('state_id')   
    print("1.state_id=:",state_id)
    drivers = Driver.objects.all()   
    if state_id:
        data = {}
        districts = District.objects.filter(state_id=state_id)
        drivers = drivers.filter(state_id=state_id)
        
        district_data = []
        for district in districts:
            district_data.append({
                'id': district.id,
                'name': district.name
            })
        
        driver_data = []
        for driver in drivers:
            driver_data.append({
                'id': driver.id,
            'fname': driver.fname,
            'age': driver.age,
            'state': driver.state.name,
            'district': driver.district.name,
            'subdistrict': driver.subdistrict.name,
            })
        
        data['districts'] = district_data
        data['drivers'] = driver_data
        print("sdrivers = : ", districts)
        print("data:",data)
        print("sdrivers query = : ", districts.query)
        return JsonResponse(data)
    
def filter_drivers_district(request):
    state_id = request.GET.get('state_id')   
    print("1.state_id=:",state_id)
    district_id = request.GET.get('district')
    print("2.district_id=:",district_id)
    # subdistrict_id = request.GET.get('subdistrict_id') 
    drivers = Driver.objects.all()   
    if state_id and district_id:
        data = {}
        subdistricts = Subdistrict.objects.filter(district_id=district_id)
        print("  ==33333subdistricts    :     ",subdistricts)
        drivers = drivers.filter(state_id=state_id,district_id=district_id)
        
        subdistrict_data = []
        for subdistrict in subdistricts:
            subdistrict_data.append({
                'id': subdistrict.id,
                'name': subdistrict.name
            })
        
        driver_data = []
        for driver in drivers:
            driver_data.append({
                'id': driver.id,
            'name': driver.fname,
            'age': driver.age,
            'state': driver.state.name,
            'district': driver.district.name,
            'subdistrict': driver.subdistrict.name,
            })
        
        data['subdistricts'] = subdistrict_data
        data['drivers'] = driver_data
        print("data:",data)

        print("Driver_data : ",drivers)    
        return JsonResponse(data) 
    
def filter_drivers_subdistrict(request):
    state_id = request.GET.get('state_id')   
    print("1.state_id=:",state_id)
    district_id = request.GET.get('district')
    print("2.district_id=:",district_id)
    subdistrict_id = request.GET.get('subdistrict') 
    drivers = Driver.objects.all()   
    if state_id and district_id and subdistrict_id:
        data = {}
        
        driver_types = DriverType.objects.all()
        driver_type_data = []
        for driver_type in driver_types:
            driver_type_data.append({
                'id': driver_type.id,
                'name': driver_type.name
            })
        
        drivers = drivers.filter(state_id=state_id,district_id=district_id,subdistrict_id=subdistrict_id)
        
        print("subdistrict_drivers======", drivers)
        driver_data = []
        for driver in drivers:
            driver_data.append({
                'id': driver.id,
            'fname': driver.fname,
            'age': driver.age,
            'state': driver.state.name,
            'district': driver.district.name,
            'subdistrict': driver.subdistrict.name,
            # 'drivertype': driver.drivertype.name,
            'driver_type': driver.driver_type.name,
            })
        
        data['driverTypes'] = driver_type_data
        data['drivers'] = driver_data
        print("data:",data)

        print("Driver_data : ",drivers)    
        return JsonResponse(data) 
    else:
        return JsonResponse({'error': 'Please provide all parameters'})
  
def filter_drivers_driver_type(request):
    state_id = request.GET.get('state_id')   
    print("1.state_id=:",state_id)
    district_id = request.GET.get('district')
    print("2.district_id=:",district_id)
    subdistrict_id = request.GET.get('subdistrict') 
    driver_type = request.GET.get('driver_type') 
    drivers = Driver.objects.all()   
    if state_id and district_id and subdistrict_id:
        data = {}
        drivers = drivers.filter(state_id=state_id,district_id=district_id,subdistrict_id=subdistrict_id,driver_type=driver_type)
        
        print("subdistrict_drivers======", drivers)
        driver_data = []
        for driver in drivers:
            # if driver.activate_profile:
            driver_data.append({
                'id': driver.id,
            'fname': driver.fname,
            'age': driver.age,
            'state': driver.state.name,
            'district': driver.district.name,
            'subdistrict': driver.subdistrict.name,
            # 'drivertype': driver.drivertype.name,
            'driver_type': driver.driver_type.name,
            'activate_profile': driver.activate_profile(),
            # 'is_paid': driver.is_paid(),
            # 'payment_status': driver.payment_status(),
            'is_active': driver.is_active,
            # 'plan_duration_months': driver.plan_duration_months,
            'last_paid_date': driver.last_paid_date,
            })
        
        
        data['drivers'] = driver_data
        print("data:",data)

        print("Driver_data : ",drivers)    
        return JsonResponse(data) 
    else:
        return JsonResponse({'error': 'Please provide all parameters'})
  
from django.shortcuts import render, get_object_or_404, redirect
# from django.contrib.auth.decorators import login_required
from .models import Driver
from django.urls import reverse
# from .forms import BookingForm
# @login_required

from django.core.exceptions import ValidationError
from django.contrib import messages

def booking_page(request, driver_id):
    user = request.user
    email = user.email
    print("User.email",email)
    driver = get_object_or_404(Driver, id=driver_id)
    print("Driver-------",driver)
    error_message = ''
    return render(request, 'driverinmumbai.html', {'driver': driver,'error_message': error_message})


from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import Booking_Driver_Oneway,Booking_Driver_Roundway
import razorpay


# def create_booking(request,):
    
def create_booking(request,):
    user = request.user
    userid= user.id
    print("Booking call")
    print("customer_id:",userid)
    customer=get_object_or_404(Customer, id=userid)
    print("customer:",customer)
    
    # print(driver_id);
    # retrieve data from AJAX request
    driver_id = request.GET.get('driver_id')
    print("driver_id:", driver_id)
    driver = get_object_or_404(Driver, id=driver_id)
    print("Dricer:",driver)
    
    ride_type = request.GET.get('ride_type')
    print("ride_type:",ride_type)
    ride_for = request.GET.get('ride_for')
    print("ride_for:",ride_for)
    pickup_location = request.GET.get('pickuploadtion')
    print("pickup_location:",pickup_location)
    drop_location = request.GET.get('drop_location')
    print("drop_location:",drop_location)
    vehicle_type = request.GET.get('vehicle_type')
    print("vehicle_type:",vehicle_type)
    vehicle_sub_type = request.GET.get('vehicle_sub_type')
    print("vehicle_sub_type:",vehicle_sub_type)

    pickup_date_str = request.GET.get('pickup_date')
    pickup_date_obj = datetime.strptime(pickup_date_str, '%d-%B-%Y %I:%M %p')
    pickup_date_formatted = pickup_date_obj.strftime('%Y-%m-%d %H:%M:%S')
    print("pickup_date_formatted:",pickup_date_formatted)
    
    if ride_type == "roundway":
        drop_date_str = request.GET.get('drop_date')
        drop_date_obj = datetime.strptime(drop_date_str, '%d-%B-%Y %I:%M %p')
        drop_date_formatted = drop_date_obj.strftime('%Y-%m-%d %H:%M:%S')
        print("drop_date_formatted:",drop_date_formatted)
   
    payment_mode = request.GET.get('paymentmode')
    print("payment_mode:",payment_mode)
    city_id = request.GET.get('cityid')
    print("city_id:",city_id)
    amount = request.GET.get('amount')
    print("amount:",amount)
    duration = request.GET.get('duration')
    print("duration:",duration)
    discount_amount = request.GET.get('discount_amount')
    print("discount_amount:",discount_amount)
    promo_amount = request.GET.get('promo_amount')
    print("promo_amount:",promo_amount)
    payable_amount = request.GET.get('payble_amount')
    print("payable_amount:",payable_amount)
    # ap_code_final = request.GET.get('ap_code_final')
    # print("ap_code_final:",ap_code_final)
    # create a new booking object
    
    if ride_type == "oneway":
        booking = Booking_Driver_Oneway.objects.create(
            driver=driver,
            customer=customer,
            ride_type=ride_type,
            ride_for=ride_for,
            pickup_location=pickup_location,
            drop_location=drop_location,
            vehicle_type=vehicle_type,
            vehicle_sub_type=vehicle_sub_type,
            pickup_date=pickup_date_formatted,
            payment_mode=payment_mode,
            city_id=city_id,
            amount=amount,
            duration=duration,
            discount_amount=discount_amount,
            promo_amount=promo_amount,
            payable_amount=payable_amount,
            # ap_code_final=ap_code_final
        )
    elif ride_type == "roundway":
        booking = Booking_Driver_Roundway.objects.create(
            driver=driver,
            customer=customer,

            ride_type=ride_type,
            ride_for=ride_for,
            pickup_location=pickup_location,
            vehicle_type=vehicle_type,
            vehicle_sub_type=vehicle_sub_type,
            pickup_date=pickup_date_formatted,
            drop_date=drop_date_formatted,
            payment_mode=payment_mode,
            city_id=city_id,
            amount=amount,
            duration=duration,
            discount_amount=discount_amount,
            promo_amount=promo_amount,
            payable_amount=payable_amount,
            # ap_code_final=ap_code_final
        )
    booking_id = booking.id
    print("Booking ID:", booking_id)
    return JsonResponse({'success': True, 'booking_id': booking.id})
    # return HttpResponse("login sucessfull")
    # context = {'order': order, 'booking_id': booking.id}
    # return render(request, 'payment.html', context=context)
    # return redirect(reverse('payment') + '?booking_id=' + str(booking.id))
client = razorpay.Client(auth=('rzp_test_ha09Ex7EgW9YKz','7If5LjZ7dlZYIzAFQRQqf2am'))
from django.template import RequestContext
def process_payment(request):
    
    # get form data and create Razorpay order
    booking_id = request.GET.get('booking_id')
    print("booking_id2:",booking_id)
    # booking = Booking.objects.get(id=booking_id)

    booking = get_object_or_404(Booking_Driver_Oneway, id=booking_id) or \
                    get_object_or_404(Booking_Driver_Roundway, id=booking_id)
    
    print("booking2:",booking)
    amountd = booking.amount
    print("amountd:",amountd)
    # amount = .cleaned_data['amount']
    order_amount = amountd
    order_currency = 'INR'
    order_receipt = f'order_{booking_id}'
    notes = {
        'booking_id': str(booking_id),
    }
    # order = client.order.create(
    #     {'amount': order_amount, 'currency': order_currency, 'receipt': order_receipt, 'notes': notes})
    order = client.order.create({'amount': amountd*100, 'currency': 'INR','payment_capture':'1'})
    print("oder0",order)
    context = {'order': order, 'booking_id': booking_id}
    # html = render_to_string('payment.html', context)
    # return HttpResponse(html)
    
    # return HttpResponse("login sucessfull")
    return render(request, 'payment.html', context=context)
from django.views.decorators.csrf import csrf_protect
from django.http import HttpResponse
from io import BytesIO
from reportlab.pdfgen import canvas
from django.core.mail import EmailMessage
from django.conf import settings
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import A4  
@csrf_protect
def payment_success(request):
    if request.method == 'GET':
        # get Razorpay payment ID and signature
        razorpay_payment_id = request.GET.get('razorpay_payment_id')
        razorpay_order_id = request.GET.get('razorpay_order_id')
        razorpay_signature = request.GET.get('razorpay_signature')
        
        # # verify the payment signature
        try:
            client.utility.verify_payment_signature({
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_order_id': razorpay_order_id,
                'razorpay_signature': razorpay_signature,
            })
        except razorpay.errors.SignatureVerificationError:
            messages.error(request, 'Payment signature mismatch')
            return redirect('booking:booking_form')
        
        # retrieve the booking object and update its payment status
        booking_id = request.GET.get('booking_id')
        print("booking.....",booking_id)
        
        
        
        booking = get_object_or_404(Booking_Driver_Oneway, id=booking_id) or \
                  get_object_or_404(Booking_Driver_Roundway, id=booking_id)
        print("booking type",booking.ride_type)
        booking_ride_type= booking.ride_type
        if booking_ride_type == "oneway":
            payment = PaymentDetails.objects.create(
            payment_for=booking.ride_type,
            booking_oneway=booking,
            driver=booking.driver,
            amount=booking.payable_amount,
            transaction_id=razorpay_payment_id,
            status='Success'
        )
         
        booking.is_paid = True
        booking.save()
        
        booking = Booking_Driver_Oneway.objects.get(id=booking_id)

    # Create a file-like buffer to receive PDF data
        buffer = BytesIO()

    # Create the PDF object, using the buffer as its "file."
        p = canvas.Canvas(buffer)

        # Write the PDF here using the Booking_Driver_Oneway object's fields
        # logo = "C:\Users\HP\OneDrive\Desktop\New folder (2)\drivarwala (2)\drivarwala (4)\drivarwala (2)\drivarwala\static\logo\20230422_214621_0001.png"
        logo = "C:/Users/HP/OneDrive/Desktop/New folder (2)/drivarwala (2)/drivarwala (4)/drivarwala (2)/drivarwala/static/logo/20230422_214621_0001.png"

        p.drawImage(logo, A4[0]/2 -40*mm, A4[1]-40*mm, width=100*mm, height=40*mm)
        p.drawString(100, 750, f"Driver: {booking.driver}")
        p.drawString(100, 740, f"Customer: {booking.customer}")
        p.drawString(100, 650, f"ride type: {booking.ride_type}")
        p.drawString(100, 500, f"Ride For: {booking.ride_for}")
        p.drawString(100, 550, f"Pickup Location: {booking.pickup_location}")
        p.drawString(100, 400, f"vehical Type: {booking.vehicle_type}")
        p.drawString(100, 450, f"vehical Sub type: {booking.vehicle_sub_type}")
        p.drawString(100, 340, f"Pickup date: {booking.pickup_date}")
        # p.drawString(100, 700, f"Drop Date: {booking.drop_date}")
        p.drawString(100, 700, f"Payment Mode: {booking.payment_mode}")
        # p.drawString(100, 700, f"Customer: {booking.drop_date}")
        p.drawString(100, 700, f"Payble amount: {booking.payable_amount}")
        # Add more fields as needed

        # Close the PDF object cleanly, and we're done.
        p.showPage()
        p.save()

        # File response
        pdf = buffer.getvalue()
        buffer.close()

        # Create an EmailMessage object with the PDF as an attachment
        email = EmailMessage(
            'Booking Confirmation',
            'Please find attached your booking confirmation',
            settings.EMAIL_HOST_USER,
            [booking.customer.email, booking.driver.email],
        )
        email.attach(f'booking_confirmation_{booking_id}.pdf', pdf, 'application/pdf')

        # Send the email
        email.send()

        
        # redirect to a success page
        # messages.success(request, 'Payment successful')
        return render(request,"booking_detail.html",{'booking_id':booking_id,'booking':booking})
        # return redirect(reverse('booking:booking_detail', args=[booking_id]))
    else:
        messages.error(request, 'Invalid request')
        return redirect('booking:booking_form')

    
    # redirect to success page or return success JSON response
    # return  render(request,"customer/dashboard.html")
   
    # return render(request, 'booking.html')

# from .models import Booking

def booking_detail(request, booking_id):
    print("final bookingid",booking_id)
    booking = get_object_or_404(booking, id=booking_id)
    return render(request, 'booking_detail.html', {'booking': booking})
from datetime import datetime, timedelta

def get_next_day_time(request):
    print("get_next_day_time called")

    print("get next day come")
    pickup_date_str = request.GET.get('date')
    pickup_date = datetime.strptime(pickup_date_str, '%d-%B-%Y')
    next_day_date = pickup_date + timedelta(days=1)
    next_day_time = datetime(next_day_date.year, next_day_date.month, next_day_date.day, hour=8, minute=0, second=0)
    drop_date = next_day_date + timedelta(days=1)
    
    response_data = {
        'pictime': next_day_time.strftime('%d-%B-%Y %I:%M %p'),
        'dropdate': drop_date.strftime('%d-%B-%Y')
    }
    return JsonResponse(response_data)

def calculate_nights(request):
    pickup_date = datetime.strptime(request.GET.get('pickup_date'), '%Y-%m-%d')
    drop_date = datetime.strptime(request.GET.get('drop_date'), '%Y-%m-%d')
    night_count = (drop_date - pickup_date).days
    print("Nights: ",night_count)
    return JsonResponse({'nights': night_count})


# +++++++++++++++++++++++++++++++generate drivers+++++++++++++++++++++++++++++
import os
import random
import string
from .forms import DriverCreateForm
from faker import Faker

fake = Faker()

def generate_password(length=8):
    """Generate a random alphanumeric password"""
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for _ in range(length))
def generate_unique_email():
    email = fake.email()
    while Driver.objects.filter(email=email).exists():
        email = fake.email()
    return email
def generate_drivers(request):
    if request.method == 'POST':
        form = DriverCreateForm(request.POST)
        if form.is_valid():
            num_drivers = form.cleaned_data['num_drivers']
            states = State.objects.all()
            drivers = []
            for i in range(num_drivers):
                state = random.choice(states)
                districts = District.objects.filter(state=state)
                district = random.choice(districts)
                subdistricts = Subdistrict.objects.filter(district=district)
                subdistrict = random.choice(subdistricts)
                driving_licence_path = os.path.join(settings.MEDIA_ROOT, 'drvlic', random.choice(os.listdir(os.path.join(settings.BASE_DIR, 'drvlic'))))
                selfie_path = os.path.join(settings.MEDIA_ROOT, 'self', random.choice(os.listdir(os.path.join(settings.BASE_DIR, 'self'))))
                password = generate_password()
                driver = Driver(
                    fname=fake.first_name(),
                    mname=fake.first_name(),
                    lname=fake.last_name(),
                    
                    age=random.randint(18, 60),
                    phone=random.randint(1000000000, 9999999999),
                    email=generate_unique_email(),
                    address=fake.address(),
                    # city=f'City {random.randint(1, 10)}',
                    zipcode=random.randint(100000, 999999),
                    aadharno=random.randint(100000000000, 999999999999),
                    vytpe=random.choice(['Manual', 'Automatic', 'Both']),
                    driver_type=random.choice(DriverType.objects.all()),
                    driving_licence=driving_licence_path,
                    selfie=selfie_path,
                    password=make_password(password),
                    cpassword=password,
                    plan=random.choice(Plan.objects.all()),
                    last_paid_date=fake.date_time_between(start_date='-30d', end_date='now'),
                    created_at=fake.date_time_this_year(),
                    last_login=fake.date_time_this_month(),
                    is_active=True,
                    is_staff=False,
                    approved=True,
                    state=state,
                    district=district,
                    subdistrict=subdistrict
                )
                driver.save()
                drivers.append(driver)
            return render(request, 'generate_drivers.html', {'form': form, 'drivers': drivers})
    else:
        form = DriverCreateForm()
    return render(request, 'generate_drivers.html', {'form': form})
# ++++++++++++++++++++++++++++++++++Driver Detail------------------------------------------------
from django.shortcuts import render, get_object_or_404
from .models import Driver

def driver_details(request, driver_id):
    driver = get_object_or_404(Driver, id=driver_id)
    return render(request, 'driver_detail.html', {'driver': driver})

# ________________________  For Driver________________________________
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect,get_object_or_404
from .forms import DriverForm,ResetPasswordForm,ProfileUpdateForm
from .models import DriverSignUP,Driver
import uuid
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.hashers import make_password,check_password
from django.contrib import messages
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

def drivewithus(request):
    if request.method == 'POST':        
        form = DriverForm(request.POST,request.FILES)
        if form.is_valid():
            password = form.cleaned_data.get('password')
            cpassword = form.cleaned_data.get('cpassword')
            if password != cpassword:
                messages.error(request, 'Passwords do not match.')
                return render(request, "drivewithus.html",{'form':DriverForm})
            # from.password = make_password(request.POST['password'])
            form.save() 
            return  redirect('drivewithus')   
    return render(request, "drivewithus.html",{'form':DriverForm})

def login_view(request):
    if request.method == 'POST':
        user_type = request.POST.get('user_type')
        email = request.POST['email']
        password = request.POST['password']        
        if user_type == 'driver':
            driver = Driver.objects.get(email=email)
            
            print(email,password,driver)
            if driver is not None and check_password(password,driver.password):
                user = authenticate(request, email=email, password=password)
                if user is not None:
                    login(request, user)    
                    # messages.add_message(request, messages.WARNING, 'This is a warning message')
                    messages.success(request, "Logged in Successfully! ")
                    # Redirect to a success page.
                    # return HttpResponse("login sucessfull")
                    # return render(request,'business/Profile.html')
                    return render(request,'profile/profile.html', {'user': user})
                else:
                    # messages.add_message(request, messages.WARNING, 'This is a warning message')
                    messages.error(request, "Invalid Userrname or Password")
                    # Return an 'invalid login' error message.
                    return render(request,"authentication/login.html", {'error_message': 'Invalid login'})
            else:
                # driver does not exist or password is incorrect
                # messages.add_message(request, messages.WARNING, 'This is a warning message')
                messages.error(request, 'Invalid username or password.')
                return render(request,"authentication/login.html", {'error_message': 'Invalid login'})
        elif user_type == 'customer':
            customer = Customer.objects.get(email=email)
            print(email,password,customer.password)
            if customer:
                user = authenticate(request, email=email, password=password)
                print("Customer:",user)
                if user is not None:
                    login(request, user)
                    # messages.success(request, "Logged in Successfully! ")
                    # Redirect to a success page.
                    # return HttpResponse("Customer login sucessfull")
                    # return render(request,'business/Profile.html')
                    # messages.add_message(request, messages.WARNING, 'This is a warning message')
                    return render(request,'customer/dashboard.html', {'user': user})
                else:
                    # messages.add_message(request, messages.WARNING, 'This is a warning message')
                    messages.error(request, "Invalid Userrname or Password")
                    # Return an 'invalid login' error message.
                    return render(request,"authentication/login.html", {'error_message': 'Invalid login'})
            else:
                # driver does not exist or password is incorrect
                # messages.add_message(request, messages.WARNING, 'This is a warning message')
                messages.error(request, 'Invalid username or password.')
                return render(request,"authentication/login.html", {'error_message': 'Invalid login'})
    return render(request, 'login.html',)
    # return render(request, 'login.html',)

def driverlogout(request):
    logout(request)
    return redirect('login_view')

def forget_password(request):
    if request.method == 'POST':
        def send_forget_password_email(driver, token):
            forget_password_link = request.build_absolute_uri(reverse('reset_password', args=[token]))
            # message = render_to_string('forget_password_email.html', {'driver': driver, 'forget_password_link': forget_password_link})
            message = render_to_string('forget_password_email.html', {'driver': driver, 'forget_password_link': forget_password_link})
            send_mail(
                'Reset your password',
                message,
                settings.DEFAULT_FROM_EMAIL,
                [driver.email],
                fail_silently=False,
            )
            
            # Define a plain text version of the email
            text_content = f"Reset your password at {forget_password_link}"

            # Create the email message
            subject = "Reset your password"
            from_email =settings.DEFAULT_FROM_EMAIL
            to_email = driver.email
            email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
            email.attach_alternative(message, "text/html")

            # Send the email
            email.send()
        def generate_unique_token():
            return str(uuid.uuid4())
        # functions for sends 
        # Handle form submission
        email = request.POST.get('email')
        # Check if email exists in Driver model
        driver = Driver.objects.filter(email=email).first()
        if driver:
            # Send forget password email to driver's email
            # Generate a unique token to be used in the email link
            token = generate_unique_token()
            # Save the token in the database for the driver
            driver.forget_password_token = token
            driver.save()
            # Send email with the link to reset password
            send_forget_password_email(driver, token)
            return render(request, 'forget_password_sent.html')
        else:
        # Display forget password form
            return render(request, 'forget_password.html')
    else:
        # Display forget password form
        return render(request, 'forget_password.html')

def reset_password(request, token):
    driver = get_object_or_404(Driver, forget_password_token=token)
    if request.method == 'POST':
        form = ResetPasswordForm(user=driver, data=request.POST)
        if form.is_valid():
            password = form.cleaned_data.get('password')
            driver.password = make_password(password)
            driver.forget_password_token = None
            driver.save()
            messages.success(request, 'Your password has been reset. You can now login with your new password.')
            return redirect('driverLogin')
    else:
        form = ResetPasswordForm(user=driver)
    return render(request, 'reset_password.html', {'form': form})
    # return render(request, 'reset_password.html', {'form': form})

@login_required            
def profile(request):
    user = request.user
    email = user.email
    return render(request, 'profile.html', {'user': user})

@login_required
def profile_edit(request):
    # return HttpResponse("Profile Edit")
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, instance=request.user.profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')
    else:
        form = ProfileUpdateForm(instance=request.user.profile)
    return render(request, 'profiles/profile_edit.html', {'form': form})



    


