window.onload=function(){
	var list = document.getElementsByName("list");
	for (var i = list.length - 1; i >= 0; i--) {
		list[i].addEventListener("click", switchSelect);
	}

	switchSelect();
}

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

	body.appendChild(newList);*/


function switchSelect() {
	var list = document.getElementsByName("list");
	var i = -1;
	var indice = 0;

	while(i == -1){
		if (list[indice].checked==true) {
			i = indice;
		}
		indice++;
	}

	var obj = getDefinition(i);
	console.log(obj);

	var content = document.getElementById("contents");
	content.innerHTML ="";

	var dl = document.createElement("dl");

	var dt = document.createElement("dt");
	dt.appendChild(document.createTextNode(obj.title));

	var dd = document.createElement("dd");
	var ul = document.createElement("ul");

	for (var i = 0; i < obj.items.length; i++) {
		var newElem = document.createElement("li");
		newElem.appendChild(document.createTextNode(obj.items[i]));
		ul.appendChild(newElem);
	}

	dd.appendChild(ul);
	dl.appendChild(dt);
	dl.appendChild(dd);
	content.appendChild(dl);
}