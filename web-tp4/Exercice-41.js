window.addEventListener("load",load);

function load () {
	cacherVide();
}

function cacherVide () {
	$('tbody').each(estVide);
}

function estVide () {
	if ($(this).children().size() == 0) {
		$(this).parents("div").css("display", "none");
	};
}