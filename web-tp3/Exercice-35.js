window.onload=function(){
	var list = document.getElementsByName("list");
	for (var i = list.length - 1; i >= 0; i--) {
		list[i].addEventListener("click", switchSelect);
	}

	switchSelect();
}


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

	var obj = getDefinition(i+1);
	console.log(obj);

	var content = document.getElementById("contents");
	content.innerHTML ="";

	afficheObj(obj, content);	
}

function afficheObj(obj, content) {
	var dl = document.createElement("dl");

	var dt = document.createElement("dt");
	dt.appendChild(document.createTextNode(obj.title));

	var dd = document.createElement("dd");
	var ul = document.createElement("ul");

	for (var i = 0; i < obj.items.length; i++) {
		var newElem = document.createElement("li");
		if (typeof obj.items[i] === 'string') {
			newElem.appendChild(document.createTextNode(obj.items[i]));
		}else{
			afficheObj(obj.items[i], newElem);
		}
		ul.appendChild(newElem);
	}

	dd.appendChild(ul);
	dl.appendChild(dt);
	dl.appendChild(dd);

	content.appendChild(dl);
}