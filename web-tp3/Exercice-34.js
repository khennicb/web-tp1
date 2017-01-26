window.onload=function(){
	var element = document.getElementsByName("push")[0];
	element.addEventListener("click",pushItem);

	var element = document.getElementsByName("pop")[0];
	element.addEventListener("click",popItem);

	var element = document.getElementsByName("peek")[0];
	element.addEventListener("click",peekItem);

}

function pushItem(){
  var newItemBox = document.getElementById("newItem");
  var text_to_add = newItemBox.value;

  var new_li = document.createElement("li");
  new_li.appendChild(document.createTextNode(text_to_add));
  var list = document.getElementById("lifo");

  list.insertBefore(new_li, list.firstChild);

  newItemBox.value='';
}
function popItem(){
  var list = document.getElementById("lifo");
  var nb_item = list.childNodes.length -1;
  console.log("nb_item = " + nb_item);

  if(nb_item > 0) {
    var elem_to_delete = list.firstChild;
    list.removeChild(elem_to_delete);
  } else {
    alert("ya rien a enlever gros, me prend pas pour un teubé !");
  }
}
function peekItem(){
  var list = document.getElementById("lifo");
  var nb_item = list.childNodes.length -1;
  console.log("nb_item = " + nb_item);

  if(nb_item > 0) {
    var elem_to_delete = list.childNodes[nb_item-1];
    list.removeChild(elem_to_delete);
  } else {
      alert("uesh ya rien a enlever gros, t'as cru t'allais me la faire à l'envers ?");
  }
}

function switchTheme(){
}
