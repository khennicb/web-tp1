window.addEventListener('load',load);

function load () {
	cacherVide();
	colorerLignes();
	nombres();

	for (var i = 0; i < $('table').length; i++) {
		raccourcir($('table')[i]);
	}
}

// Cache les tableaux vide
function cacherVide () {
	$('tbody').each(estVide);

	// Cache le tableau qui l'appel
	function estVide () {
		if ($(this).children().size() == 0) {
			$(this).parents('div').css('display', 'none');
		}
	}
}


// Colorie les lignes
function colorerLignes () {
	$('tbody').each(coloreMyLines);

	// Colorie le tableau qui l'appel
	function coloreMyLines () {
		var index = 0;
		$(this).find('tr').each(coloreOneLine);

		// Colorie la ligne qui l'appel
		function coloreOneLine () {
			if (index % 3 == 0) {
				$(this).addClass('lig1');
			}else if (index % 3 == 1) {
				$(this).addClass('lig2');
			}else{
				$(this).addClass('lig3');
			}

			index++;
		}
	}
}


// Aligne les nombres
function nombres () {
	$('tbody > tr > td:nth-child(2), tbody > tr > td:nth-child(3)').addClass('nombre');
}

// Reduit les tableaux
function raccourcir (tableau) {
	if ($(tableau).find('tr').size() > 5) {
		var indice = 0;
		$(tableau).find('tr').each(effaceElems);

		// Efface la ligne appellée
		function effaceElems () {
			if (indice > 5) {
				$(this).css("display", "none");
			};
			indice++;
		}

		$(tableau).find('tr:nth-child(5)').after('<tr onclick="rallonger(this)"><td>...</td><td>...</td><td>...</td></tr>');
	};
}

function rallonger (tableau) {
	console.log($(tableau));
}