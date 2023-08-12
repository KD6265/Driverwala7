$(document).on("click", "#submit_inquiry", function() {
        var cname = $("#cname").val();
        var number = $("#number").val();
        var email = $("#email").val();
        var btype = $("#business_type_div a.picked").attr('fdi');
        var bname = $("#bname").val();
        var b_for = $("#b_type").val();
        var city_name = $("#city_name").val();
        var inquiry_for = $("#b_inquiry_for").val();
        $("#error_in").html('');
        $("#cname,#number,#email,#bname,#b_for").css('border-color','');
        if(inquiry_for == '')
        {
            $('html,body').animate({
                scrollTop: $("#b_inquiry_for_div").offset().top},
                'fast');
            return false;
        }
        if(cname == '')
        {
            $("#cname").focus().css('border-color','red');
            $("#error_in").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Name must be required.</div>');
            return false;
        }
        if(number == '')
        {
            $("#number").focus().css('border-color','red');
            $("#error_in").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Phone number must be required.</div>');
            return false;
        }
        if(number.length != 10)
        {
            $("#number").focus().css('border-color','red');
            $("#error_in").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter valid phone number.</div>');
            return false;
        }
        if(email == '')
        {
            $("#email").focus().css('border-color','red');
            $("#error_in").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Email address must be required.</div>');
            return false;
        }
        if(btype == 'Business' && bname == '')
        {
            $("#bname").focus().css('border-color','red');
            $("#error_in").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Business name must be required.</div>');
            return false;
        }
        if(btype == 'Business' && b_for == '')
        {
            $("#b_type").focus().css('border-color','red');
            $("#error_in").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Business type must be required.</div>');
            return false;
        }
        $("#error_in").html('<div class="alert alert-info alert-dismissible"><strong>Please Wait...</strong></div>');
        $("#submit_inquiry").prop('disabled',true).html('Loading...');

        $.ajax({
            type: 'POST',
            url: path + 'Master/BusinessInquiry',
            data: {"cname":cname,"number":number,"email":email,"bname":bname,"btype":btype,"b_for":b_for,"city_name":city_name,"inquiry_for":inquiry_for},
            beforeSend: function () {               
            },
            success: function (responce) {
                var json = JSON.parse(responce);
                //socket.emit('send_to_server_business_noti', json);
                $("#error_in").html('<div class="alert alert-success alert-dismissible"><strong>Thanks for contacting us. We will get back to you soon!</strong></div>');
                $("#cname").val('');
                $("#number").val('');
                $("#email").val('');
                $("#comments").val('');
                $("#organization").val('');
                $("#designation").val('');
                $("#b_inquiry_for").val('');
                $("#inquiry_for_divs div").removeClass('picked');
                $("#submit_inquiry").prop('disabled',false).html('Submit');
            }
        });

    });

$(document).on('click','#do_not_accounr',function(){
	$("#login_form").hide();
	$("#register_from").show();
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

$(document).on("click", "#offer_session", function() {
	var id = $(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'master/offersessioncity',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	window.location.href = path+"offers";
        }
    });
});

$(document).on('click','#already_accounr',function(){
	$("#register_from").hide();
	$("#login_form").show();
});

$(document).on('click','#final_business_login',function(event){
	$("#error_login").html('');
  	var phone = $("#login_phone").val();
  	var login_otp = $("#login_otp").val();
  	if(login_otp == '')
  	{
  		$("#error_login").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter OTP number.</div>');
  		$("#login_otp").focus();
  		return false;
  	}
  	else if(phone == '')
  	{
  		$("#error_login").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter your phone number.</div>');
  		$("#login_phone").focus();
  		return false;
  	}
  	else if(phone.length != 10)
  	{
  		$("#error_login").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter valid phone number.</div>');
  		$("#login_phone").focus();
  		return false;
  	}
    else
    {    	
    	$("#error_login").html('<div class="alert alert-info alert-dismissible"><strong>Authentication...</strong></div>');
    	$.ajax({
	        type: 'POST',
	        url: path + 'master/LoginBusiness',
	        data: {"mobile":phone,"otp":login_otp},
	        beforeSend: function () {
	        	$("#final_business_login").html('Loading...').prop('disabled',true);
	        },
	        success: function (responce) {
	        	var parsed = JSON.parse(responce);
	        	if(parsed.status == 'success')
	        	{	        		
		        	$("#error_login").html('<div class="alert alert-success alert-dismissible"><strong>Login Successfully.</strong></div>'); 
		        	window.location.href = path+"v2/business";	        	
	        	}
	        	else
	        	{
	        		$("#error_login").html('<div class="alert alert-danger alert-dismissible"><strong>'+parsed.message+'</strong></div>'); 
	        		$("#final_business_login").html('Submit').prop('disabled',false);
	        	}
	        	setTimeout(function(){ $("#error_login").html(''); }, 2000);
	        	
	        }
	  	});
    }
});

$(document).on('click','#submit_business_login,#resend_log_otp',function(event){
	$("#error_login").html('');
  	var phone = $("#login_phone").val();
  	if(phone == '')
  	{
  		$("#error_login").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter your phone number.</div>');
  		$("#login_phone").focus();
  		return false;
  	}
  	else if(phone.length != 10)
  	{
  		$("#error_login").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter valid phone number.</div>');
  		$("#login_phone").focus();
  		return false;
  	}
    else
    {    	
    	$("#error_login").html('<div class="alert alert-info alert-dismissible"><strong>Authentication...</strong></div>');
    	$.ajax({
	        type: 'POST',
	        url: path + 'master/OTPSendBusi',
	        data: {"mobile":phone},
	        beforeSend: function () {
	        	$("#submit_business_login").html('Loading...').prop('disabled',true);
	        },
	        success: function (responce) {
	        	var parsed = JSON.parse(responce);
	        	if(parsed.status == 'success')
	        	{
	        		$("#error_in_reg").html('');
		        	$("#error_login").html('<div class="alert alert-success alert-dismissible"><strong>OTP Sent Successfully.</strong></div>');        	
		        	$("#submit_business_login").html('Submit').prop('disabled',false);
		        	$(".login_btn").hide();
		        	$(".login_otp_textbox").show();
		        	$(".final_login_btn").show();		        	
	        	}
	        	else
	        	{
	        		$("#error_login").html('<div class="alert alert-danger alert-dismissible"><strong>'+parsed.message+'</strong></div>'); 
	        		$("#submit_business_login").html('Submit').prop('disabled',false);
	        	}
	        	setTimeout(function(){ $("#error_login").html(''); }, 2000);
	        	
	        }
	  	});
    }
});

$(document).on('click','#register_business_account,#resend_reg_otp',function(event){
	$("#error_in_reg").html('');
  	var city_id = $("#city_id_business").val();
  	var cname = $("#cname").val();
  	var phone = $("#number").val();
  	var email = $("#email").val();
  	var organization = $("#organization").val();
  	var designation = $("#designation").val();
  	var comments = $("#comments").val();
  	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  	if(city_id == '')
  	{
  		$("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please select city.</div>');
  		$("#city_id_business").focus();
  		return false;
  	}
  	else if(cname == '')
  	{
  		$("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter your name.</div>');
  		$("#cname").focus();
  		return false;
  	}
  	else if(phone == '')
  	{
  		$("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter your phone number.</div>');
  		$("#number").focus();
  		return false;
  	}
  	else if(phone.length != 10)
  	{
  		$("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter valid phone number.</div>');
  		$("#number").focus();
  		return false;
  	}
  	else if(email == '')
  	{
  		$("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter email address.</div>');
  		$("#email").focus();
  		return false;
  	}
  	else if(reg.test(email) == false) 
    {       
        $("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Invalid Email Address.</div>');
        $("#email").focus();
        return false;
    }
    else if(organization == '') 
    {       
        $("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter organization name.</div>');
        $("#organization").focus();
        return false;
    }
    else if(designation == '') 
    {       
        $("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter designation.</div>');
        $("#designation").focus();
        return false;
    }
    else if(comments == '') 
    {       
        $("#error_in_reg").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter your address.</div>');
        $("#comments").focus();
        return false;
    }
    else
    {
    	$("#reg_mo_box").text(phone);
    	$("#error_in_reg").html('<div class="alert alert-info alert-dismissible"><strong>Authentication...</strong></div>');
    	$.ajax({
	        type: 'POST',
	        url: path + 'master/OTPSend',
	        data: {"mobile":phone},
	        beforeSend: function () {
	        	$("#register_business_account").html('Loading...').prop('disabled',true);
	        },
	        success: function (responce) {
	        	$("#error_in_reg").html('');
	        	$("#error_in_otp").html('<div class="alert alert-success alert-dismissible"><strong>OTP Sent Successfully.</strong></div>');        	
	        	$("#register_business_account").html('Submit').prop('disabled',false);
	        	$("#register_from").hide();
	        	$("#register_from_otp").show();
	        	setTimeout(function(){ $("#error_in_otp").html(''); }, 2000);
	        }
	  	});
    }
});

$(document).on('click','#otp_business_account',function(event){
	$("#error_in_reg").html('');
  	var city_id = $("#city_id_business").val();
  	var cname = $("#cname").val();
  	var phone = $("#number").val();
  	var email = $("#email").val();
  	var organization = $("#organization").val();
  	var designation = $("#designation").val();
  	var comments = $("#comments").val();
  	var reg_otp = $("#reg_otp").val();
  	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  	if(city_id == '')
  	{
  		$("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please select city.</div>');
  		$("#city_id_business").focus();
  		return false;
  	}
  	else if(cname == '')
  	{
  		$("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter your name.</div>');
  		$("#cname").focus();
  		return false;
  	}
  	else if(phone == '')
  	{
  		$("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter your phone number.</div>');
  		$("#number").focus();
  		return false;
  	}
  	else if(phone.length != 10)
  	{
  		$("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter valid phone number.</div>');
  		$("#number").focus();
  		return false;
  	}
  	else if(email == '')
  	{
  		$("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter email address.</div>');
  		$("#email").focus();
  		return false;
  	}
  	else if(reg.test(email) == false) 
    {       
        $("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Invalid Email Address.</div>');
        $("#email").focus();
        return false;
    }
    else if(organization == '') 
    {       
        $("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter organization name.</div>');
        $("#organization").focus();
        return false;
    }
    else if(designation == '') 
    {       
        $("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter designation.</div>');
        $("#designation").focus();
        return false;
    }
    else if(comments == '') 
    {       
        $("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter your address.</div>');
        $("#comments").focus();
        return false;
    }
    else if(reg_otp == '') 
    {       
        $("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter OTP.</div>');
        $("#reg_otp").focus();
        return false;
    }
    else
    { 
    	var cityname = $("#city_id_business option:selected" ).text();   	
    	$("#error_in_otp").html('<div class="alert alert-info alert-dismissible"><strong>Authentication...</strong></div>');
    	$.ajax({
	        type: 'POST',
	        url: path + 'master/RegisterBusinress',
	        data: {"city_id":city_id,"cityname":cityname,"cname":cname,"phone":phone,"email":email,"organization":organization,"designation":designation,"comments":comments,"reg_otp":reg_otp},
	        beforeSend: function () {
	        	$("#otp_business_account").html('Please wait...').prop('disabled',true);
	        },
	        success: function (responce) {
	        	var parsed = JSON.parse(responce);
	        	if(parsed.status == 'success')
	        	{
	        		$("#error_in_otp").html('<div class="alert alert-success alert-dismissible"><strong>Registration Success.</strong></div>');
	        		window.location.href = path+"v2/business";
	        	}
	        	else
	        	{
	        		$("#error_in_otp").html('<div class="alert alert-danger alert-dismissible"><strong>'+parsed.message+'</strong></div>');
	        		$("#otp_business_account").html('Submit').prop('disabled',false);
	        	}
	        }
	  	});
    }
});

$(document).on('click','#coppy_code',function(event){
  var $tempElement = $("<input>");
      $("body").append($tempElement);
      $tempElement.val($("#code_text").text().trim()).select();
      document.execCommand("Copy");
      $tempElement.remove();
      $(this).removeClass('fa-clone').addClass('fa-check-circle-o');
});


$(document).on('click','#pills-tab li a',function(){	
	$("#pills-tab li a").removeClass('active');
	$(this).addClass('active');
	var fdi = $(this).attr('fdi');
	
	$("#pills-dayone").hide();
	$("#pills-daytwo").hide();
	$("#pills-daythree").hide();
	$("#"+fdi).show();
});

// $(document).on('click','.cp_custom_nav ul li',function(){		
// 	var controller = $(this).attr('controller');
// 	$.ajax({
//     type: 'POST',
//     url: path + 'Dashboard/'+controller,
//     data: {"type":"ajax"},
//     beforeSend: function () {
    	
//     },
//     success: function (responce) {
//     	$("#ajax_dashboard").html(responce);
//     }
    	
// 	});
// });

jQuery(function($) {
  var path = window.location.href; 

     $('#user_menu div a').each(function() {
      if (this.href === path) {
       $(this).addClass('active');
      }
     });

     $('.cp_custom_nav ul li').each(function() {
     	var test_site = 'https://test.drivars.com/dashboard/'+$(this).attr('controller');
     	var live_site = 'https://drivars.com/dashboard/'+$(this).attr('controller');
     	
      if (test_site === path || live_site == path) {
       	$(this).addClass('cp_custom_nav_active');
      }
     });
});

$(document).on('click','#left_user_menu li,#back_page',function(){

	var controller = $(this).attr('controller');
	if(controller != undefined)
	{
			$('#left_user_menu li').removeClass('cp_custom_nav_active');
			$(this).addClass('cp_custom_nav_active');

			if(controller == 'index')
			{
				history.pushState(null, '', path+'dashboard');
			}
			else
			{
				history.pushState(null, '', path+'dashboard/'+controller);
			}
			
			$.ajax({
		        type: 'POST',
		        url: path + 'Pages/'+controller,
		        //data: {"contact_detail":contact_detail},
		        beforeSend: function () {
		        	$("#PageUserData").html('<div class="sk-fading-circle"> <div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>');
		        },
		        success: function (responce) {
		        	$("#PageUserData").html(responce);
		        }
		  });
	}
	

});

$(document).on('click','#quation_list li a',function(){
	var id = $(this).attr('fdi');
	$('.cp_qua').each(function() {
      $(this).hide();
  });
  $("#"+id).show();
});


$(document).on('click','#send_driver_inquery',function(){
	var fname = $("#fname").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var vytpe = $("#vytpe").val();
	var vname = $("#vname").val();
	var city_name = $("#city_name").val();
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(fname == '')
	{
		$("#fname").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Name must be required.</div>');	
		return false;
	}
	if(phone == '')
	{
		$("#phone").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Phone number must be required.</div>');	
		return false;
	}
	if(phone.length != 10)
	{
		$("#phone").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Please enter valid Phone number.</div>');	
		return false;
	}
	if(email == '')
	{
		$("#email").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Email address must be required.</div>');	
		return false;
	}
	if(!regex.test(email)) 
	{
		$("#email").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Enter valid email address.</div>');	
		return false;
	}
	if(city_name == '')
	{
		$("#city_name").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> City must be required.</div>');	
		return false;
	}
	if(vytpe == '')
	{
		$("#vytpe").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Vehicle type must be required.</div>');	
		return false;
	}
	if(vname == '')
	{
		$("#vname").focus();
		$("#error_message").html('<div class="alert alert-danger alert-dismissible"><strong>Opps!</strong> Vehicle name must be required.</div>');	
		return false;
	}
	var licence_front = $('#driving_licence_front').prop('files')[0];   
	var licence_back = $('#driving_licence_back').prop('files')[0];   
	var aadharcard_front = $('#aadharcard_front').prop('files')[0];   
	var aadharcard_back = $('#aadharcard_back').prop('files')[0];   
	var selfie = $('#selfie').prop('files')[0];   
	var form_data = new FormData();  

	form_data.append('fname', fname);
	form_data.append('phone', phone);
	form_data.append('email', email);
	form_data.append('city_name', city_name);
	form_data.append('vytpe', vytpe);
	form_data.append('vname', vname);
	form_data.append('licence_front', licence_front);
	form_data.append('licence_back', licence_back);
	form_data.append('aadharcard_front', aadharcard_front);
	form_data.append('aadharcard_back', aadharcard_back);
	form_data.append('selfie', selfie);
	$("#send_driver_inquery").prop('disabled',true).html('Loading...');
	$.ajax({
	    url: path + 'Drivewithus/DriverInquery', // point to server-side PHP script 
	    dataType: 'text',  // what to expect back from the PHP script, if anything
	    cache: false,
	    contentType: false,
	    processData: false,
	    data: form_data,                         
	    type: 'post',
	    success: function(response){
	    	if(response == 'success')
	    	{
	    		$("#error_message").html('<div class="alert alert-success alert-dismissible"><strong>Thanks for contacting us. We will get back to you soon!</strong></div>');
	    		$("#send_driver_inquery").prop('disabled',false).html('Submit');
	    	}
	    	else
	    	{
	    		$("#error_message").html('<div class="alert alert-warning alert-dismissible"><strong>'+response+'</strong></div>');
	    		$("#send_driver_inquery").prop('disabled',false).html('Submit');
	    	}
	        
	    }
	});
	
});

$(document).on('click','#pay_outstanding',function(){
	var id = $(this).attr('fromid');
	$("#cashfree_form"+id).submit();
	//var id = $(this).attr('fdi');
	// $.ajax({
 //    type: 'POST',
 //    url: path + 'Master/GetOutstandingData',
 //    data: {"id":id},
 //    beforeSend: function () {
    	
 //    },
 //    success: function (responce) {
 //    	var json = JSON.parse(responce);
	//     	payment_user(json.id,json.fname,json.email,json.phone,json.amount);					            
	//     }
	// });
	
});


function payment_user(id,billing_name,billing_email,billing_phone,payble_amount,function_name)
{
	var options = {
					    "key": "rzp_test_0YAtyEpraBGsLC", // Enter the Key ID generated from the Dashboard
					    "amount": (payble_amount*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
					    "currency": "INR",
					    "name": billing_name,
					    "description": "Book a ride package",
					    "image": path+"logo/icon.png",
					    //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
					    "handler": function (response){
					    	var payment_id = response.razorpay_payment_id;
					    	
					        $.ajax({
								    type: 'POST',
								    url: path + 'Master/PaidOutstanding',
								    data: {"id":id,"payment_id":payment_id},
								    beforeSend: function () {
								    	
								    },
								    success: function (responce) {
								    				$("#status_"+responce).html('<span class="btn btn-success btn-sm" style="padding: 4px 14px; font-size: 13px;">Paid</span>');		            
									    }
									});

					    },
					    "prefill": {
					        "name": billing_name,
					        "email": billing_email,
					        "contact": billing_phone
					    },
					    "notes": {
					        "address": ""
					    },
					    "theme": {
					        "color": "#03b7cc"
					    }
					};

					//$("#rzp-button1").trigger('click');
					var rzp1 = new Razorpay(options);
					rzp1.on('payment.failed', function (response){
					        return 'payment failed';
					});

					rzp1.open();
					e.preventDefault();
}

$(document).on("keyup", "#search_city_front", function() {
	var searchTerm = $(this).val().toLowerCase();
	$('.tag_p').each(function() {
    if (searchTerm.length < 1) {
      $(this).show();
    } else {
      $(this).toggle($(this).filter('[cityname*="' + searchTerm + '"]').length > 0);
    }
  });
});

$(document).on("input", "#search_faq_front", function() {
	var searchTerm = $(this).val();
	$('.tag_p').each(function() {
    if (searchTerm.length < 1) {
      $(this).show();
    } else {
      $(this).toggle($(this).filter('[cityname*="' + searchTerm + '"]').length > 0);      
    }
  });
});

$(document).on("click", "#inquiry_for", function() {
	$("#b_inquiry_for").val($(this).attr('fdi'));

	$("#inquiry_for_divs div").removeClass('picked');
	$(this).addClass('picked');
	//goToByScroll('admission');
});

$(document).on("click", "#business_type_div a", function() {
	$("#business_type_div a").removeClass('picked');
	$(this).addClass('picked');
	var btype = $(this).attr('fdi');
	if(btype == 'Business')
	{
		$("#cp1").show();
		$("#cp2").show();
	}
	else
	{
		$("#cp1").hide();
		$("#cp2").hide();
	}	
});

function goToByScroll(id){
          // Reove "link" from the ID
        id = id.replace("link", "");
          // Scroll
        $('html,body').animate({
            scrollTop: $("#"+id).offset().top},
            'fast');
    }



$(document).on("click", "#drive_city", function() {
	var city = $(this).attr('cityname');
	$.ajax({
	        type: 'POST',
	        url: path + 'Master/DriveCity',
	        data: {"city":city},
	        beforeSend: function () {	        	
	        },
	        success: function (responce) {
	        	window.location.href = path+"driverin"+responce;
	        }
	    });

});
$(document).on("click", "#update_profile", function() {
	//alert("okk");
	var fname=$("#fname").val();
	var email=$("#email").val();
	var phone=$("#phone").val();
	var address=$("#address").val();

	var letters = /^[A-Za-z]+$/;
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var digit =/^[0-9]{3,10}$/;

	$("#regerror").html('');
	if(fname=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Full Name.</div>');
		$("#fname").focus();
		return false;
	}
	else if(email=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter email.</div>');
		$("#email").focus();
		return false;
	}
	else if(!regex.test(email))
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Please Enter Valid Email Address.</div>');
		$("#email").focus();
		return false;
	}
	else if(phone=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Mobil Number.</div>');
		$("#phone").focus();
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/UpdateProfile',
	        data: {"fname":fname,"email":email,"phone":phone,"address":address},
	        beforeSend: function () {	        	
	        },
	        success: function (responce) {
	        	if(responce == 'success')
	        	{
	        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Updated Successfully..</div>');
	        		//setTimeout(function(){window.location = path+"login"; }, 3000);
	        		setTimeout(function(){$("#regerror").html(''); }, 3000);
	        	}
	        	else
	        	{
	        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
	        	}
	           //$("#regerror").html(responce);

	        }
	    });
	}

});
$(document).on('click','#upload-img',function(){
	$("#user-img").trigger('click');
});

$(document).on('change','#user-img', function() {
	$("#userimage").attr('src','/img/200.gif');
    var file_data = $('#user-img').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('file', file_data);
                            
    $.ajax({
        url: path + 'Master/CoverPic', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
        	$("#userimage").attr('src',php_script_response);
        	window.location = path+"dashboard/setting";
        	//$("#main-avtar").attr('src',php_script_response);
            //alert(php_script_response); // display response from the PHP script, if any
        }
     });
});

$(document).on('click', '#delete_account', function() {
	var id =$(this).attr('fdi');
	//alert(id);
	$("#account_delete").attr('fdi',id);
        $('#myModal').modal('show');
        //$("#loginform").modal('show');

});
$(document).on("click", "#account_delete", function() {
	var id =$(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'Master/DeleteUsers',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'success')
        	{
        		$("#rk_modal").hide();
						$("#rk_modal2").show();
						setTimeout(function(){$("#cancel_ok").trigger('click');}, 1000);
						//setTimeout(function(){window.location = path+"logout"; }, 3000);
        		//$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Accouunt Successfully Deleted..</div>');
        		//setTimeout(function(){window.location = path+"login"; }, 3000);
        		//setTimeout(function(){window.location = path+"logout"; }, 3000);
        		//$('#myModal').modal('hide');
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>not deleted.</div>');
        	}
        	//$("#row_"+responce).remove();
        }
    });
});

$(document).on("click","#cl_modal",function(){
	$('#myModal').modal('hide');
	$('#reviewModal').modal('hide');
});
$(document).on("click", "#cancel_ok", function() {
	setTimeout(function(){window.location = path+"logout"; }, 1000);
});
$(document).on("click","#cancel_modal",function(){
	$('#cancelmodal').modal('hide');
});

$(document).on("click", "#next_users", function() {
	$("#previous_users").prop("disabled", false).html('<< Previous');	
		$.ajax({
	        type: 'POST',
	        url: path + 'Dashboard/Next',
	       // data: {"id":id},
	        beforeSend: function () {
	        	$("#next_users").html('Loading...');
	        },
	        success: function (responce) {
	        	if(responce == 'no-record')
	        	{
	        		$("#next_users").prop("disabled", true).html('No More Record Found.');
	        	}
	        	else
	        	{
	        		$("#next_users").html('Next >>');
	        		$('#bookings_active').html(responce);
	        	}
	        	
	        }
	    });
});
$(document).on("click", "#previous_users", function() {
		$("#next_users").prop("disabled", false).html('Next >>');
		$.ajax({
	        type: 'POST',
	        url: path + 'Dashboard/Previous',
	       // data: {"id":id},
	        beforeSend: function () {
	        	$("#previous_users").html('Loading...');
	        },
	        success: function (responce) {
	        	if(responce == 'no-record')
	        	{
	        		$("#previous_users").prop("disabled", true).html('No More Record Found.');
	        	}
	        	else
	        	{
	        		$("#previous_users").html('<< Previous');
	        		$('#bookings_active').html(responce);
	        	}
	        	//$('tbody').html(responce);
	        }
	    });
});

//prakashbhai js

$(document).on('click','.month_cp a',function(){
	$(".month_cp a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.date_cp a',function(){
	$(".date_cp a").removeClass('picked');
	$(this).addClass('picked');
	var month = $(this).attr('fdi');
	$("#"+month).click();
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.vehicle_type a',function(){
	$(".vehicle_type a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.payment_cp a',function(){
	$(".payment_cp a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);

	
	var esam = $("#estimate_amount_val").val();
	var discount_amount = $("#discount_amount").val();
	var promo_amount = $("#promo_amount").val();
	

	if($(this).attr('title') == 'Online')
	{
		$("#online_discount").show();
		var total = (esam-discount_amount)-promo_amount;
		$("#online_discount_price").html('₹ '+discount_amount);
		$("#total").html('₹ '+total.toFixed(2));
		$("#payble_amount").val(total.toFixed(2));
		$("#notic").html('');
	}
	else
	{

		$("#online_discount").hide();
		var total = (esam-promo_amount);
		$("#online_discount_price").html('₹ 0.00');
		$("#total").html('₹ '+total.toFixed(2));
		$("#payble_amount").val(total.toFixed(2));
		$("#notic").html('Pay online and get 5% instant discount');
	}
});

$(document).on('click','.vehicle_details a',function(){
	$(".vehicle_details a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.vehicle_details_new button',function(){
	$(".vehicle_details_new button").removeClass('selected');
	$(this).addClass('selected');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','#confirmation_book',function(){
	$("#booking_3").hide();
	$("#booking_4").show();
});

$(document).on('click','#back_details_view',function(){	
	$("#booking_4").hide();
	$("#booking_3").show();
});

$(document).on('click','.ride_for a',function(){
	$(".ride_for a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.ride_for_new .out_station_box',function(){
	$(".ride_for_new .out_station_box").removeClass('box_active');
	$(this).addClass('box_active');
	$(this).find('input[type=radio]').prop('checked', true);
});

$(document).on('click','.ride_type a',function(){
	$(".ride_type a").removeClass('picked');
	$(this).addClass('picked');
	$(this).find('input[type=radio]').prop('checked', true);
	var ride_type = $("input[name='ride_type']:checked").val();
	var ride = ride_type.split("|");
	if(ride[0] == 'Round Trip')
	{
		$("#package_desctination").hide();
		$("#package_hours").show();
	}
	else
	{
		$("#package_hours").hide();
		$("#package_desctination").show();		
	}
});

$(document).on('click','.ride_type_new button',function(){
	$(".ride_type_new button").removeClass('selected');
	$(this).addClass('selected');
	$(this).find('input[type=radio]').prop('checked', true);
	var ride_type = $("input[name='ride_type']:checked").val();
	if(ride_type == 'One Way')
	{
			$("#duration_book_div").hide();
			$("#drop_point_div").show();
			mycustomRout();
	}
	else
	{
			$("#drop_point_div").hide();
			$("#duration_book_div").show();
	}
});

$(document).on('click','.vehicle_type_new button',function(){
	$(".vehicle_type_new button").removeClass('selected');
	$(this).addClass('selected');
	$(this).find('input[type=radio]').prop('checked', true);	
});

$(document).on('click','#next_select_location',function(){
	var ride_type = $("input[name='ride_type']:checked").val();
	var pickuploadtion = $("#pickup_point").val().trim();
	var drop_location = $("#drop_point").val().trim();
	var duration = $("#duration_book").val();
	var vehicle = $("input[name='vehicle_sub_type']:checked").val();
	var vehicle_type = $("input[name='vehicle_type']:checked").val();
	$("#b_cp_error").text('');
	if(ride_type == undefined)
	{
			$("#b_cp_error").text('Please Select Ride Type');
			return false;
	}
	else if(pickuploadtion == '')
	{
			$("#pickup_point").focus();
			$("#b_cp_error").text('Please select the source city.');
			return false;
	}
	else if(ride_type == 'One Way' && drop_location == '')
	{
			$("#drop_point").focus();
			$("#b_cp_error").text('Please select the destination city.');
			return false;
	}
	else if(ride_type == 'Round Trip' && duration == '')
	{
			$("#duration_book").focus();
			$("#b_cp_error").text('Please select the duration.');
			return false;
	}	
	else if(vehicle == undefined)
	{
			$("#b_cp_error").text('Please Select vehicle');
			return false;
	}
	else if(vehicle_type == undefined)
	{
			$("#b_cp_error").text('Please Select vehicle type');
			return false;
	}
	else
	{
		$("#ride_temp_text").text(ride_type);
		$("#booking_1").hide();
		$("#booking_2").fadeIn(100);
	}
	
});

$(document).on('click','#next_vehicle_details',function(){

	var ride_type = $("input[name='ride_type']:checked").val();
	var ride_for = $("input[name='ride_for']:checked").val();
	var pickuploadtion = $("#pickup_point").val();
	var drop_location = $("#drop_point").val();
	var duration_book = $("#duration_book").val();
	var res = duration_book.split("|");	
	$("#pickup_point,#drop_point,#duration_book").css('border-color','');
	$("#view_location_drop2").text(res[1]);
	if(ride_type == 'One Way' && pickuploadtion == '')
	{
		$("#pickup_point").focus();
		return false;
	}
	if(ride_type == 'One Way' && drop_location == '')
	{
		$("#drop_point").focus();
		return false;
	}
	if(ride_type == 'Round Trip' && pickuploadtion == '')
	{
		$("#pickup_point").focus();
		return false;
	}
	if(ride_type == 'Round Trip' && duration_book == '')
	{
			$("#duration_book").focus();
			return false;
	}
	
	$("#view_location_drop2").text(res[1]);
	$("#booking_2").hide();
	$("#booking_4").fadeIn(100);
	
	
});

$(document).on('click','#next_date_selection',function(){
	$("#booking_3").hide();
	$("#booking_4").fadeIn(100);
});



$(document).on('click','#back_vehicle_details',function(){
	$("#booking_2").hide();
	$("#booking_1").fadeIn(100);
});

$(document).on('click','#back_to_location',function(){
	$("#booking_3").hide();
	$("#booking_2").fadeIn(100);
});

$(document).on('click','#back_date_selection',function(){
	$("#booking_5").hide();
	$("#booking_4").fadeIn(100);
});

$(document).on('click','#next_bookinfg_info',function(){
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
	if(date == undefined)
	{		
		return false;
	}
	else if(time_hours == undefined)
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
		var time = date+' '+time_hours+':'+time_minutes+' '+time_formate;
		$("#pic_time").val(time);
		var res = duration_book.split("|");	
		var es_amount = res[0];
		
		$("#view_ride").html(ride_type);
		//$("#view_ride_for").html(ride_for);
		$("#view_location_pickup").html(pickup_point.substring(0, 30));
		$("#view_location_drop").html(drop_point.substring(0, 30));
		$("#view_vehicle").html(vehicle_type+' | '+vehicle_sub_type);
		$("#view_date").html(date);
		$("#view_time").html(time_hours+':'+time_minutes+' '+time_formate);

		if(ride_type == 'Round Trip')
		{
			$("#drop_location_text").hide();
			$("#drop_duration_text").show();
			$("#view_location_drop2").text(res[1]);
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
		else
		{
			$("#drop_location_text").show();
			$("#drop_duration_text").hide();
		}
			$("#booking_2").hide();
	  	$("#booking_3").fadeIn(100);
	}	
});

$(document).on('click','#back_confirmation',function(){
	$("#booking_2").hide();
	$("#booking_1").fadeIn(100);
});

$(document).on('click','#back_final_book',function(){
	$("#booking_3").hide();
	$("#booking_2").fadeIn(100);
});

$(document).on('click','#check_promo',function(){
	$("#promocode").css('border-color','');
	$("#click_ac").val('check_promo');
	var promocode = $("#promocode").val().trim();
	if(promocode == '')
	{
		$("#promocode").focus().css('border-color','red');
		return false;
	}
	$.ajax({
	        type: 'POST',
	        url: path + 'Master/CheckPromoCode',
	        data: {"promocode":promocode},
	        beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	var parsed = JSON.parse(responce);
	        	if(parsed.status=='LoginRequired')
	        	{
	            	$("#loginform").modal('show');
	            }
	            else if(parsed.status == 'success')
	            {	   
	            	$("#ap_code_final").val(parsed.promocode);
            		$("#online_cuppon").show();
            		var promo_am='';
            		var paymentmode = $("input[name='paymentmode']:checked").val();
            		var esam = $("#estimate_amount_val").val();
            		if(paymentmode == 'Online')
            		{
            			var discount_amount = $("#discount_amount").val();
            		}
            		else
            		{
            			var discount_amount ='';
            		}
            		
            		if(parsed.type == 'fix' || parsed.type == 'FIX')
            		{
            			promo_am = parsed.amount;
            		}
            		else
            		{
            			promo_am = (esam*parsed.amount)/100;
            			promo_am = promo_am.toFixed(2);
            			
            		}
            		$("#promo_amount").val(promo_am);
            		$("#online_cuppon_price").html('₹ '+promo_am);
            		var total = esam-discount_amount-promo_am;
            		$("#total").html('₹ '+total.toFixed(2));
            		$("#payble_amount").val(total.toFixed(2));
	            }
	            else
	            {
	            	$("#promocode").focus().css('border-color','red');
	            	$("#ap_code_final").val('');
	            	$("#promo_amount").val('');
	            	var esam = $("#estimate_amount_val").val();
            		
	            	$("#online_cuppon").hide();
	            	var paymentmode = $("input[name='paymentmode']:checked").val();
	            	if(paymentmode == 'Online')
								{
									var discount_amount = $("#discount_amount").val();						
									var total = (esam-discount_amount);
									$("#online_discount_price").html('₹ '+discount_amount);
									$("#total").html('₹ '+total.toFixed(2));
									$("#payble_amount").val(total.toFixed(2));
								}
								else
								{											
									var total = esam;						
									$("#total").html('₹ '+total.toFixed(2));
									$("#payble_amount").val(total.toFixed(2));
								}
	            }
	        }
	    });
});

$(document).on('click','#final_book',function(){
	console.log("final_book cilck")
	$("#click_ac").val('final_book');
	$(this).html('Please wait...');
	var ride_type = $("input[name='ride_type']:checked").val();
	console.log("final_book cilck_",ride_type)
	//var ride_for = $("input[name='ride_for']:checked").val();
	var ride_for ='';
	var pickuploadtion = $("#pickup_point").val();
	var drop_location = $("#drop_point").val();
	var vehicle_type = $("input[name='vehicle_type']:checked").val();
	var vehicle_sub_type = $("input[name='vehicle_sub_type']:checked").val();
	var month = '';
	var date = '';
	var paymentmode = $("input[name='paymentmode']:checked").val();
	var time = $("#pic_time").val();
	var duration='';
	var duration_book = $("#duration_book").val();
	if(duration_book != '')
	{
		var res = duration_book.split("|");	
		duration = res[1];
	}
	
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
	        url: '/booking/',
	        data: {"ride_type":ride_type,
			"ride_for":ride_for,
			"pickuploadtion":pickuploadtion,
			"drop_location":drop_location,
			"vehicle_type":vehicle_type,
			"vehicle_sub_type":vehicle_sub_type,
			"month":month,"date":date,"time":time,
			"duration_book":duration_book,
			"paymentmode":paymentmode,
			"cityid":cityid,
			"amount":amount,
			"duration":duration,
			"discount_amount":discount_amount,
			"promo_amount":promo_amount,
			"payble_amount":payble_amount,
			"ap_code_final":ap_code_final},
	        beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	var json = JSON.parse(responce);
	        	if(json.status=='LoginRequired')
	        	{
	            	//$("#loginform").modal('show');
	            	//$("#final_book").html('Book Drive');
	            	window.location.href = path+"login";
	            }
	            else if(json.status=='success')
	            {
	            	if(json.payment_mode == 'Online')
	            	{
	            			$("#orderId").val(json.orderId);
	            			$("#orderAmount").val(json.payble_amount);	            			
	            			setTimeout(function(){ $("#cashfree_form_booking").submit(); }, 500);
	            			$("#final_book").html('Book Drive');
	            	}
	            	else
	            	{
	            		$("#new_book_id").html('BOOKING ID : '+json.booking_id);
	            		$("#booking_4").hide();
	            		$("#booking_5").show();
	            		$("#final_book").html('Book Drive');
	            	}
	            	
	            }
	        }
	    });	
});


// function phoneAuth(phone) {
// 	$("#phone_cp").parent().parent().parent().hide();
//     $.ajax({
//         type: 'POST',
//         url: path + 'Master/OTPSend',
//         data: {"mobile":phone},
//         beforeSend: function () {
            
//         },
//         success: function (responce) {

//         	if($("#your_name").val() == '')
//         	{        		
//             $("#name_box").show();
//         	}

//         	$("#otp_box").show();
//         	$("#final_signin_btn_box").show();
//         }
//     });
// }



function codeverify() {

	var phone = $("#phone_cp").val();
	var your_name = $("#your_name").val();
	var otp = $("#verificationCode").val();
	$("#your_name,#verificationCode").css('border-color','');
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
		var refer_code = '';
		$("#billing_phone").val(phone);
    	$("#billing_name").val(your_name);

    	$.ajax({
	      type: 'POST',
	      url: path + 'Master/SingUp',
	      data: {"mobile":phone,"name":your_name,"verificationCode":otp,"refer_code":refer_code},
	      beforeSend: function () {
	          
	      },
	      success: function (responce) 
	      {
	          	var json = JSON.parse(responce); 
	          	if(json.status == 'success')
	          	{
	          	  	$("#customerName").val(json.name);
	          	  	$("#customerEmail").val(json.email);
	          	    $("#customerPhone").val(json.phone);
	          		$("#loginform").modal('hide');
		        	setTimeout(function(){  $("#"+$("#click_ac").val()).trigger('click'); }, 700);
	          	}
	      	}
	  	});
	}    
}

function registeruser(your_name,phone)
{
	$.ajax({
        type: 'POST',
        url: path + 'Master/registerbooking',
        data: {"your_name":your_name,"phone":phone},
        beforeSend: function () {
        	
        },
        success: function (responce) {
            //var json = JSON.parse(responce);
            
        }
    });
}


function Logincheck()
{
	$.ajax({
        type: 'POST',
        url: path + 'Master/loginCheck',
        //data: {"your_name":your_name,"phone":phone},
        beforeSend: function () {
        	
        },
        success: function (responce) {
           return responce;
            
        }
    });
}

var firebaseConfig = {
      apiKey: "AIzaSyCLaEjcFryhzryaACNY0ApDo3ZXhc9RhBk",
      authDomain: "otpverification-1e927.firebaseapp.com",
      databaseURL: "https://otpverification-1e927.firebaseio.com",
      projectId: "otpverification-1e927",
      storageBucket: "otpverification-1e927.appspot.com",
      messagingSenderId: "847422823102",
      appId: "1:847422823102:web:f16aa511b294e0c0721cef"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.onload=function () {
    render();
  };

  function render() {
      window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container',
      {
        size: "invisible",
        callback: function(response) {
          console.log(response);
        }
      });
      recaptchaVerifier.render();
  }

function phoneAuth(mobilenumber) 
{
    //alert(mobilenumber);
        var number='+91'+mobilenumber;
        firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        //alert("Message sent");
        
    }).catch(function (error) {                    
        alert(error.message);
    });
}


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
            	timer(60);
            	phoneAuth(json.phone);
            }
            else
            {
            	$("#mobile_box").hide();
            	$("#name_box").show();
            	$("#otp_box").show();
            	$("#final_signin_btn_box").show();
            	timer(60);
            	phoneAuth(json.phone);
            }
        }
    });
});


$(document).on("click", "#cancel_booking", function() {
	var id =$(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'Master/CancelBooking',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'success')
        	{
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Accouunt Successfully Deleted..</div>');
        		//setTimeout(function(){window.location = path+"login"; }, 3000);
        		setTimeout(function(){window.location = path+"dashboard/booking"; }, 3000);
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>not deleted.</div>');
        	}
        	//$("#row_"+responce).remove();
        }
    });
});

$(document).on('click','#submit_request',function(){

	var fname = $("#fname").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var subject = $("#subject").val();
	var comments = $("#comments").val();
	
	var letters = /^[A-Za-z]+$/;
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var digit =/^[0-9]{3,10}$/;

	$("#regerror").html('');
	if(fname=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Full Name.</div>');
		$("#fname").focus();
		return false;
	}
	else if(email=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter email.</div>');
		$("#email").focus();
		return false;
	}
	else if(!regex.test(email))
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Please Enter Valid Email Address.</div>');
		$("#email").focus();
		return false;
	}
	else if(phone=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Mobil Number.</div>');
		$("#phone").focus();
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/SupportRequest',
	        data: {"fname":fname,"phone":phone,"email":email,"subject":subject,"comments":comments},
	        beforeSend: function () {
	        $("#regerror").html('<div class="alert alert-success">Please Wait..</div>');
	        			
	        },
	        success: function (responce) {
	        	if(responce == 'success')
	        	{
	        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Request Send Successfully..</div>');
	        		//setTimeout(function(){window.location = path+"login"; }, 3000);
							setTimeout(function(){window.location = path+"dashboard/support"; }, 3000);	        	}
	        	else
	        	{
	        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
	        	}
	        }
	    });
	}
});

$(document).on("click", "#rating", function() {
	var id =$(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'Master/Rating',
        data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'success')
        	{
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Accouunt Successfully Deleted..</div>');
        		//setTimeout(function(){window.location = path+"login"; }, 3000);
        		setTimeout(function(){window.location = path+"dashboard/booking"; }, 3000);
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>not deleted.</div>');
        	}
        	//$("#row_"+responce).remove();
        }
    });
});

$(document).on('click', '#add_review', function() {
	var bid =$(this).attr('fdi');
	var did =$(this).attr('did');
	$("#user_review").attr('fdi',bid);
	$("#user_review").attr('did',did);
  $('#reviewModal').modal('show');

});
$(document).on("click", "#user_review", function() {
	var id =$(this).attr('fdi');
	var did =$(this).attr('did');
	var uid =$(this).attr('uid');
	var comment =$("#comment").val();
	var star = $('.scoreNow').text();;
	if(star =='' || star == 0 )
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Please Select Your ratting.</div>');
		$("#rating").focus();
		return false;
	}
	else if(comment=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Please enter your  Message.</div>');
		$("#comment").focus();
		return false;
	}
	else
	{
		$(".review_hide_"+id).remove();
		$.ajax({
        type: 'POST',
        url: path + 'Master/UserReview',
        data: {"id":id,"uid":uid,"did":did,"star":star,"comment":comment},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'success')
        	{
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Add Review Successfully..</div>');
        		
        		setTimeout(function(){$('#reviewModal').modal('hide'); }, 2000);
        		//setTimeout(function(){window.location = path+"dashboard/booking"; }, 3000);
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>not deleted.</div>');
        	}
        }
    });
	}
});

$(document).on('click','.cl_modal,',function(){
	alert('ok');
	$('#reviewModal').modal('hide');
});
$(document).on('click','#replay_support',function(){

	var id=$("#id").val();
	$sid = id;
	var msg=$("#s_msg").val();
	var form_data = new FormData(); 
  
  form_data.append('msg', msg);
  form_data.append('id', id);
    
	$("#regerror").html('');
	if(msg=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Description.</div>');
		$("#msg").focus();
		return false;
	}
	
	else
	{
		$.ajax({
	        url: path + 'Master/ReplaySupport', // point to server-side PHP script 
	        dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data,                         
	        type: 'post',
	        beforeSend: function () {
        		$("#regerror").html('<div class="alert alert-success"> Please Wait..</div>');
	        		
       	 	},
	        success: function(responce){
	        	if(responce == 'success')
	        	{
	        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong> Send Replay Successfully..</div>');
	        		setTimeout(function(){window.location.href = path+"dashboard/requestReplay?key="+ $sid; },2000);
	        	}
	        	else
	        	{
	        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
	        	}
	        }
	    });
	}
});
$(document).on('click','#pay_invoice',function(e){
$("#cashfree_invoice_form").submit();
	
});

$(document).on('click','#pay_bussiness_invoice',function(e){
$("#cashfree_bussiness_invoice_form").submit();
	
});

$(document).on("click", "#file_invoice_download", function() {
	var filename =$(this).attr('fid');
	alert(filename);
	$.ajax({
        type: 'POST',
        url: path + 'Master/InvoiceDownload',
        data: {"filename":filename},
        beforeSend: function () {
        	$("#regerror").html('<div class="alert alert-success">Please Wait...</div>');
	        		
        },
        success: function (responce) {
        	//$("#row_"+responce).remove();
        	window.open(path+responce, '_blank');
        }
    });
}); 




$(document).on("click", "#complete_next", function() {
	$("#complete_previous").prop("disabled", false).html('<< Previous');	
		$.ajax({
	        type: 'POST',
	        url: path + 'Dashboard/CompleteNext',
	       // data: {"id":id},
	        beforeSend: function () {
	        	$("#complete_next").html('Loading...');
	        },
	        success: function (responce) {
	        	if(responce == 'no-record')
	        	{
	        		$("#complete_next").prop("disabled", true).html('No More Record Found.');
	        	}
	        	else
	        	{
	        		$("#complete_next").html('Next >>');
	        		$('#bookings_complete').html(responce);
	        	}
	        	
	        }
	    });
});
$(document).on("click", "#complete_previous", function() {
		$("#complete_next").prop("disabled", false).html('Next >>');
		$.ajax({
	        type: 'POST',
	        url: path + 'Dashboard/CompletePrevious',
	       // data: {"id":id},
	        beforeSend: function () {
	        	$("#complete_previous").html('Loading...');
	        },
	        success: function (responce) {
	        	if(responce == 'no-record')
	        	{
	        		$("#complete_previous").prop("disabled", true).html('No More Record Found.');
	        	}
	        	else
	        	{
	        		$("#complete_previous").html('<< Previous');
	        		$('#bookings_complete').html(responce);
	        	}
	        	//$('tbody').html(responce);
	        }
	    });
});

$(document).on("click", "#cancel_next", function() {
	$("#cancel_previous").prop("disabled", false).html('<< Previous');	
		$.ajax({
	        type: 'POST',
	        url: path + 'Dashboard/CancelNext',
	       // data: {"id":id},
	        beforeSend: function () {
	        	$("#cancel_next").html('Loading...');
	        },
	        success: function (responce) {
	        	if(responce == 'no-record')
	        	{
	        		$("#cancel_next").prop("disabled", true).html('No More Record Found.');
	        	}
	        	else
	        	{
	        		$("#cancel_next").html('Next >>');
	        		$('#bookings_cancel').html(responce);
	        	}
	        	
	        }
	    });
});
$(document).on("click", "#cancel_previous", function() {
		$("#cancel_next").prop("disabled", false).html('Next >>');
		$.ajax({
	        type: 'POST',
	        url: path + 'Dashboard/CancelPrevious',
	       // data: {"id":id},
	        beforeSend: function () {
	        	$("#cancel_previous").html('Loading...');
	        },
	        success: function (responce) {
	        	if(responce == 'no-record')
	        	{
	        		$("#cancel_previous").prop("disabled", true).html('No More Record Found.');
	        	}
	        	else
	        	{
	        		$("#cancel_previous").html('<< Previous');
	        		$('#bookings_cancel').html(responce);
	        	}
	        }
	    });
});




$(document).on('click','#resend_otp',function(){	
	$("#Sign-in").trigger('click');
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




