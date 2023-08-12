$(document).on('change','#accept_booking',function(){
	if(this.checked) 
	{
      var status = 'on';
    }
    else
    {
    	var status = 'off';
    }

    $.ajax({
    type: 'POST',
        url: path + 'Master/Bookingaccept',
        data: {"status":status},
       	beforeSend: function () {
        	
        },
        success: function (responce) {
        	
        }
    });
});
$(document).on('click','#update_rider_profile',function(){
	var id=$("#id").val();
	var city_id=$("#city_id").val();
	var manager_id=$("#manager_id").val();
	var fname=$("#fname").val();
	var mobile=$("#mobile").val();
	var email=$("#email").val();
	var address=$("#address").val();
	var state=$("#state").val();
	var zipcode=$("#zipcode").val();
	var status=$("#status").val();
	
	var profile = $('#profile').prop('files')[0];
   	var form_data = new FormData(); 

    form_data.append('id', id);
    form_data.append('city_id', city_id);
    form_data.append('manager_id', manager_id);
    form_data.append('fname', fname);
    form_data.append('mobile', mobile);
    form_data.append('email', email);
    form_data.append('address', address);
    form_data.append('state', state);
    form_data.append('zipcode', zipcode);
    form_data.append('status', status);
    form_data.append('profile', profile);
	//console.log(form_data);

	var letters = /^[A-Za-z\s]+$/;
	var emailcheck = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var digit =/^[0-9]{3,10}$/;

	$("#regerror").html('');
	if(city_id =='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Select City.</div>');
		$("#city_id").focus();
		return false;
	}
	else if(manager_id =='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Select Manager.</div>');
		$("#manager_id").focus();
		return false;
	}
	else if(fname=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Name.</div>');
		$("#name").focus();
		return false;
	}
	else if(mobile=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Mobil Number.</div>');
		$("#mobile").focus();
		return false;
	}
	else if(!mobile.match(digit))
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Please input Number only.</div>');
		$("#mobile").focus();
		return false;
	}
	else if(email=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Email.</div>');
		$("#email").focus();
		return false;
	}
	else if(!emailcheck.test(email))
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Please Enter Valid Email Address.</div>');
		$("#email").focus();
		return false;
	}
	else if(address=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Address.</div>');
		$("#address").focus();
		return false;
	}
	else if(state=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter State.</div>');
		$("#state").focus();
		return false;
	}
	else if(zipcode=='')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Zipcode.</div>');
		$("#zipcode").focus();
		return false;
	}
	else
	{
		$.ajax({
	        url: path + 'Master/UpdateRiderProfile', // point to server-side PHP script 
	        dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data,                         
	        type: 'post',
	        success: function(responce){
	        	if(responce == 'success')
	        	{
	        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong> Updated Data Successfully..</div>');
	        		setTimeout(function(){window.location.href = path+'profile'; }, 2000);
	        	}
	        	else
	        	{
	        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
	        	}
	        }
	    });
	}
});

$(document).on('click','#update_rider_documents',function(){
	
	var url = $(this).attr('rk');
	var id=$("#id").val();
	$rk = url;
	var file_data1 = $('#admin-img').prop('files')[0]; 
	var file_data2 = $('#admin-img1').prop('files')[0]; 
	var file_data3 = $('#admin-img2').prop('files')[0]; 
	var file_data4 = $('#admin-img3').prop('files')[0]; 
	var file_data6 = $('#admin-img5').prop('files')[0]; 
	var file_data7 = $('#admin-img6').prop('files')[0]; 
   	var form_data = new FormData(); 

    form_data.append('id', id);
    form_data.append('file1', file_data1);
    form_data.append('file2', file_data2);
    form_data.append('file3', file_data3);
    form_data.append('file4', file_data4);
    form_data.append('file6', file_data6);
    form_data.append('file7', file_data7);
	//console.log(form_data);

	if(url == '')
	{
		$("#regerrors").html('<div class="alert alert-danger"><strong>Opps!</strong> Please Check.</div>');
		$("#url").focus();
		return false;
	}
	else
	{
		$.ajax({
	        url: path + 'Master/UpdateRiderDocument', // point to server-side PHP script 
	        dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data,                         
	        type: 'post',
	        success: function(responce){
	        	if(responce == 'success')
	        	{
	        		$("#regerrors").html('<div class="alert alert-success"><strong>Success! </strong> Updated Data Successfully..</div>');
	        		setTimeout(function(){window.location.href = path+"profile"; }, 2000);
	        	}
	        	else
	        	{
	        		$("#regerrors").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
	        	}
	        }
	    });
	}
});

$(document).on('click','#start_ride',function(){

	var id = $(this).attr('fdi');
	$.ajax({
        type: 'POST',
        url: path + 'Master/StartRide',
        data: {"id":id},
       	beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'success')
        	{
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Ride Start Successfully..</div>');
        		setTimeout(function(){window.location.href = path+"rides"; }, 2000);
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
        	}
        }
    });
});	
$(document).on('click', '#ride_end', function() {
	var id =$(this).attr('fdi');
	var payment_mode =$(this).attr('payment_mode');
	var amount = $(this).attr('amount');
	
	if(payment_mode == 'offline' || payment_mode == 'Offline')
	{
		$.ajax({
        type: 'POST',
	        url: path + 'Master/ExtraChargeCalculation',
	        data: {"id":id},
	       	beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	$("#pc").text('₹ '+responce);
	        }
	    });
		$("#pay_status").show();
	}
	else
	{
		$("#pay_status").hide();
	}
	$("#end_ride").attr('fdi',id);
	$("#end_ride").attr('payment_mode',payment_mode);
    $('#deleteModal').modal('toggle');

});
$(document).on('click','#end_ride',function(){
	$("#pay_status_error").text('');
	var id = $(this).attr('fdi');
	var payment_mode = $(this).attr('payment_mode');
	var pay_status = $("#pay_status").val();
	if(payment_mode == 'offline')
	{
		if(pay_status == '')
		{
			$("#pay_status_error").text('Please Select Payment mode.');
			return false;
		}
	}
	$.ajax({
        type: 'POST',
        url: path + 'Master/EndRide',
        data: {"id":id,"pay_status":pay_status},
       	beforeSend: function () {
        	
        },
        success: function (responce) {
        	if(responce == 'success')
        	{
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Ride End Successfully..</div>');
        		$("#cancel").trigger('click');
        		setTimeout(function(){window.location.href = path+"rides"; }, 1500);
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
        	}
        }
    });
});	
$(document).on('click','#time_in',function(){
	
	//$("#time_in").html('Loading...').prop('disabled',true);
	$.ajax({
        type: 'POST',
        url: path + 'Master/LoginTime',
        //data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	var json = JSON.parse(responce);
        	if(json.status == 'success')
        	{   
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Login Successfully..</div>');
        		setTimeout(function(){$("#regerror").html('');}, 2000);
        		$("#time_out").show();
        		$("#time_in").hide();
        		//$("#time_in").html('Success').prop('disabled',true);
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+json.msg+'</div>');
        		//$("#time_in").html('Success').prop('disabled',true);
        		$("#time_out").show();
        		$("#time_in").hide();
        	}
        }
    });
});
$(document).on('click','#time_out',function(){
	
	//$("#time_in").html('Loading...').prop('disabled',true);
	$.ajax({
        type: 'POST',
        url: path + 'Master/LogoutTime',
        //data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	var json = JSON.parse(responce);
        	if(json.status == 'success')
        	{   
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Logout Successfully..</div>');
        		setTimeout(function(){$("#regerror").html('');}, 2000);
        		$("#time_in").show();
        		$("#time_out").hide();
        		//$("#time_in").html('Success').prop('disabled',true);
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+json.msg+'</div>');
        		//$("#time_in").html('Success').prop('disabled',true);
        		$("#time_in").show();
        		$("#time_out").hide();
        	}
        }
    });
});

$(document).on('click','#week_off',function(){

	var date = $('#w_date').val();
	
	if(date == '')
	{
		$("#regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Select date.</div>');
		$("#date").focus();
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/WeekOf',
	        data: {"date":date},
	        beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	var json = JSON.parse(responce);
	        	if(json.status == 'success')
	        	{   
	        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Day Off Successfully..</div>');
	        		setTimeout(function(){$("#regerror").html('');}, 2000);
	        		$("#w").html(json.w)
	        	}
	        	else
	        	{
	        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+json.msg+'</div>');
	        		setTimeout(function(){$("#regerror").html('');}, 2000);
	        	}
	        }
	    });
	}
});

function getCalendar(year,month)
{
	$.ajax({
        type: 'POST',
        url: path + 'Master/GtCal',
        data: {"year":year,"month":month},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	$("#get_calendar").html(responce);
        }
    });
}

$(document).on('click','#privious',function(){
	//alert('okk');
	//$("#time_in").html('Loading...').prop('disabled',true);
	var $id = $(this).val();
	//alert($id);
	$.ajax({
        type: 'POST',
        url: path + 'Master/PriviousCalendar',
        //data: {"id":id},
        beforeSend: function () {
        	
        },
        success: function (responce) {
        	//var json = JSON.parse(responce);
        	if(responce == 'success')
        	{   
        		$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong>Your Logout Successfully..</div>');
        		setTimeout(function(){$("#regerror").html('');}, 2000);
        		$("#get_calendar").html(responce)
        	}
        	else
        	{
        		$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
        		setTimeout(function(){$("#regerror").html('');}, 2000);
        	}
        }
    });
});
$(document).on('click','#week',function(){
	var dat = $('#week_off').show();
});
$(document).on('click','#update_rider_bank',function(){
	var url = $(this).attr('rk');
	$rk = url;
	var id = $("#id").val();
	var bank_holder = $("#bank_holder").val();
	var bank_name = $("#bank_name").val();
	var account_no = $("#account_no").val();
	var ifsc = $("#ifsc").val();
	var upi_id = $("#upi_id").val();
	
	
	var form_data = new FormData(); 

	form_data.append('id', id);
	form_data.append('bank_holder', bank_holder);
	form_data.append('bank_name', bank_name);
	form_data.append('account_no', account_no);
	form_data.append('ifsc', ifsc);
  	form_data.append('upi_id', upi_id);
  
	//console.log(form_data);

	var letters = /^[A-Za-z\s]+$/;
	var emailcheck = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var digit =/^[0-9]{3,10}$/;

	$("#regerror").html('');
	if(bank_holder=='')
	{
		$("#b_regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Bank Holder.</div>');
		$("#bank_holder").focus();
		return false;
	}
	else if(bank_name=='')
	{
		$("#b_regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Bank Name.</div>');
		$("#bank_name").focus();
		return false;
	}
	else if(account_no=='')
	{
		$("#b_regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter Account Number.</div>');
		$("#account_no").focus();
		return false;
	}
	else if(ifsc == '')
	{
		$("#b_regerror").html('<div class="alert alert-danger"><strong>Opps!</strong> Enter IFSC.</div>');
		$("#ifsc").focus();
		return false;
	}
	else
	{
		$.ajax({
	        url: path + 'Master/UpdateRiderBankDetails', // point to server-side PHP script 
	        dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data,                         
	        type: 'post',
	        success: function(responce){
	        	if(responce == 'success')
	        	{
	        		$("#b_regerror").html('<div class="alert alert-success"><strong>Success! </strong> Updated Data Successfully..</div>');
	        		setTimeout(function(){window.location.href = path+$rk; }, 2000);
	        	}
	        	else
	        	{
	        		$("#b_regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
	        	}
	        }
	    });
	}
});

$(document).on('click','#salary_id',function(){
	var t_salary = $("#t_salary").text();
	var a_salary = $("#a_salary").text();
	var form_data = new FormData(); 

	form_data.append('t_salary', t_salary);
	form_data.append('a_salary', a_salary);
	
	$.ajax({
        url: path + 'Master/SalarySlip', // point to server-side PHP script 
        dataType: 'text',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(responce){

        	$("#regerror").html(responce);
        	//alert(responce);
        	// if(responce == 'success')
        	// {
        	// 	$("#regerror").html('<div class="alert alert-success"><strong>Success! </strong> Updated Data Successfully..</div>');
        	// 	setTimeout(function(){window.location.href = path+"payment"; }, 2000);
        	// }
        	// else
        	// {
        	// 	$("#regerror").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
        	// }
        }
    });
});

$(document).on('click', '#add_withdraw', function() {
	//var id =$(this).attr('fdi');

	$('#WithdrawModal').modal('toggle');

});
$(document).on('click','#withdraw_add',function(){

	var pay_mode = $("#pay_mode").val();
	var p_amt = $("#p_amt").val();
	if(pay_mode == '')
	{
		$("#regerror_w").html('<div class="alert alert-danger"><strong>Opps!</strong> Select Payment Mode.</div>');
		$("#pay_mode").focus();
		return false;
	}
	else if(p_amt == '')
	{
		$("#regerror_w").html('<div class="alert alert-danger"><strong>Opps!</strong> Please Enter Amount.</div>');
		$("#p_amt").focus();
		return false;
	}
	else if(p_amt < 100)
	{
		$("#regerror_w").html('<div class="alert alert-danger"><strong>Opps!</strong> Please Enter Minimum 100.</div>');
		$("#p_amt").focus();
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/Withdraw',
	        data: {"pay_mode":pay_mode,"p_amt":p_amt},
	       	beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	if(responce == 'success')
	        	{
	        		$("#regerror_w").html('<div class="alert alert-success"><strong>Success! </strong>Add Request Successfully..</div>');
	        		$("#wcancel").trigger('click');
	        		//setTimeout(function(){window.location.href = path+"payment"; }, 2000);
	        	}
	        	else
	        	{
	        		$("#regerror_w").html('<div class="alert alert-danger"><strong>Opps! </strong>'+responce+'</div>');
	        	}
	        }
	    });
	}
});	


// New JS

$(document).on('click', '#change_bussness_password', function() {	
	var current_pass = $("#current_pass").val();
	var pass = $("#pass").val();
	var c_pass = $("#c_pass").val();
	if(current_pass == '')
	{
		$("#error_pass").html('<div class="alert alert-danger">Please enter current password.</div>');
		$("#current_pass").focus();
		return false;
	}
	else if(pass == '')
	{
		$("#error_pass").html('<div class="alert alert-danger">Password must be required.</div>');
		$("#pass").focus();
		return false;
	}
	else if(pass.length < 8)
	{
		$("#error_pass").html('<div class="alert alert-danger">Password must be 8 characters or longer</div>');
		$("#pass").focus();
		return false;
	}
	else if(c_pass == '')
	{
		$("#error_pass").html('<div class="alert alert-danger">Confirm Password must be required.</div>');
		$("#c_pass").focus();
		return false;
	}
	else if(pass != c_pass)
	{
		$("#error_pass").html('<div class="alert alert-danger">Password and Confirm password not match.</div>');
		$("#c_pass").focus();
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/Changepassword',
	        data: {"current_pass":current_pass,"pass":pass,"c_pass":c_pass},
	       	beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	var json = JSON.parse(responce);
	        	if(json.status == 'success')
	        	{
	        		$("#error_pass").html('<div class="alert alert-success"><strong>Success! </strong>Your password has been changed.</div>');
	        	}
	        	else
	        	{
	        		$("#error_pass").html('<div class="alert alert-danger"><strong>Opps! </strong>'+json.message+'</div>');
	        	}
	        }
	    });
	}
});

$(document).on('click','#get_attadance',function(){

	var emp_id = $("#emp_id").val();
	var emp_month = $("#emp_month").val();
	var emp_year = $("#emp_year").val();
	$("#error").html('');
	if(emp_id == '')
	{
		$("#emp_id").focus();
		$("#error").html('<div class="alert alert-danger">Please select employee.</div>');
		return false;
	}
	else if(emp_month == '')
	{
		$("#emp_month").focus();
		$("#error").html('<div class="alert alert-danger">Please select month.</div>');
		return false;
	}
	else if(emp_year == '')
	{
		$("#emp_year").focus();
		$("#error").html('<div class="alert alert-danger">Please select year.</div>');
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/getdriverattadance',
	        data: {"emp_id":emp_id,"emp_month":emp_month,"emp_year":emp_year},
	       	beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	$("#attadance_div").html(responce);
	        }
	    });
	}
});

$(document).on('click','#update_profile_business',function(){
	
	var bname = $("#bname").val();
	var business_type = $("#business_type").val();
	var fname = $("#fname").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var address = $("#address").val();
	$("#error").html('');
	if(bname == '')
	{
		$("#bname").focus();
		$("#error").html('<div class="alert alert-danger">Please enter business name.</div>');
		return false;
	}
	else if(business_type == '')
	{
		$("#business_type").focus();
		$("#error").html('<div class="alert alert-danger">Please select Business type.</div>');
		return false;
	}
	else if(fname == '')
	{
		$("#fname").focus();
		$("#error").html('<div class="alert alert-danger">Please enter your fullname.</div>');
		return false;
	}
	else if(phone == '')
	{
		$("#phone").focus();
		$("#error").html('<div class="alert alert-danger">Please enter phone number.</div>');
		return false;
	}
	else if(phone.length != 10)
	{
		$("#phone").focus();
		$("#error").html('<div class="alert alert-danger">Please enter valid phone number.</div>');
		return false;
	}
	else if(email == '')
	{
		$("#email").focus();
		$("#error").html('<div class="alert alert-danger">Please enter email address.</div>');
		return false;
	}
	else if(address == '')
	{
		$("#address").focus();
		$("#error").html('<div class="alert alert-danger">Please enter your address.</div>');
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/Updateprofile',
	        data: {"bname":bname,"business_type":business_type,"fname":fname,"phone":phone,"email":email,"address":address},
	       	beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	var json = JSON.parse(responce);
	        	if(json.status == 'success')
	        	{
	        		$("#error").html('<div class="alert alert-success"><strong>Success! </strong>Your Profile details has been update.</div>');
	        	}
	        	else
	        	{
	        		$("#error").html('<div class="alert alert-danger"><strong>Opps! </strong>'+json.message+'</div>');
	        	}
	        }
	    });
	}
});

$(document).on('click','#write_a_review',function(){
	var id = $(this).attr('fdi');
	$("#team_id").val(id);
});

$(document).on('click','#submit_review',function(){
	var id = $("#team_id").val();
	var remark = $("#remark").val();
	var ratting =$("input[name='rating']:checked").val();
	if(ratting == 0)
	{
		$("#error_review").html('<div class="alert alert-danger">Please select review start</div>');
		return false;
	}
	else if(remark == '')
	{
		$("#error_review").html('<div class="alert alert-danger">Please write a remark</div>');
		return false;
	}
	else
	{
		$.ajax({
	        type: 'POST',
	        url: path + 'Master/Writereview',
	        data: {"id":id,"remark":remark,"ratting":ratting},
	       	beforeSend: function () {
	        	
	        },
	        success: function (responce) {
	        	var json = JSON.parse(responce);
	        	if(json.status == 'success')
	        	{
	        		$("#error_review").html('<div class="alert alert-success"><strong>Success! </strong>Your review has been submited.</div>');
	        		setTimeout(function(){

	        			$("#basicModal").modal('hide');
	        			$("#remark").val('');
	        			$("#error_review").html('');

	        		 }, 1500);
	        		
	        	}
	        	else
	        	{
	        		$("#error_review").html('<div class="alert alert-danger"><strong>Opps! </strong>'+json.message+'</div>');
	        	}
	        }
	    });
	}
});