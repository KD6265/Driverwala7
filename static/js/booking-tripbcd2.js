$(document).on("click", "#for_business_user_sub", function() {
	var id = $(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'master/forbusinessuse',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	window.location.href = path+"business";
        }
    });
});

$(document).on("click", "#city_packages", function() {
	var id = $(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'master/citynameforpackage',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	window.location.href = path+"packages";
        }
    });
});

$(document).on("click", "#package_id_session", function() {
	var id = $(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'master/packagesession',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	window.location.href = path+"details";
        }
    });
});

$(document).on('click','#back_1',function()
{
	$("#progressbar li").removeClass('active');
	$("#li_1").addClass('active');
	$("#step_2").hide();
	$("#step_1").show();
});

$(document).on('click','.car_li li',function()
{
	$(".car_li li").removeClass('car_li_active');
	$(this).addClass('car_li_active');
	$("#v_name").val($(this).attr('fdi'));
});


$(document).on('click','#back_2',function()
{
	$("#progressbar li").removeClass('active');
	$("#li_2").addClass('active');
	$("#step_3").hide();
	$("#step_2").show();
});

$(document).on('click','#trip-btn a',function()
{
	$("#trip-btn a").removeClass('btn-dark');
	$(this).addClass('btn-dark');
	$("#text-trip").text($(this).text());
	if($(this).attr('fdi') == 'oneway')
	{
		$("#pickup_location_div").removeClass('col-md-12').addClass('col-md-6');
		$("#drop_location_div").show();
		$("#start_date_div").removeClass('col-md-3').addClass('col-md-6');
		$("#start_date_div_t").removeClass('col-md-3').addClass('col-md-6');
		$("#end_date_div").hide();
		$("#end_date_div_t").hide();
	}
	else
	{
		$("#pickup_location_div").removeClass('col-md-6').addClass('col-md-12');
		$("#drop_location_div").hide();
		$("#start_date_div").removeClass('col-md-6').addClass('col-md-3');
		$("#start_date_div_t").removeClass('col-md-6').addClass('col-md-3');
		$("#end_date_div").show();
		$("#end_date_div_t").show();
	}
});

$(document).on('click','#car_type a',function()
{
	$("#car_type a").removeClass('btn-dark');
	$(this).addClass('btn-dark');
});

$(document).on('click','#next_to_date',function()
{
	var trip = $("#trip-btn a.btn-dark").attr('fdi');
	if(trip == 'oneway' && $("#pickup_point").val() == '')
	{
		$("#pick_up_forntinput input").focus();
		toastr.warning("Opps!", "Please enter pickup point.");
		return false;
	}
	if(trip == 'oneway' && $("#drop_point").val() == '')
	{
		$("#dropp_off_forntinput input").focus();
		toastr.warning("Opps!", "Please enter drop point.");
		return false;
	}

	if(trip == 'round-trip' && $("#pickup_point").val() == '')
	{
		$("#pick_up_forntinput input").focus();
		return false;
	}
	$("#progressbar li").removeClass('active');
	$("#li_2").addClass('active');
	$("#step_1").hide();
	$("#step_2").show();
});

$(document).on('change','#pickup_date_temp',function()
{
	var pickup_date = $(this).val();	
	$.post(path+"master/Getnextdaytime",
  	{
   		date: pickup_date
  	},
  	function(data, status){
  		var json = JSON.parse(data);
    	$("#start_date_div_t").html(json.pictime);
    	$("#end_date_div").html(json.dropdate);
  	});	
    
});
$("#schedule_time").on("change", function() {
	
	var pic_time = $(this).val();
	console.log("pic_time", pic_time);
 });
 
$(document).on('change','#drop_date_temp',function()
{
	var pickup_date = $(this).val();	
	$.post(path+"master/Getnextdaytime2",
  	{
   		date: pickup_date
  	},
  	function(data, status){
  		var json = JSON.parse(data);
    	$("#end_date_div_t").html(json.pictime);
  	});	
    
});


$(document).on('click','#next_to_confirmation',function()
{		
	$("#night_charge").val('0');
	var trip = $("#trip-btn a.btn-dark").attr('fdi');
	var trip_text = $("#trip-btn a.btn-dark").attr('text');
	var car_type = $("#car_type a.btn-dark").attr('fdi');
	var vname = $("#v_name").val();	
	var pickup_point = $("#pickup_point").val();
	var drop_point = $("#drop_point").val();

	var pickup_date_temp = $("#pickup_date_temp").val();
	var pic_time = $("#schedule_time").val();

	var drop_date_temp = $("#drop_date_temp").val();
	var drop_time = $("#drop_time").val();

	$("#pickup_date").val(pickup_date_temp+' '+pic_time);
	$("#drop_date").val(drop_date_temp+' '+drop_time);
	
	var pickup_date = $("#pickup_date").val();
	var drop_date = $("#drop_date").val();

	
	if(vname == '')
	{
		toastr.warning("Please select vehicle.", "Opps!");
		return false;
	}
	if(pickup_date_temp == '')
	{
		$("#pickup_date_temp").focus();
		toastr.warning("Please select pick up date.", "Opps");
		return false;
	}
	if(pic_time == '')
	{
		$("#pickup_date_temp").focus();
		toastr.warning("Please select pick up date.", "Opps");
		return false;
	}	
	if(trip == 'round-trip' && drop_date_temp == '')
	{
		$("#drop_date_temp").focus();
		toastr.warning("Please select drop date.", "Opps");
		return false;
	} 
	if(trip == 'round-trip' && drop_time == '')
	{
		$("#drop_date_temp").focus();
		toastr.warning("Please select drop date and time.", "Opps");
		return false;
	}	

	if(trip == 'round-trip')
	{
		$.ajax({
		    type: 'POST',
		    url: path + 'Master/Getnights',
		    data: {"pickup_date":pickup_date,"drop_date":drop_date},
		    beforeSend: function () {
		    	
		    },
		    success: function (responce) {
		    	$("#total_night").val(responce);
		    	final_calculation();
		    }
		});
	}
	else
	{
		final_calculation();
	}
	
	
});


function timeToadd(datetime,cp_time)
{
	var currentDate = new Date(datetime);
    var time = currentDate.getTime(); // Original Time
    var timeToadd = cp_time;  // Time to be added in min
    var timeToAddArr = timeToadd.split(":");             
    var ms = (60 * 60 * parseInt(timeToAddArr[0]) + 60 * (parseInt(timeToAddArr[1])) ) * 1000;
  	
    var newTime =new Date((parseInt(time) + parseInt(ms)) );
    var hours = newTime.getHours();
    var minute = newTime.getMinutes();

    hours = (hours < 10 ? '0'+hours : hours);
    minute = (minute < 10 ? '0'+minute : minute);

	var _time = hours+':'+minute;
    return _time
}

function convertMonth(date)
{
	var date = date.split("-");
	var months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
	for(var j=0;j<months.length;j++){
	    if(date[1]==months[j]){
	         date[1]=months.indexOf(months[j])+1;
	     }                      
	} 
	if(date[1]<10){
	    date[1]='0'+date[1];
	}                        
	return formattedDate = date[1]+'/'+date[0]+'/'+date[2];
}

function daysdifference(firstDate, secondDate){
	var d1 = firstDate.split(" ");
	var d11 = d1[0].split("-");
	var d2 = secondDate.split(" ");
	var d22 = d2[0].split("-");

	var date1 = d11[0]+' '+d11[1]+' '+d11[2];
	var date2 = d22[0]+' '+d22[1]+' '+d22[2];
	
    var startDay = new Date(date1);
    var endDay = new Date(date2);
   
    var millisBetween = startDay.getTime() - endDay.getTime();
    var days = millisBetween / (1000 * 3600 * 24);
   
    return Math.round(Math.abs(days));
}

$(document).on('click','#check_promo',function(){	
	$("#recent_click").val('check_promo');
	var promocode = $("#promocode").val().trim();
	var trip = $("#trip-btn a.btn-dark").attr('fdi');
	var paymode = $("#payment-btn a.active").attr('fdi');
	var es_amount = $("#estimate_amount_val").val();
	if(promocode == '')
	{
		$("#promocode").focus().css('border-color','red');
		return false;
	}
	$.ajax({
	        type: 'POST',
	        url: path + 'Master/CheckPromoCode',
	        data: {"promocode":promocode,"trip":trip,"paymode":paymode,"es_amount":es_amount},
	        beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	var parsed = JSON.parse(responce);
	        	var promo_am=0;
	        	if(parsed.status=='LoginRequired')
	        	{
	            	$("#loginform").modal('show');
	          	}
	            else if(parsed.status == 'success')
	            {
	            	$("#check_promo").html('Coupon applied');	   
	            	$("#ap_code_final").val(parsed.promocode);
	          		$("#online_cuppon").show();          		
	          		var paymentmode = $("#payment-btn a.active").attr('fdi');
	          		
	          		if(parsed.type == 'fix' || parsed.type == 'FIX')
	          		{
	          			promo_am = parsed.amount;
	          		} 
	          		else
	          		{
	          			var ect_am = $("#estimate_amount_val").val();
	          			promo_am = parseInt(ect_am*parsed.amount/100);
	          			console.log(ect_am); 
	          		}  

	          		$("#promo_amount").val(promo_am);
	          		toastr.success("", "The "+parsed.promocode+" promotion code has been applied and redeemed successfully.");
	          		final_calculation();
	            }
	          	else
	          	{
	          		$("#check_promo").html('Apply coupon');
	          		toastr.warning("", "Invalid promotion code");
	            	$("#promo_amount").val(0);
          			final_calculation();
	          	}
	        }
	    });
});


$(document).on('click','#final_book',function(){
	
	$("#recent_click").val('final_book');
	$(this).html('Please wait...').prop('disabled', true);	
	var ride_type = $("#trip-btn a.btn-dark").attr('fdi');
	//var ride_for = $("input[name='ride_for']:checked").val();
	var ride_for ='';
	var pickuploadtion = $("#pickup_point").val();
	var drop_location = $("#drop_point").val();
	var vehicle_type = $("#car_type a.btn-dark").attr('fdi');
	var vehicle_sub_type = $("#v_name").val();

	var pickup_date = $("#pickup_date").val();
	
	var drop_date = $("#drop_date").val();

	var paymentmode = $("#payment-btn a.active").attr('fdi');
	
	var duration=$("#duration").val();	
	
	var amount = $("#estimate_amount_val").val();

	var billing_phone = $("#billing_phone").val();
	var billing_name = $("#billing_name").val();
	var billing_email = $("#billing_email").val();
	var cityid = $("#cityid").val();

	var discount_amount = $("#discount_amount").val();
	var promo_amount = $("#promo_amount").val();
	var payble_amount = $("#payble_amount").val();
	var ap_code_final = $("#ap_code_final").val();
	$("#eroor_booking").html('');
	$.ajax({
	        type: 'POST',
	        url: path + 'Master/BookingNew',
	        data: {"ride_type":ride_type,"ride_for":ride_for,"pickuploadtion":pickuploadtion,"drop_location":drop_location,"vehicle_type":vehicle_type,"vehicle_sub_type":vehicle_sub_type,"pickup_date":pickup_date,"drop_date":drop_date,"paymentmode":paymentmode,"cityid":cityid,"amount":amount,"duration":duration,"discount_amount":discount_amount,"promo_amount":promo_amount,"payble_amount":payble_amount,"ap_code_final":ap_code_final},
	        beforeSend: function () {
	        	
	        },
	        success: function (responce) {

	        	var json = JSON.parse(responce);
	        	//console.log(responce);
	        	if(json.status=='LoginRequired')
	        	{
	        		$("#final_book").html('Loading...').prop('disabled', false);
	            	$("#loginform").modal('show');
	            	$("#final_book").html('Loading...');
	            	//window.location.href = path+"login";
	            }
	            else if(json.status=='success')
	            {
	            	
	            	if(json.payment_mode == 'online')
	            	{
	            			$("#orderId").val(json.orderId);
	            			$("#orderAmount").val(json.payble_amount);	            			
	            			setTimeout(function(){ $("#cashfree_form_booking").submit(); }, 500);
	            			$("#final_book").html('Book Drive');
	            	}
	            	else
	            	{
	            		$("#new_book_id").html('BOOKING ID : '+json.booking_id);
	            		$("#booking_btn").hide();
	            		$("#booking_conf").show();
	            		$("#final_book").html('Book Drive');
	            		socket.emit('PassBooking', json);
	            		socket.emit('admin_notification', json);
	            		setTimeout(function(){ window.location.href = path+"dashboard/booking"; }, 1000);
	            	}
	            	
	            }
	        }
	    });	
});

$(document).on('click','#food-btn a',function(){
	$("#food-btn a").removeClass('active');
	$(this).addClass('active');
	final_calculation();
});

$(document).on('click','#payment-btn a',function(){
	$("#payment-btn a").removeClass('active');
	$(this).addClass('active');
	
	var esam = $("#estimate_amount_val").val();
	var discount_amount = $("#discount_amount").val();
	var promo_amount = $("#promo_amount").val();
	

	if($(this).attr('fdi') == 'online')
	{
		$("#online_discount").show();
		var es_amount = $("#estimate_amount_val").val();
		var discount = parseInt(es_amount*5/100);
		$("#discount_amount").val(discount);
		$("#notic").html('');
		final_calculation();
	}
	else
	{
		$("#online_discount").show();
		var es_amount = $("#estimate_amount_val").val();
		var discount = 0;
		$("#discount_amount").val(discount);
		$("#notic").html('Pay online and get 5% instant discount');
		final_calculation();
	}

	if($("#promocode").val() != '')
	{
		$("#check_promo").trigger('click');
	}
});

$(document).on('click','#change_sent_to',function(){
	$("#otp_box").hide();
	$("#final_signin_btn_box").hide();
	$("#mobile_box").show();
	$("#signin_btn_box").show();
});

$(document).on('click','#Sign-in',function(){	
	var phone = $("#phone_cp").val();

	$.ajax({
        type: 'POST',
        url: path + 'Master/Loginbooking',
        data: {"phone":phone},
        beforeSend: function () {
        	
        },
        success: function (responce) {
            var json = JSON.parse(responce);
            $("#signin_btn_box").hide();
            if(json.status == 'Login')
            {
            	$("#your_name").val(json.fname);
            	$("#mobile_box").hide();
            	$("#otp_box").show();
            	$("#final_signin_btn_box").show();
            	$("#sent_to").text(json.phone);
            	timer(60);
            	//phoneAuth(json.phone);
            }
            else
            {
            	$("#mobile_box").hide();
            	$("#name_box").show();
            	$("#otp_box").show();
            	$("#final_signin_btn_box").show();
            	timer(60);
            	//phoneAuth(json.phone);
            }
        }
    });
});



let timerOn = true;
function timer(remaining) {
  var m = Math.floor(remaining / 60);
  var s = remaining % 60;
  
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  document.getElementById('timer').innerHTML = m + ':' + s;
  remaining -= 1;
  
  if(remaining >= 0 && timerOn) {
    setTimeout(function() {
        timer(remaining);
    }, 1000);
    return;
  }

  if(!timerOn) {
    // Do validate stuff here
    return;
  }
  
  // Do timeout stuff here
  $('#timer').html('<a href="javascript:void(0);" id="resend_otp">Resend</a>')
}

function codeverify() {

	var phone = $("#phone_cp").val();
	var your_name = $("#your_name").val();
	var otp = $("#verificationCode").val();
	$("#your_name,#verificationCode").css('border-color','');
	$this = $(this);
	if(your_name == '')
	{
		$("#your_name").focus().css('border-color','red');
		return false;
	}
	else if(otp == '')
	{
		$("#verificationCode").focus().css('border-color','red');
		return false;
	}
	else
	{
		$(this).html('Authentication...').prop('disabled',true);
		var refer_code= '';
		$.ajax({
		    type: 'POST',
		    url: path + 'Master/SingUp',
		    data: {"mobile":phone,"name":your_name,"verificationCode":otp,"refer_code":refer_code},
		      beforeSend: function () {
		          
		    },
		    success: function (responce) {
		        var json = JSON.parse(responce); 
		        
		        if(json.status == 'success')
		        {
		        	$this.html('Login success').prop('disabled',false);
		          	$("#customerName").val(json.name);
		          	$("#customerEmail").val(json.email);
		          	$("#customerPhone").val(json.phone);
		          	$("#loginform").modal('hide');	
		          	toastr.success("Success", "You Have Successfully Logged in to Drivars.");	
		          	var click = $("#recent_click").val();
		          	$("#final_book").html('Loading...').prop('disabled', false);
		          	setTimeout(function(){ $("#"+click).trigger('click');}, 1000);		          	        
		        }  
		        else
		        {
		        	$this.html('Login Failed').prop('disabled',false);
		        }       
			       
		    }
		});
	}    
}

function final_calculation()
{	
	$("#online_cuppon").hide();
	$("#food_tr").hide();
	$("#tr_3").hide();
	$("#tr_7").hide();
	$("#discount_amount").val('0');
	var trip = $("#trip-btn a.btn-dark").attr('fdi');
	var paymode = $("#payment-btn a.active").attr('fdi');
	var food = $("#food-btn a.active").attr('fdi');
	var km = parseInt($("#total_km").val());
	var pickup_date = $("#pickup_date").val();
	var drop_date = $("#drop_date").val();
	var promo_amount = parseInt($("#promo_amount").val());
	var discount_amount = parseInt($("#discount_amount").val());

	var trip_text = $("#trip-btn a.btn-dark").attr('text');
	var pickup_point = $("#pickup_point").val();
	var drop_point = $("#drop_point").val();
	var car_type = $("#car_type a.btn-dark").attr('fdi');
	var vname = $("#v_name").val();
	var food_charge_total = 0;
	if(trip == 'oneway')
	{
		$("#tr_3").show();
		$("#accommodation_div").hide();
		if(km >= 150)
		{
			if(km >= 500 && km <= 1500)	
            {
                var es_amount = parseInt(km)*parseInt(per_km_price-1);
            }	
            else if(km >= 1500) 
            {
                var es_amount = parseInt(km)*parseInt(per_km_price-1.5);
            }	
            else
            {
               var es_amount = parseInt(km*per_km_price);
            }
            es_amount = parseInt(es_amount)+parseInt(base_price);
		}
		else
		{
			var km_price = parseInt(per_km_price)+1.5;			
			var es_amount = parseInt(km*km_price)+parseInt(base_price)-parseInt(promo_amount);
		}
		
	}
	else
	{
		var days = daysdifference(pickup_date, drop_date).toFixed();
		var hours =Calculate_hours(pickup_date, drop_date).toFixed();	
		var total_night = $("#total_night").val();
		var night_charge_cal = parseInt(total_night)*night_charge;
		$("#tr_7").show();
		$("#accommodation_div").show();
		$("#duration").val(hours);
		
		var per_hr_p = per_hr_price;
			
		// if (hours >= 4 && hours <= 12)
		// {				
		// 	per_hr_p = parseInt(per_hr_price-7);
		// }
		if (hours >= 12 && hours <= 24)
		{
			per_hr_p = parseInt(per_hr_price-10);
		}
		if (hours > 24)
		{
			per_hr_p = parseInt(per_hr_price-20);
		}	
		if(food == 'no')
		{
			food_charge_total = parseInt(food_charge*days);
			
			es_amount = parseInt(per_hr_p*hours)+parseInt(round_base)+night_charge_cal;
			$("#food_tr").show();				
			$("#food_td").html('₹ '+food_charge_total);						
		}	
		else
		{
			es_amount = parseInt(per_hr_p*hours)+parseInt(round_base)+night_charge_cal;
		}			
	}
	
	$("#discount_amount").val('0');
	$("#notic").html('Pay online and get 5% instant discount');
	if(paymode == 'online')
	{
		var discount_amount = parseInt(es_amount*5/100);
		$("#discount_amount").val(discount_amount);
		$("#notic").html('');
	}

	if(promo_amount > 0)
	{
		$("#online_cuppon").show();
		$("#online_cuppon_price").html('₹ '+promo_amount.toFixed(2));
	}
	
		var pay = parseInt(es_amount)+parseInt(food_charge_total)-parseInt(discount_amount)-parseInt(promo_amount);
		$("#estimate_amount_val").val(es_amount);
	  	$("#estimate_amount").html('₹ '+es_amount.toFixed(2));
  		$("#payble_amount").val(pay.toFixed(2));
  		$("#online_discount_price").html('₹ '+discount_amount.toFixed(2));
  		$("#food_charge").val(food_charge_total);  	
  		$("#total").html('₹ '+pay.toFixed(2));	

  	$("#td_1").html(trip_text);
		$("#td_2").text(pickup_point);
		$("#td_3").text(drop_point);
		$("#td_4").text(car_type);
		$("#td_5").text(vname);
		$("#td_6").text(pickup_date);
		$("#td_7").text(drop_date);
		
		$("#progressbar li").removeClass('active');
		$("#li_3").addClass('active');
		$("#step_2").hide();
		$("#step_3").show();
}



function Calculate_hours(d1,d2)
{
	// example
	var date1 = new Date(d1); // Thu Sep 16 2010 13:30:58
	var date2 = new Date(d2); // Tue Aug 18 2015 14:20:48

	// checking with date is more recent to get the other out of it and store the result in dateDifference variable
	var dateDifference;
	dateDifference = date2 - date1;
	return hours22 = (dateDifference / (1000 * 60 * 60));
	
}


$(document).on('click','#view_offer',function(){
	$("#offer_model").modal('show');
});

$(document).on('click','#apply_offer',function(){
	var couponcode = $(this).attr('couponcode');
	$("#promocode").val(couponcode);
	$("#offer_model").modal('hide');
	$("#check_promo").trigger('click').html('Coupon applied');
});

$(document).on('keyup','#promocode',function(){
	setTimeout(function(){
        $("#check_promo").trigger('click');
   }, 2000);
});
