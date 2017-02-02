$(function() {
//	set_color_regarding_mark.apply($("tbody > tr > td:nth-child(6)"), null)
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



