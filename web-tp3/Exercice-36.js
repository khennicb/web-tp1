window.onload=function(){

	color_marks();

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
