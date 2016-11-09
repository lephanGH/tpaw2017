function validation() {
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
		error_message=error_message+'nom';
    }
	if (prenom_len < 5) {
		error_message=error_message+', prenom';
    }
	if (naissance_len < 10) {
		error_message=error_message+', naissance';
    } 
	if (adresse_len < 5) {
		error_message=error_message+', adresse';
    } 
	if (mail_len < 5) {
		error_message=error_message+', mail';
    } 
	if (error_message.length==0) {
		document.getElementById("resultat").innerHTML = 'Bienvenue ' + nom + '!';
	} else {
		document.getElementById("error").innerHTML = 'La saisie du '+error_message+' est obligatoire et au moins 5 caractères.';
	}
}