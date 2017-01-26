window.onload=function(){
	document.getElementById("b1").addEventListener("click", function() {
		var element = document.getElementById("contents");
		element.style.backgroundColor = "yellow";
	});

	var defaultColor = getComputedStyle((document.getElementsByTagName("h1"))[0]).color;

	document.getElementById("b2").addEventListener("click", function() {
		var element = document.getElementsByTagName("h1");
		for (var i = element.length - 1; i >= 0; i--) {
			if(getComputedStyle(element[i]).color != 'rgb(255, 0, 0)'){
				element[i].style.color = "red";
			}else{
				element[i].style.color = defaultColor;
			}
		}
	});

	document.getElementById("b3").addEventListener("click", function() {
		var element = document.getElementsByTagName("p");
		var i = 0;
		var find = false;
		while(i < element.length && find == false){
			if (getComputedStyle(element[i]).fontStyle != "italic") {
				console.log("find");
				element[i].style.fontStyle = "italic";
				find = true;
			}
			i++;
		}
	});
}

