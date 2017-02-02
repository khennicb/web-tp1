window.addEventListener('load',load);

function load () {
	cacherVide();
	colorerLignes();
	nombres();

	for (var i = 0; i < $('table').length; i++) {
		raccourcir($('table')[i]);
	}

	initClicEnteteTableaux();
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

		// Rajoute la ligne ...
		$(tableau).find('tr:nth-child(5)').after('<tr class="point"><td>...</td><td>...</td><td>...</td></tr>');
		
		// Change le listner
		$(tableau).on('click', function(){rallonger($(tableau))});
	};
}


// Rallonge le tableau
function rallonger (tableau) {
	$(tableau).find('tr').css("display", "");
	$(tableau).find('tr.point').remove();

	// Change le listner
	$(tableau).on('click', function(){raccourcir($(tableau))});
}


// Initialise l'entete
function initClicEnteteTableaux () {
	$('table').addClass('cliquable');
}