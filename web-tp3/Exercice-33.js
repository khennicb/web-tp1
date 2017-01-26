window.onload=function(){
	var element = document.getElementById("ltheme");
	element.addEventListener("change", function(){switchTheme();});

  var checkbox = document.getElementById("showMenu");
  checkbox.addEventListener("click", switchMenu);
  
  initialize();
}

function switchMenu(){

  var checkbox = document.getElementById("showMenu");
  var menu = document.getElementById("menu");

  if(checkbox.checked) {
    menu.style.display="";
  } else {
    menu.style.display="none";
  }
}

function switchTheme(){
	var element = (document.getElementsByTagName("body"))[0];
	element.className = document.getElementById("ltheme").value;

  var checkbox_span = document.getElementById("showMenu").parentNode;
  if(document.getElementById("ltheme").value == "theme1") {
    checkbox_span.style.display="";
  } else {
    checkbox_span.style.display="none";
  }
}

function initialize() {
	switchMenu();
	switchTheme();
}