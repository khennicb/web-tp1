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
			mark_field.style.color = get_color_regarding_mark(mark);

		}
	}

	function get_color_regarding_mark(mark) {
		// 0-8  	=>	red
		// 8-10  	=>	orange
		// 10-12  =>	yellow
		// 12-20  =>	green

		if (mark < 8) {
			return "red";
		}
		if (mark < 10) {
			return "orange";
		}
		if (mark < 12) {
			return "yellow";
		}
		return "green";

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
    	var cellule = ligne[i].cells;
    	colonne[i] = new Array();
    	for(var j = 0; j < cellule.length; j++){
    		colonne[i][j] = cellule[j].innerHTML;
    	}
    }

    // Recuper le  numero de la colone a trier
    var index = this.getAttribute("col-pos");

    // Recupere le type de tri (alpha numerique ou numerique)
    if (this.getAttribute("type") == "num") {
    	colonne.sort(triNumElems);
    }else{
    	colonne.sort(triAlphaElems);
    }
    
    // evalue les elements de la matrice
    function triAlphaElems (a, b) {
    	if(a[index] < b[index]){
    		return -1;
    	}else if (a[index] == b[index]) {
    		return 0;
    	}else{
    		return 1;
    	}
    }

    // evalue les elements de la matrice
    function triNumElems (a, b) {
    	return a[index] - b[index];
    }

    // Tri decroissant si necessaire
    if (tri == "0") {
    	colonne.reverse();
    }

    // Construit les colonne du nouveau tableau
    for(i = 0; i < nNbrLigne; i++){
    	colonne[i] = "<td>"+colonne[i].join("</td><td>")+"</td>";
    }

    // assigne les lignes au tableau
    tbody.innerHTML = "<tr>"+colonne.join("</tr><tr>")+"</tr>";
}

