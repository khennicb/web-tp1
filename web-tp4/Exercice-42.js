$(function() {

	initTri();

	$("tbody > tr > td:nth-child(6)").each(function( index ){

		var mark = $(this).text();

		if (mark < 8) {
			$(this).addClass("mark-0-8");
		} else if (mark < 10) {
			$(this).addClass("mark-8-10");
		} else if (mark < 12) {
			$(this).addClass("mark-10-12");
		} else {
			$(this).addClass("mark-12-20");
		}

	});

});




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
		console.log(index);

    // Recupere le type de tri (alpha numerique ou numerique)
    if (this.getAttribute("type") == "num") {
    	colonne.sort(triNumElems);
    }else{
    	colonne.sort(triAlphaElems);
    }

    console.log(colonne);

    // evalue les elements de la matrice
    function triAlphaElems (a, b) {
        var a_value = a.children[index].innerHTML;
        var b_value = b.children[index].innerHTML;

				console.log(a_value);
				console.log(b_value);

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
        var a_value = a.children[index].innerHTML;
        var b_value = b.children[index].innerHTML;

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

    //console.log(bodyt_to_insert);

    // assigne les lignes au tableau
    tbody.innerHTML = bodyt_to_insert;


}
