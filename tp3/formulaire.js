$(document).ready(function(){
/*$(function(){
});*/

$("#valider").click(function() {
	//$(":button").css("background-color", "red");
	//$("#nomtext").css("color", "red");
	//alert('button clicked');
	if (($("#nom").val()=="")||($("#prenom").val()=="")||($("#naissance").val()=="")||($("#adresse").val()=="")||($("#mail").val()==""))
		$('#mymodal').modal('show');
	else {
		$('#message').text('Vous êtes nés le ' + $("#naissance").val() + ' et vous habitez à ' + $("#adresse").val() + '.');
		$("#mymodalok .modal-body a").attr("href","https://maps.google.com/maps?q="+$("#adresse").val()+"&markers="+$("#adresse").val());
		$("#mymodalok .modal-body img").attr("src","https://maps.googleapis.com/maps/api/staticmap?size=500x300&scale=1&zoom=4&center="+$("#adresse").val()+"&markers="+$("#adresse").val());
		$('#mymodalok').modal('show');
	}
});

$( "#naissance" ).datepicker({
		dateFormat: "dd/mm/yy",
		maxDate: 0
	});

});