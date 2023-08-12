
var socket = io.connect('https://drivars.com:3000',{
  transports: ['websocket', 'polling', 'flashsocket'],rejectUnauthorized: false,
});

//var socket = io.connect('https://drivars.com:3000',{rejectUnauthorized: false});
var server_connected = 0;
socket.on('connect', function () {
    console.log('connected');
    server_connected = 1;
    socket.on('admin_notification_push', function (data) 
    {
        if(path === '/v2/admin/')
        {
            var current_count = $("#notification_count").text();
            if(current_count == '' || current_count == 0)
            {
                var counter = 1;
            }
            else
            {
                var counter = parseInt(current_count)+1;
            }
            $("#notification_count").text(counter);
            $("#get_live_noti").prepend('<li> <div class="timeline-panel"> <div class="media-body"> <h6 class="mb-1">'+data.noti_message+'</h6> <small class="d-block">'+data.time+'</small> </div></div></li>');
        }
    });
    socket.on('BookingData', function (data) {
        if(path === '/v2/admin/')
        {
            $("#successtoast").trigger('click');
            $(".booking_tbl_soket tbody").prepend('<tr><td><i class="fa fa-circle" style="color:#13ad6b;"></i>&nbsp;&nbsp;<a href="javascript:void(0)" controller="booking/view" id="back_page" key="'+data.booking_id_encode+'">'+data.booking_id+'</a></td><td><b>Name :</b>'+data.name+'<b><br>Phone :</b>'+data.phone+'</td><td><b>City :</b>'+data.city+'<br><b>Ride :</b>'+data.ride_type+'</td><td>'+data.Journey_date+'</td><td><label class="badge light badge-danger">Pending</label></td><td><a class="badge light badge-info">Waiting Drivers</a></td><td>'+data.action_btn+'</td></tr>');
                var todaycount = $("#count_today").html();
                $("#count_today").html(parseInt(todaycount)+1);
                toastr.success("<b>Name : </b>"+data.name+"<br><b>Ride Type : </b>"+data.ride_type+"<br><b>City : </b>"+data.city+"<br><b>Origin : </b>"+data.origin+"<br><b>Destination : </b>"+data.destination+" <br><b>Journey Date : </b>"+data.Journey_date+"<br>", "New Booking ID : "+data.booking_id+"", {
                    timeOut: 10000,
                    enableSounds: true,
                    enableSounds: true,
                    closeButton: !0,
                    debug: !1,
                    newestOnTop: !0,
                    progressBar: !0,
                    positionClass: "toast-bottom-right",
                    preventDuplicates: !0,
                    onclick: null,
                    showDuration: "3000",
                    hideDuration: "10000",
                    extendedTimeOut: "10000",
                    showEasing: "swing",
                    hideEasing: "linear",
                    showMethod: "fadeIn",
                    hideMethod: "fadeOut",
                    tapToDismiss: !1,
                    sounds: {
                    info: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233294/info.mp3",
                    // path to sound for successfull message:
                    success: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233524/success.mp3",
                    // path to sound for warn message:
                    warning: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/warning.mp3",
                    // path to sound for error message:
                    error: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233574/error.mp3",
                    },
                });
        }
    });

    socket.on('admin_and_manager_business_push', function (data) 
    {
        if(path === '/v2/admin/' || path === '/v2/manager/')
        {
            var msg = 'City : '+data.city_name+' Customer name : '+data.cname+' Inquiry for : '+data.inquiry_for;
            toastr_notification_inq('New Business Inquery',msg);
        }
    });

    $(document).on('click','#send_message',function(){
        var connection_id = $("#connection_id").val();
        var uid = $("#uid").val();
        var utype = $("#utype").val();
        var user_message = $("#user_message").val();
        if(user_message == '')
        {
            $("#user_message").focus();
            return false;
        }
        else
        { 
            $.ajax({
                type: 'POST',
                url: path + 'Master/SendChatMsg',
                data: {"connection_id":connection_id,"uid":uid,"utype":utype,"user_message":user_message},
                beforeSend: function () {
                    
                },
                success: function (responce) {
                    var json = JSON.parse(responce);
                    if(json.status == 'success')
                    {
                        $("#user_message").val('');
                        $(".chatbox_"+connection_id).append('<div class="message_right col-lg-8 offset-4"><p>'+json.message+'</p><small>'+json.time+' Today</small></div>');                       
                        $('.chatbox_'+json.connection_id).scrollTop(1000000);
                        socket.emit('Sentadmin', json);
                    }
                }
            });
        }
        
    });

    $(document).on('click','#send_message_by_admin',function(){
        var connection_id = $("#connection_id").val();
        var uid = $("#uid").val();
        var utype = $("#utype").val();
        var user_message = $("#user_message").val();
        if(user_message == '')
        {
            $("#user_message").focus();
            return false;
        }
        else
        { 
            $.ajax({
                type: 'POST',
                url: path + 'Livesupport/SendChatMsg',
                data: {"connection_id":connection_id,"uid":uid,"utype":utype,"user_message":user_message},
                beforeSend: function () {
                    
                },
                success: function (responce) {
                    var json = JSON.parse(responce);
                    if(json.status == 'success')
                    {
                        $("#user_message").val('');
                        $(".admin_conn_"+json.connection_id).append('<div class="message_right col-lg-8 offset-4"><p>'+json.message+'</p><small>'+json.time+' Today</small></div>');
                        
                        $('.admin_conn_'+json.connection_id).scrollTop(1000000);
                        socket.emit('Sentuser', json);
                    }
                }
            });
        }
        
    });

    $(document).on('keypress','#user_message',function(e){
        var keyCode = e.which;
        if (keyCode == 13) 
        {
            $("#send_message").click(); 
            $("#send_message_by_admin").click();             
        }
    });   

    $(document).on('click','.chat_li ul li',function(){
        var connection_id = $(this).attr('fdi');
        $(".chat_li ul li").removeClass('active');
        $(this).addClass('active');
        $("#unread_count_"+connection_id).text('');
        $connection_id = connection_id;
        $.ajax({
            type: 'POST',
            url: path + 'Livesupport/Getmsg',
            data: {"connection_id":connection_id},
            beforeSend: function () {
                
            },
            success: function (responce) {
                $("#get_messages").html(responce);
                $('.admin_conn_'+$connection_id).scrollTop(1000000);
            }
        });        
    });

    socket.on('user_message_push', function (data) 
    {
        if($('.chatbox_'+data.connection_id).is(':visible'))
        {
            $(".chatbox_"+data.connection_id).append('<div class="message_left col-lg-8"><p>'+data.message+'</p><small>'+data.time+' Today</small></div>');        
            $('.chatbox_'+data.connection_id).scrollTop(1000000);
        }
        else
        {
            toastr_notification('New Support message',data.message);

        }
        
    });

    

    socket.on('admin_message_push', function (data) 
    {
        if($('.admin_conn_'+data.connection_id).is(':visible'))
        {
            $(".admin_conn_"+data.connection_id).append('<div class="message_left col-lg-8"><p>'+data.message+'</p><small>'+data.time+' Today</small></div>');
            $('.admin_conn_'+data.connection_id).scrollTop(1000000);
        }
        else
        {
            if(!$('#unread_count_'+data.connection_id).is(':visible'))
            {
                toastr_notification('Support message',data.message);
                $.ajax({
                    type: 'POST',
                    url: path + 'Master/SendChatNotification',
                    data: {"connection_id":data.connection_id,"user_message":data.message},
                    beforeSend: function () {
                        
                    },
                    success: function (responce) {
                        var c = $("#notification_count").text();
                        $("#notification_count").text(parseInt(c)+1);
                        //var json = JSON.parse(responce);                        
                    }
                });
            }
            else
            {
                var count = $("#unread_count_"+data.connection_id).text();
                if(count == '' || count == 0)
                {
                    $("#unread_count_"+data.connection_id).text('1');
                }
                else
                {
                    $("#unread_count_"+data.connection_id).text((parseInt(count)+1));
                }
                $(".connection_"+data.connection_id).prependTo(".chat_li ul");
            }           
            
        }
        
    });

    

    function toastr_notification(title,message)
    {
        var options = {
        autoClose: true,
        progressBar: true,
        enableSounds: true,
        sounds: {

        info: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233294/info.mp3",
        // path to sound for successfull message:
        success: path+"audio/mixkit-police-siren-us-1643.mp3",
        // path to sound for warn message:
        warning: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/warning.mp3",
        // path to sound for error message:
        error: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233574/error.mp3",
        },
        };

        var toast = new Toasty(options);
        toast.configure(options);
        toast.success("");
        toastr.success(message, title, {
            positionClass: "toast-bottom-right",
            closeButton: !0,
            debug: !1,
            onclick: null,
            showDuration: "3000000",
            hideDuration: "10000000",
            extendedTimeOut: "100000000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            tapToDismiss: !1,
        });
    }

    function toastr_notification_inq(title,message)
    {
        var options = {
        autoClose: true,
        progressBar: true,
        enableSounds: true,
        sounds: {

        info: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233294/info.mp3",
        // path to sound for successfull message:
        success: path+"audio/business_inq_sound.wav",
        // path to sound for warn message:
        warning: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233563/warning.mp3",
        // path to sound for error message:
        error: "https://res.cloudinary.com/dxfq3iotg/video/upload/v1557233574/error.mp3",
        },
        };

        var toast = new Toasty(options);
        toast.configure(options);
        toast.success("");
        toastr.success(message, title, {
            positionClass: "toast-bottom-right",
            closeButton: !0,
            debug: !1,
            onclick: null,
            showDuration: "3000000",
            hideDuration: "10000000",
            extendedTimeOut: "100000000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            tapToDismiss: !1,
        });
    }

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
                socket.emit('send_to_server_business_noti', json);
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

    $(document).on('click','#test_tpostor',function(){
        toastr_notification_inq('test','test_message');
    });

});

