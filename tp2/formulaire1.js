﻿function validation() {
	document.getElementById("error").innerHTML = "";
	document.getElementById("resultat").innerHTML = "";
	var nom_len;
	var nom;
	var prenom_len;
	var naissance_len;
	var adresse_len;
	var mail_len;
	var error_message="";
	
	nom_len = document.getElementById("nom").value.length;
	prenom_len = document.getElementById("prenom").value.length;
	naissance_len = document.getElementById("naissance").value.length;
	adresse_len = document.getElementById("adresse").value.length;
	mail_len = document.getElementById("mail").value.length;

	nom = document.getElementById("nom").value;
	
	if (nom_len < 5) {
		document.getElementById("error").innerHTML = 'La saisie du nom est obligatoire et au moins 5 caractères.';
    } else if (prenom_len < 5) {
		document.getElementById("error").innerHTML = 'La saisie du prenom est obligatoire et au moins 5 caractères.';
    } else if (naissance_len < 10) {
		document.getElementById("error").innerHTML = 'La saisie du naissance est obligatoire et au moins 5 caractères.';
    } else if (adresse_len < 5) {
		document.getElementById("error").innerHTML = 'La saisie du adresse est obligatoire et au moins 5 caractères.';
    } else if (mail_len < 5) {
		document.getElementById("error").innerHTML = 'La saisie du mail est obligatoire et au moins 5 caractères.';
    } else {
		document.getElementById("resultat").innerHTML = 'Bienvenue '+nom+' !';
	}
	
		
}