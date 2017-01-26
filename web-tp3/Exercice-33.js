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
}

function initialize() {
	switchMenu();
	switchTheme();
}