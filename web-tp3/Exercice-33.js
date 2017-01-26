window.onload=function(){
	/*
	var body = document.getElementsByTagName("body")[0];
	var newList = document.createElement("ul");
	var newElem = [];
	for (var i = 0; i<3; i++) {
	  newElem[i] = document.createElement("li");
	}
	newElem[0].appendChild(document.createTextNode("one"));
	newElem[1].appendChild(document.createTextNode("two"));
	newElem[2].appendChild(document.createTextNode("three"));

	newList.appendChild(newElem[0]);
	newList.appendChild(newElem[1]);
	newList.appendChild(newElem[2]);


	body.appendChild(newList);
	*/

	var element = document.getElementById("ltheme");
	element.addEventListener("change", function(){switchTheme();});


	//=====
	// var checkbox = document.getElementById("showMenu")[0];
	// checkbox.addEventListener("click", switchMenu);

}

function switchMenu(){

}

function switchTheme(){
	var element = (document.getElementsByTagName("body"))[0];
	element.className = document.getElementById("ltheme").value;
}