/* Base URL of the web-service for the current user */
var wsBase = 'http://localhost:8080/bmt/foreyn-khennicb/'
// chemin pour voir le site : http://localhost:8080/bmt/appli/Exercice-50.html
/* Shows the identity of the current user */
function setIdentity() {
	var logs = wsBase.split("/")[4];
	$('.identity').prepend(logs);
}

/* Sets the height of <div id="#contents"> to benefit from all the remaining place on the page */
function setContentHeight() {
	var posContent = $('#contents').offset()['top'];
	var taillePage = $(window).height();
	// #LesNombresMagiqueCestLaVie
	// TODO : retirer ce nombre magique...
	$('#contents').height(taillePage - posContent - 32);
}


/* Selects a new object type : either "bookmarks" or "tags" */
function selectObjectType(type) {

	if (type == "bookmarks") {
		if($("#menu > .bookmarks").hasClass("selected") == false) {
			$("#menu > .tags, #add > .tag").removeClass("selected");
			$("#menu > .bookmarks").addClass("selected");
			listBookmarks();
		}
	} else if (type == "tags") {
		if($("#menu > .tags").hasClass("selected") == false) {
			$("#menu > .tags, #add > .tag").addClass("selected");
			$("#menu > .bookmarks").removeClass("selected");
			listTags();
		}
	}


}

/* Loads the list of all bookmarks and displays them */
function listBookmarks() {
	$('#items').empty();
	var url = 'http://localhost:8080/bmt/foreyn-khennicb/bookmarks';
	jQuery.getJSON(url, printBookmarks).fail(function(){console.log('error :(')});
}

function printBookmarks(data){
	$(data).each(insertBookmark);
}

function insertBookmark(){
	// console.log(this);
	var copyBook = $('.model.bookmark').clone();
	copyBook.find('h2').append(this['title']);
	copyBook.find('a').append(this['link']);
	copyBook.find('a').append(this['link']);

	var tagFather = copyBook.find('.tags');
	for (var i = 0; i < this['tags'].length; i++) {
		tagFather.append('<li>' +this['tags'][i]['name'] +'</li>');
	}

	copyBook.toggleClass('model item');
	$('#items').append(copyBook);
}

/* Loads the list of all tags and displays them */
function listTags() {
	$("#items").empty();
	$.getJSON( "http://localhost:8080/bmt/foreyn-khennicb/tags", function( data ) {
		var parsed_data = data;
		console.log(template_tag_node);
		for (i in parsed_data) {
			var template_tag_node = $('.model.tag').clone();
			console.log(parsed_data[i]);
			template_tag_node.find('h2').text(parsed_data[i]['name']);
			template_tag_node.removeClass("model");
			template_tag_node.addClass("item");
			template_tag_node.attr("num", parsed_data[i]['id']);
			console.log(template_tag_node);
			$("#items").append(template_tag_node);

		}

	});
}

/* Adds a new tag */
function addTag() {
	var elem = $(this).siblings('input[name=name]');
	var nomTag = elem.val();

	if(nomTag == null || nomTag == ''){
		alert("Erreur : ce tag ne possède pas de nom !");
		return ;
	}

	var url = 'http://localhost:8080/bmt/foreyn-khennicb/tags';
	var JSONobj = {'json':JSON.stringify({"name": nomTag})};
	jQuery.post(url, JSONobj)
		.done(function(){
			listTags();
		});
}

/* Handles the click on a tag */
function clickTag() {
	if ($(this).hasClass("selected") == false) {
		$('#items .item.tag').removeClass("selected");
		$('#items .item.tag').find('h2').show();
		$('#items .item.tag').find('h2').nextAll().remove();
		$(this).addClass("selected");

		var h2_tag = $(this).find('h2');
		h2_tag.hide();

		h2_tag.after('<input type="text" name="name_mod" value="' + h2_tag.text() + '"><input type="button" name="modify" value="Modify name"> <input type="button" name="remove" value="Remove tag">');
		$('input[type="button"][name="modify"]', $tag).on('click', modifyTag);
		$('input[type="button"][name="remove"]', $tag).on('click', removeTag);


	}
}

/* Performs the modification of a tag */
function modifyTag() {
	var idTag = $(this).parents('.tag').attr('num');
	var url = wsBase + 'tags/' + idTag;
	var newValue = $(this).siblings('input[name="name_mod"]').attr('value');

	var obj = {"id" : idTag, "name": newValue};

	jQuery.post(url, "json=" + JSON.stringify(obj) + "&x-http-method=put")
		.done(function(){
			listTags();
		});
}

/* Removes a tag */
function removeTag() {
	var idTag = $(this).parents('.tag').attr('num');
	var url = wsBase + "tags/" + idTag;

	jQuery.post(url, "x-http-method=delete")
		.done(function(){
			listTags();
		});
}

/* On document loading */
$(function() {
	// Put the name of the current user into <h1>
	setIdentity()

	// Adapt the height of <div id="contents"> to the navigator window
	setContentHeight()
	// Listen to the clicks on menu items
	$('#menu li').on('click', function() {
		var isTags = $(this).hasClass('tags')
		selectObjectType(isTags ? "tags" : "bookmarks")
	})

	// Initialize the object type to "bookmarks"
	selectObjectType("bookmarks")

	// Listen to clicks on the "add tag" button
	$('#addTag').on('click', addTag)

	// Listen to clicks on the tag items
	$(document).on('click','#items .item.tag',clickTag)
})
