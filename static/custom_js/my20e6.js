$(document).on('click','#pic_time',function(){
	$("#time_picker_div").modal('show');
});

$(document).on('click','#time_picker_div_close',function(){
	$("#time_picker_div").modal('hide');
});

$(document).on('click','.hours_box a',function(){
	$(".hours_box a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.minutes_box a',function(){
	$(".minutes_box a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.AMPM_box a',function(){
	$(".AMPM_box a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','#save_time_pick_input',function(){
	var time_hours = $("input[name='time_hours']:checked").val();
	var time_minutes = $("input[name='time_minutes']:checked").val();
	var time_formate = $("input[name='time_formate']:checked").val();
	if(time_hours == undefined || time_minutes == undefined || time_formate == undefined)
	{		
		return false;
	}
	else
	{
		var time = time_hours+':'+time_minutes+' '+time_formate;
		$("#pic_time").val(time);
		$("#time_picker_div").modal('hide');
	}
});

$(document).on('keyup','#search_city',function(){
	var city = $(this).val().trim();
	var search_for = $(this).attr('fdi');
	$.ajax({
	        type: 'POST',
	        url: path + 'Master/SearchCity',
	        data: {"city":city,"search_for":search_for},
	        beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	$("#city_search_result").html(responce);
	        }
	    });

});
$(document).on('click','#online_booking',function(e){
	$("#click_ac").val('online_booking');
	var ride_type_tmp =$('input[name="ride_type"]:checked').val();
	var res = ride_type_tmp.split("|");
	var amount = res[1];
	var ride_type = res[0];

	var ride_for = 'Outstation';
	var pickuploadtion = $("#pickup_point").val();
	var drop_location = $("#drop_point").val();
	var vehicle_type = $("input[name='vehicle_type']:checked").val();
	var vehicle_sub_type = $("input[name='vehicle_sub_type']:checked").val();
	var time = $("#date").val();
	var paymentmode = $("input[name='paymentmode']:checked").val();
	var duration=$("#pk_hours").val();
	var duration_book ='';
	var billing_phone = $("#billing_phone").val();
	var billing_name = $("#billing_name").val();
	var billing_email = $("#billing_email").val();
	var cityid = $("#cityid").val();
	var discount_amount = '';
	var promo_amount = '';
	var payble_amount = res[1];
	var ap_code_final = 'Package';
	
	$("#online_booking").html('Please wait...');
	$.ajax({
        type: 'POST',
        url: path + 'Master/Booking',
        data: {"ride_type":ride_type,"ride_for":ride_for,"pickuploadtion":pickuploadtion,"drop_location":drop_location,"vehicle_type":vehicle_type,"vehicle_sub_type":vehicle_sub_type,"time":time,"duration_book":duration_book,"paymentmode":paymentmode,"cityid":cityid,"amount":amount,"duration":duration,"discount_amount":discount_amount,"promo_amount":promo_amount,"payble_amount":payble_amount,"ap_code_final":ap_code_final},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	var json = JSON.parse(responce);
        	if(json.status=='LoginRequired')
        	{
            	$("#loginform").modal('show');
            }
            else if(json.status=='success')
            {
            	if(json.payment_mode == 'Online')
            	{
            		$("#orderId").val(json.orderId);
        			$("#orderAmount").val(json.payble_amount);
        			setTimeout(function(){ $("#cashfree_form_booking").submit(); }, 500);
        			$("#online_booking").html('Book Now');
            	}
            	else
            	{
            		$("#new_book_id").html('BOOKING ID : '+json.booking_id);
	            	$("#confirmation_final").hide();
	            	$("#step_four").hide();
	            	$("#booking_success").show();
            	}
            	
            }
        }
    });

});

$(document).on('click','#confirm_booking',function(){
	var pickup_cityLatLng = $("#pickup_cityLatLng").val().trim();
	var drop_cityLatLng = $("#drop_cityLatLng").val().trim();
	var pk_hours = $("#pk_hours").val();

	var date = $("#date").val().trim();
	var time = $("#time").val().trim();
	var pickup_point = $("#pickup_point").val().trim();
	var drop_point = $("#drop_point").val().trim();
	var vehicle_type =$('input[name="vehicle_type"]:checked').val();
	var vehicle_sub_type =$('input[name="vehicle_sub_type"]:checked').val();
	var ride_type = $('input[name="ride_type"]:checked').val();
	var paymentmode =$('input[name="paymentmode"]:checked').val();

	$.ajax({
        type: 'POST',
        url: path + 'Master/CityBooking',
        data: {"date":date,"time":time,"pickup_point":pickup_point,"drop_point":drop_point,"vehicle_type":vehicle_type,"vehicle_sub_type":vehicle_sub_type,"pickup_cityLatLng":pickup_cityLatLng,"drop_cityLatLng":drop_cityLatLng,"ride_type":ride_type,"paymentmode":paymentmode,"pk_hours":pk_hours},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'Login')
        	{
        		$("#loginform").modal('show');
        	}
        	else if(responce == 'payonline')
        	{
        		window.location.href = path+"onlinepayment";
        	}
        	else
        	{
        		$("#eroor_booking").html('<div class="alert alert-success"><strong>Success! </strong>We will assign Driver Shortly.</div>');
        	}
            
        }
    });
});

$(document).on('click','#ride_type_choose',function(){
	$("#ride_type_choose").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','#next_step',function(){
	var pickup_point = $("#pickup_point").val().trim();
	var drop_point = $("#drop_point").val().trim();
	var pk_hours = $("#pk_hours").val();
	var ride_type = $('input[name="ride_type"]:checked').val();
	var vehicle_type = $('input[name="vehicle_type"]:checked').val();
	var vehicle_sub_type = $('input[name="vehicle_sub_type"]:checked').val();

	var ride = ride_type.split("|");
	
	alert(ride[0]); 
	if(ride_type === undefined)	
	{
		$("#eroor_booking").html('<div class="alert alert-danger"><strong>Opps! </strong>Please Select Ride Type.</div>');
		location.href = "#ridetype_div";
		return false;
	}
	else if(pickup_point == '')
	{
		$("#eroor_booking").html('<div class="alert alert-danger"><strong>Opps! </strong>Enter pickup location.</div>');
		$("#pickup_point").focus();
		return false;
	}
	else if(drop_point == '' && ride[0] == 'One Way')
	{
		$("#eroor_booking").html('<div class="alert alert-danger"><strong>Opps! </strong>Enter Drop location.</div>');
		$("#drop_point_package").focus();
		return false;
	}
	else if(pk_hours == '' && ride[0] == 'Round Trip')
	{
		$("#eroor_booking").html('<div class="alert alert-danger"><strong>Opps! </strong>Please select duration</div>');
		$("#drop_point_package").focus();
		return false;
	}
	if(vehicle_type === undefined)	
	{
		$("#eroor_booking").html('<div class="alert alert-danger"><strong>Opps! </strong>Please vehicle Type.</div>');
		return false;
	}
	if(vehicle_sub_type === undefined)	
	{
		$("#eroor_booking").html('<div class="alert alert-danger"><strong>Opps! </strong>Please Select vehicle name.</div>');		
		return false;
	}
	else
	{
		$("#step_one").hide();
		$("#step_two").show();
	}
});

$(document).on('click','#next_step_3',function(){
	var date = $("input[name='date']:checked").val();
	var month = $("input[name='month']:checked").val();
	$("#date").val(date+'-'+month);
	$("#step_three").hide();
	$("#step_three_time").show();
});

$(document).on('click','#back_step_2-1',function(){
	$("#step_three_time").hide();
	$("#step_three").show();
});

$(document).on('click','#back_step_time',function(){
	$("#step_four").hide();
	$("#step_two").show();
});

$(document).on('click','#next_step_3-1',function(){
	
	var time = '';
	var date = $("input[name='date']:checked").val();
	var time_hours = $("input[name='time_hours']:checked").val();
	var time_minutes = $("input[name='time_minutes']:checked").val();
	var time_formate = $("input[name='time_formate']:checked").val();
	$("#h_error,#m_error,#a_error").css('color','');
	if(date == undefined)
	{	
		$("#eroor_booking2").html('<div class="alert alert-danger"><strong>Opps! </strong>Please Select date.</div>');
		return false;
	}
	else if(time_hours == undefined)
	{	
		$("#eroor_booking2").html('<div class="alert alert-danger"><strong>Opps! </strong>Please Select time.</div>');
		return false;
	}
	else if(time_minutes == undefined)
	{
		$("#eroor_booking2").html('<div class="alert alert-danger"><strong>Opps! </strong>Please Select time.</div>');
		$("#m_error").css('color','red');
		return false;
	}
	else if(time_formate == undefined)
	{
		$("#eroor_booking2").html('<div class="alert alert-danger"><strong>Opps! </strong>Please Select time.</div>');
		$("#a_error").css('color','red');
		return false;
	}
	else
	{
		var time = date+' '+time_hours+':'+time_minutes+' '+time_formate;
		$("#date").val(time);
	}
	var pickup_point = $("#pickup_point").val().trim();
	var drop_point = $("#drop_point").val().trim();
	var vehicle_type =$('input[name="vehicle_type"]:checked').val();
	var vehicle_sub_type =$('input[name="vehicle_sub_type"]:checked').val();
	var ride_type =$('input[name="ride_type"]:checked').val();
	if(date == '')
	{
		$("#date").focus();
		return false;
	}
	
	else
	{
		$("#pickup_Point_text").text(pickup_point);
		$("#destination_text").text(drop_point);
		$("#datetime_text").text(time);
		$("#vehicle_details_text").text(vehicle_sub_type+' - ' + vehicle_type);
		$("#step_two").hide();
		$("#step_four").show();
	}
});

$(document).on('click','#next_step_2',function(){
	$("#step_two").hide();
	$("#step_three").show();
});

$(document).on('click','#back_step_1',function(){
	$("#step_two").hide();
	$("#step_one").show();
});

$(document).on('click','#back_step_2',function(){
	$("#step_two").hide();
	$("#step_one").show();
});
$(document).on('click','#back_step_3',function(){
	$("#step_four").hide();
	$("#step_three").show();
});



$(document).on('click','#next_confirmation',function(){
	var ride_type = $("input[name='ride_type']:checked").val();
	var ride_for = $("input[name='ride_for']:checked").val();
	var pickup_point = $("#pickup_point").val();
	var drop_point = $("#drop_point").val();
	var duration_book = $("#duration_book").val();	
	var vehicle_type = $("input[name='vehicle_type']:checked").val();
	var vehicle_sub_type = $("input[name='vehicle_sub_type']:checked").val();
	var month = $("input[name='month']:checked").val();
	var date = $("input[name='date']:checked").val();

	var time_hours = $("input[name='time_hours']:checked").val();
	var time_minutes = $("input[name='time_minutes']:checked").val();
	var time_formate = $("input[name='time_formate']:checked").val();
	$("#h_error,#m_error,#a_error").css('color','');
	if(time_hours == undefined)
	{	
		$("#h_error").css('color','red');
		return false;
	}
	else if(time_minutes == undefined)
	{
		$("#m_error").css('color','red');
		return false;
	}
	else if(time_formate == undefined)
	{
		$("#a_error").css('color','red');
		return false;
	}
	else
	{
		var time = time_hours+':'+time_minutes+' '+time_formate;
		$("#pic_time").val(time);
		$("#time_picker_div").modal('hide');
	}

	var time = $("#pic_time").val();
	if(time == '')
	{
		$("#pic_time").focus();
		return false;
	}

	var res = duration_book.split("|");	
	var es_amount = res[0];
	
	$("#view_ride").html(ride_type);
	$("#view_ride_for").html(ride_for);
	$("#view_location_pickup").html(pickup_point.substring(0, 30));
	$("#view_location_drop").html(drop_point.substring(0, 30));
	$("#view_vehicle").html(vehicle_type+' | '+vehicle_sub_type);
	$("#view_date").html(month+' / '+date);
	$("#view_time").html(time);

	if(ride_type == 'Round Trip')
	{
		$("#estimate_amount").html('₹ '+es_amount);
		//$("#total").html('₹ '+es_amount);
    	$("#estimate_amount_val").val(es_amount);
    	var discount = (es_amount*5)/100;
        var pay = es_amount-discount;
        $("#payble_amount").val(pay.toFixed(2));
        $("#discount_amount").val(discount.toFixed(2));
        $("#online_discount_price").html('₹ '+discount.toFixed(2));
        $("#total").html('₹ '+pay.toFixed(2));
	}
	

	$("#booking_5").hide();
	$("#booking_6").fadeIn(100);
});


$(document).on('click','#cancel_bookings', function() {
	var id =$(this).attr('fdi');	
	$("#booking_cancel").attr('fdi',id);
  	$('#cancelmodal').modal('show');
});

$(document).on('click', '#cancel_modal', function() {
	$('#cancelmodal').modal('hide');
});
$(document).on("click", "#booking_cancel", function() {
	var id =$(this).attr('fdi');	
	$.ajax({
        type: 'POST',
        url: path + 'Master/BookingCancel',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'success')
        	{
        		$("#rk_modal").hide();
	        	$("#rk_modal2").show();
        		setTimeout(function(){window.location = path+"dashboard/booking"; }, 3000);
        		//$('#cancelmodal').modal('hide');
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>not deleted.</div>');
        	}
        	//$("#row_"+responce).remove();
        }
    });
});
$(document).on('click', '#cancel_bk', function() {
	$('#cancelmodal').modal('hide');
	setTimeout(function(){window.location = path+"dashboard/booking"; }, 3000);
});

$(document).on('click', '#cancel_modal2', function() {
	$('#viewreview').modal('hide');
});

$(document).on('click', '#view_review', function() {
	var star = $(this).attr('star');
	var review = $(this).attr('review');
	if(star == 1)
	{
		$(".star_review").html('<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>');
	}
	if(star == 2)
	{
		$(".star_review").html('<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>');
	}
	if(star == 3)
	{
		$(".star_review").html('<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>');
	}
	if(star == 4)
	{
		$(".star_review").html('<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-o" aria-hidden="true"></i>');
	}
	if(star == 5)
	{
		$(".star_review").html('<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>');
	}
	$(".contain_review").html(review);
	$("#viewreview").modal('show');
});