window.onload=function(){

	color_marks();
	initTri();
}

// Colorie les notes dans une couleur dépendant de leur valeur.
function color_marks (){

	var mark_array = document.getElementsByTagName("tbody")[0];
	var mark_lines = mark_array.children;

	for (var i in mark_lines) {
		var current_line = mark_lines[i];
		if(current_line.nodeType == 1) {
			var mark_field = current_line.cells[5];
			var mark = mark_field.textContent;

			// Set the color regarding "mark"
			set_color_regarding_mark(mark_field);
		}

	}
}

	function set_color_regarding_mark(mark_field) {
		var mark = mark_field.textContent;

		if (mark < 8) {
			mark_field.className += " mark-0-8";
		}else	if (mark < 10) {
			mark_field.className += " mark-8-10";
		}else	if (mark < 12) {
			mark_field.className += " mark-10-12";
		} else {
			mark_field.className += " mark-12-20";
		}

	}

// Initialise la fonction pour les tris
function initTri () {
	var ths = document.getElementsByTagName("th");

	for (var i = 0; i < ths.length; i++) {
		ths[i].addEventListener("click", triTable);
		ths[i].setAttribute("col-pos", i);
		ths[i].setAttribute("tri", 1);
		if (i == 0 || i == 4 || i == 5 || i == 7) {
			ths[i].setAttribute("type", "num");
		}else{
			ths[i].setAttribute("type", "alpha-num");
		}
	}
}

function triTable () {
	var tri = this.getAttribute("tri");
	this.setAttribute("tri", (tri=="0") ? "1" : "0");


	// Construit la matrice
    // Récupère le tableau (tbody)
    var tbody = document.getElementById("T-1").getElementsByTagName("tbody")[0];
    var ligne = tbody.rows;
    var nNbrLigne = ligne.length;
    var colonne = new Array();
    
    for(var i = 0; i < nNbrLigne; i++) {
        colonne[i] = ligne[i];
    }

    console.log(colonne);

    // Recuper le  numero de la colone a trier
    var index = this.getAttribute("col-pos");

    // Recupere le type de tri (alpha numerique ou numerique)
    if (this.getAttribute("type") == "num") {
    	colonne.sort(triNumElems);
    }else{
    	colonne.sort(triAlphaElems);
    }

    console.log(colonne);

    // evalue les elements de la matrice
    function triAlphaElems (a, b) {
        var a_value = a.children[index].innerText;
        var b_value = b.children[index].innerText;

    	if(a_value < b_value){
    		return -1;
    	}else if (a_value == b_value) {
    		return 0;
    	}else{
    		return 1;
    	}
    }

    // evalue les elements de la matrice
    function triNumElems (a, b) {
        var a_value = a.children[index].innerText;
        var b_value = b.children[index].innerText;

    	return a_value - b_value;
    }

    // Tri decroissant si necessaire
    if (tri == "0") {
    	colonne.reverse();
    }

    console.log(colonne);

    // Construit les colonne du nouveau tableau
    var bodyt_to_insert = "";
    for(i = 0; i < nNbrLigne; i++){
    	bodyt_to_insert += colonne[i].outerHTML;
    }

    console.log(bodyt_to_insert);

    // assigne les lignes au tableau
    tbody.innerHTML = bodyt_to_insert;


}
