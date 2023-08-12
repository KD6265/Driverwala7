mapboxgl.accessToken = 'pk.eyJ1IjoiZHJpdmFycy1jbG91ZHM0NCIsImEiOiJja3VyeG94aWYwaW80MndvMnVkNnU2NXNsIn0.CCUAWYSOfbZcHkq4bGFWIg';

            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
                center: [20.5937, 78.9629],
                zoom: 11
            });

            
             
            var pick_up_forntinput = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder:'Pickup Location',
                countries: 'in',
                // filter: function (item) {
                //   console.log(item.place_name);
                //   return item.context.some((i) => {         
                //   return (item.place_name.match(cp_city_name));
                //   });
                // },
                //bbox: [72.427914,22.815034,72.842934,23.164656],
            });

            pick_up_forntinput.on('result', e => {
                //console.log(e.result);
               
                $("#pickup_point").val(e.result.place_name);                
                $("#pickup_cityLatLng").val(e.result.center[0]+','+e.result.center[1]);
                mycustomRout();
            });
            
            document.getElementById('pick_up_forntinput').appendChild(pick_up_forntinput.onAdd(map));

            var dropp_off_forntinput = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                placeholder:'Drop Location',
                countries: 'in',
            });

            dropp_off_forntinput.on('result', e => {
                $("#drop_point").val(e.result.place_name);
                $("#drop_cityLatLng").val(e.result.center[0]+','+e.result.center[1]);
                mycustomRout();
            });
             
            document.getElementById('dropp_off_forntinput').appendChild(dropp_off_forntinput.onAdd(map)); 

            

            // San Francisco
        

    directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'driving',
      interactive: false,
      controls: {
        inputs: false,
        instructions: true,
        profileSwitcher: true
      }
    });
    map.addControl(directions);


function changeDirections(ori,dest) 
{ 
    directions.setOrigin(ori);
    //let bounds = new mapboxgl.LngLatBounds();
    //bounds.extend([lon, lat]);
    //bounds.extend([lonDest, latDest]);
    directions.setDestination(dest);
    //map.fitBounds(bounds, {padding: 90, duration: 1000});
}

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    return h + ':' + m + ':' + s;
}

function calculateRoute(geomFrom, geomto) 
{               
    var lngFrom = geomFrom[0];
    var latFrom = geomFrom[1];

    var lngTo =geomto[0];  
    var latTo = geomto[1];
    //console.log('https://api.mapbox.com/directions/v5/mapbox/driving/' + lngFrom + ',' + latFrom + ';' + lngTo + ',' + latTo + '?access_token='+mapboxgl.accessToken+'&geometries=geojson');
    $.get('https://api.mapbox.com/directions/v5/mapbox/driving/' + lngFrom + ',' + latFrom + ';' + lngTo + ',' + latTo + '?access_token='+mapboxgl.accessToken+'&geometries=geojson', 
        function( data ) {           
            var dur = convertMS(Math.round(data.routes[0].duration));
             
            var km = Math.round(data.routes[0].distance/1000);

            var trip = $("#trip-btn a.btn-dark").attr('fdi');            
            if(trip == 'oneway') 
            {  
                $("#total_km").val(km);
                
				// if(km >= 51)
				// {					
				// 	var es_amount = km*per_km_price+150;
				// }
				// else
				// {					
				// 	var es_amount = km*per_km_price+base_price;
				// }
    //             //var es_amount = km*perkm;
    //             $("#estimate_amount").html('₹ '+es_amount.toFixed(2));
    //             $("#total").html('₹ '+es_amount.toFixed(2));
    //             $("#estimate_amount_val").val(es_amount.toFixed(2));
    //             var discount = (es_amount*5)/100;
    //             var pay = es_amount-discount;
    //             $("#discount_amount").val(discount.toFixed(2));
    //             $("#payble_amount").val(pay.toFixed(2));
    //             $("#online_discount_price").html('₹ '+discount.toFixed(2));
    //             $("#total").html('₹ '+pay.toFixed(2));
    //             $("#duration").val(dur);
            } 
        });  
}

function mycustomRout()
{
    
    var origen_text = $("#pickup_point").val();
    var origen_lat = $("#pickup_cityLatLng").val();

    var desc_text = $("#drop_point").val();
    var desc_lat = $("#drop_cityLatLng").val();
    if(origen_lat != '' && desc_lat != '')
    {
        var one = origen_lat.split(",");
        var two = desc_lat.split(",");

        geomFrom = [];
        geomto = [];
        geomFrom.push(one[0]);
        geomFrom.push(one[1]);

        geomto.push(two[0]);
        geomto.push(two[1]);
        
        calculateRoute(geomFrom, geomto);
        changeDirections(origen_text,desc_text);
    }
}



$(document).on('keyup', '#pick_up_forntinput', function() {
    $('div#dropp_off_forntinput').hide();
});

$(document).on('click', '#get-mylocation2', function() {
    mapboxgl.accessToken = mapboxgl.accessToken;
    navigator.geolocation.getCurrentPosition(successlocation,errorlocarion,
    {
        enableHighAccuracy:true
    });
});

function successlocation(position)
{
    console.log(position);
    $.get('https://api.tiles.mapbox.com/v4/geocode/mapbox.places-v1/'+position.coords.longitude+','+position.coords.latitude+'.json?access_token='+mapboxgl.accessToken, 
    function( data ) 
    {
        console.log(data.features[0].text);
    });
}

function errorlocarion()
{
    
}