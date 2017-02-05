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
	var ths = $("th");

	$("th").click(triTable);
	$("th").addClass("tri", 1);

	$("th").each(function( i ){
		$(this).attr("col-pos", i);
		if (i == 0 || i == 4 || i == 5 || i == 7) {
			$(this).attr("type", "num");
		}else{
			$(this).attr("type", "alpha-num");
		}
	});


}

function triTable () {

	var tri = $(this).attr("tri");
	$(this).attr("tri", (tri=="0") ? "1" : "0");

	// Construit la matrice
    // Récupère le tableau (tbody)

    var colonne = jQuery.makeArray($("tbody").children());
    var nNbrLigne = colonne.length;
    console.log(colonne);

    // Recuper le  numero de la colone a trier
    var index = $(this).attr("col-pos");

    // Recupere le type de tri (alpha numerique ou numerique)
    if ($(this).attr("type") == "num") {
    	colonne.sort(triNumElems);
    }else {
    	colonne.sort(triAlphaElems);
    }


    // evalue les elements de la matrice
    function triAlphaElems (a, b) {
        var a_value = a.children[index].innerHTML;
        var b_value = b.children[index].innerHTML;

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

    // Construit les colonne du nouveau tableau
    var bodyt_to_insert = "";
    for(i = 0; i < nNbrLigne; i++){
    	bodyt_to_insert += colonne[i].outerHTML;
    }

    //console.log(bodyt_to_insert);

    // assigne les lignes au tableau
    $("tbody").html(bodyt_to_insert);


}
