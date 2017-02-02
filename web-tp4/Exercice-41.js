window.addEventListener("load",load);

function load () {
	cacherVide();
	colorerLignes();
}

function cacherVide () {
	$("tbody").each(estVide);

	function estVide () {
	if ($(this).children().size() == 0) {
		$(this).parents("div").css("display", "none");
	};
}
}



function colorerLignes () {
	$("tbody").each(coloreMyLines);

	function coloreMyLines () {
		var index = 0;
		$(this).find("tr").each(coloreOneLine);

		function coloreOneLine () {
			if (index % 3 == 0) {
				$(this).addClass("lig1");
			}else if (index % 3 == 1) {
				$(this).addClass("lig2");
			}else{
				$(this).addClass("lig3");
			}

			index++;
		}
	}
}