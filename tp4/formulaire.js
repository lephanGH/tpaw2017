$(document).ready(function(){
/*$(function(){
});*/

document.getElementById("nom").value = localStorage.getItem("form_nom");
document.getElementById("prenom").value = localStorage.getItem("form_prenom");
document.getElementById("naissance").value = localStorage.getItem("form_naissance");
document.getElementById("adresse").value = localStorage.getItem("form_adresse");
document.getElementById("mail").value = localStorage.getItem("form_mail");

$("#valider").click(function() {
	//$(":button").css("background-color", "red");
	//$("#nomtext").css("color", "red");
	//alert('button clicked');
	if (($("#nom").val()=="")||($("#prenom").val()=="")||($("#naissance").val()=="")||($("#adresse").val()=="")||($("#mail").val()==""))
		$('#mymodal').modal('show');
	else {
		//$('#message').text('Vous êtes nés le ' + $("#naissance").val() + ' et vous habitez à ' + $("#adresse").val() + '.');
		//$("#mymodalok .modal-body a").attr("href","https://maps.google.com/maps?q="+$("#adresse").val()+"&markers="+$("#adresse").val());
		//$("#mymodalok .modal-body img").attr("src","https://maps.googleapis.com/maps/api/staticmap?size=500x300&scale=1&zoom=4&center="+$("#adresse").val()+"&markers="+$("#adresse").val());
		//$('#mymodalok').modal('show');
		localStorage.setItem("form_nom",$("#nom").val());
		localStorage.setItem("form_prenom",$("#prenom").val());
		localStorage.setItem("form_naissance",$("#naissance").val());
		localStorage.setItem("form_adresse",$("#adresse").val());
		localStorage.setItem("form_mail",$("#mail").val());
		document.getElementById("message").innerHTML = "Bravo! Le formulaire est sauvegardé."
	}
});

$( "#naissance" ).datepicker({
	function(){alert("wibble");},
	dateFormat: "dd/mm/yy",
	maxDate: 0
});

//Nombre de caractere
$( "#nom" ).keyup(function() {
	var car;
	car = document.getElementById("nom").value;
	document.getElementById("car_nom").innerHTML = car.length + ' car.';
});
$( "#prenom" ).keyup(function() {
	var car;
	car = document.getElementById("prenom").value;
	document.getElementById("car_prenom").innerHTML = car.length + ' car.';
});
$( "#naissance" ).mouseout(function() {
	var car;
	car = document.getElementById("naissance").value;
	document.getElementById("car_naissance").innerHTML = car.length + ' car.';
});
$( "#adresse" ).keyup(function() {
	var car;
	car = document.getElementById("adresse").value;
	document.getElementById("car_adresse").innerHTML = car.length + ' car.';
});
$( "#mail" ).keyup(function() {
	var car;
	car = document.getElementById("mail").value;
	document.getElementById("car_mail").innerHTML = car.length + ' car.';
});

});

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

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
	document.getElementById("adresse").value = latlon;
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