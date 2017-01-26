window.onload=function(){
	var element = document.getElementsByName("push")[0];
	element.addEventListener("click",lifo_push);

	var element = document.getElementsByName("pop")[0];
	element.addEventListener("click",lifo_pop);

	var element = document.getElementsByName("peek")[0];
	element.addEventListener("click",lifo_peek);

}

function lifo_push(){
  var newItemBox = document.getElementById("newItem");
  var text_to_add = newItemBox.value;

  var new_li = document.createElement("li");
  new_li.appendChild(document.createTextNode(text_to_add));
  var list = document.getElementById("lifo");

  list.insertBefore(new_li, list.firstChild);

  newItemBox.value='';
}
function lifo_pop(){
  var list = document.getElementById("lifo");
  var nb_item = list.childNodes.length -1;
  console.log("nb_item = " + nb_item);

  if(nb_item > 0) {
    var elem_to_delete = list.firstChild;
    set_peek_area_text(elem_to_delete.childNodes[0].textContent);
    list.removeChild(elem_to_delete);
  } else {
    alert("ya rien a enlever gros, me prend pas pour un teubé !");
  }
}
function lifo_peek(){
  var list = document.getElementById("lifo");
  var nb_item = list.childNodes.length -1;
  console.log("nb_item = " + nb_item);

  if(nb_item > 0) {
    var elem_to_delete = list.childNodes[nb_item-1];
    set_peek_area_text(elem_to_delete.childNodes[0].textContent);
    list.removeChild(elem_to_delete);
  } else {
      alert("uesh c'est vide, t'as cru t'allais me la faire à l'envers ?");
  }
}

function set_peek_area_text(text) {
  document.getElementById("peek_area").textContent = text;
}
