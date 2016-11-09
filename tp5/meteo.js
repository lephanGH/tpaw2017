$(document).ready(function(){

window.onload = function(){
	document.getElementById("searchCity").addEventListener("submit", function(event){
		event.preventDefault(); // pour annuler le rechargement de la page
		var city = document.getElementById("city").value;
		searchCity(city);
	});
	
	document.getElementById("GPS").addEventListener("click", function(){
		
	});
}

function searchCity(_city){
	var input_check = document.getElementById("city").value;
	var request = new XMLHttpRequest();
	
	if (('0'<=input_check[0]) && (input_check[0]<='9')) { // Search by Coordiation
		var lat_lng = input_check.split(" ");
		request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+lat_lng[0]+'&lon='+lat_lng[1]+'&appid=b19148c8359295d9bc466fc825a6800d', true);
	} else { // Search by Name
		request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+_city+'&appid=b19148c8359295d9bc466fc825a6800d', true);
	}
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) { // Success!
			//var resp = request.responseText;
			var resp = JSON.parse(request.responseText);
			var name = resp.name;
			var icon = resp.weather[0].icon;
			var temp = resp.main.temp  - 273.15; // Convert to Celsius
			var weather = resp.weather[0].description;
			var humid = resp.main.humidity;
			var cloud = resp.clouds.all;
			var wind = resp.wind.speed + ' m/s - ';
			var wind_dir = resp.wind.deg;
			
			var today = new Date();
			var h = today.getHours();
			var m = today.getMinutes();
			m = checkTime(m);
	
			if ((wind_dir==0) || (wind_dir==360))
				wind = wind + 'East';
			else if (wind_dir==90)
				wind = wind + 'North';
			else if (wind_dir==180)
				wind = wind + 'West';
			else if (wind_dir==270)
				wind = wind + 'South';
			else if (wind_dir < 90)
				wind = wind + 'North East';
			else if (wind_dir < 180)
				wind = wind + 'North West';
			else if (wind_dir < 270)
				wind = wind + 'South West';
			else wind = wind + 'South East'; //(wind_dir < 360)

			
			document.getElementById("cityName").innerHTML = name;
			document.getElementById("time").innerHTML = '@ ' + h + ':' + m;
			$('#icon img').attr("src","http://openweathermap.org/img/w/"+icon+".png");
			document.getElementById("temp").innerHTML = temp.toFixed(1) + 'oC';
			document.getElementById("weather").innerHTML = weather;
			document.getElementById("humidity").innerHTML = humid + ' %';
			document.getElementById("humidity_header").innerHTML = "Humidity";
			document.getElementById("cloud").innerHTML = cloud + ' %';
			document.getElementById("cloud_header").innerHTML = "Cloud";
			document.getElementById("wind").innerHTML = wind;
			document.getElementById("wind_header").innerHTML = "Wind";
		} else { // We reached our target server, but it returned an error
			alert("error from openweathermap!");
		}
	};
	request.onerror = function() {
		// There was a connection error of some sort
	};
	request.send();
}

function searchLatLng(_lat, _lng){
	// this function is integrated in the function searchCity(_city) above.
}

document.getElementById("help").onclick = function() {alert("Type the name of the city\nor its coordinates in the following format 'latitude longtitude'\nwithout the apostrophe (')");};
});

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

//--GPS
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
	var latlon_format = position.coords.latitude + " " + position.coords.longitude;
	
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
	document.getElementById("city").value = latlon_format;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
