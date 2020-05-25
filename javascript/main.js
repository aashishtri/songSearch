
/* input search query */

var soundcloud= new  Object();
soundcloud.clearbutton = function() {
var bar = document.querySelector('.js-playlist');

var icon = document.createElement('div');
icon.classList.add( 'btn', 'btn-default', 'btn-block' , 'clear');
//icon.innerHTML = 'Clear';

var buttontext = document.createElement('span');
buttontext.innerHTML = "Clear playlist";
icon.appendChild(buttontext);
bar.appendChild(icon);
//console.log(sidebar);
}
soundcloud.clearbutton();

soundcloud.clearplaylist = function() {
	var button = document.querySelector('.clear');
	button.addEventListener( 'click' ,function(){
		//window.localStorage.clear();

		var bar = document.querySelector('.js-playlist');
		//localStorage.clear();
		bar.innerHTML="";
		var icon = document.createElement('div');
		icon.classList.add( 'btn', 'btn-default', 'btn-block' , 'clear');
		//icon.innerHTML = 'Clear';

		var buttontext = document.createElement('span');
		buttontext.innerHTML = "Clear playlist";
		icon.appendChild(buttontext);
		bar.appendChild(icon);
		//localStorage.setItem('key', bar.innerHTML);
		console.log("bar");
	});
}
soundcloud.clearplaylist();
/*query SOUNDCLOUD API*/
soundcloud.initialize = function() {
	SC.initialize({
  		client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
	// var sidebar = document.querySelector('.js-playlist');
	// sidebar.innerHTML = window.localStorage.getItem("key");
	// soundcloud.clearbutton();
	// soundcloud.clearplaylist();
}
soundcloud.initialize();

// find all sounds of buskers licensed under 'creative commons share alike'

soundcloud.getcard = function (tracks) {

	tracks.forEach(function(curtrack) {
	//console.log(curtrack);
	var card = document.createElement('div');
	card.classList.add('card');

	var image = document.createElement('div');
	image.classList.add('image');

	var image_img = document.createElement('img');
	image_img.src=curtrack.artwork_url || 'https://picsum.photos/100/100';
	image.appendChild(image_img);

	var content = document.createElement('div');
	content.classList.add('content');

	var header = document.createElement('div');
	header.classList.add('content');
	

	var songLink = document.createElement('a');
	//songLink.href = curtrack.permalink_url;
	//songLink.href = '#';
	//songLink.target = '_blank';
	songLink.innerHTML = curtrack.title;
	header.appendChild(songLink);
	content.appendChild(header);

	var button = document.createElement('div');
	button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
	
	// button.innerHTML = "<i class="+"add icon"+" ></i> <span>Add to playlist</span>";
	var icon = document.createElement('i');
	icon.classList.add('add','icon');
	

	var buttontext = document.createElement('span');
	buttontext.innerHTML = "Add to playlist";
	
	button.appendChild(icon);
	button.appendChild(buttontext);
	card.appendChild(button);
	card.appendChild(image);
	card.appendChild(content);
	var search = document.querySelector('.js-search-results');
	search.appendChild(card);
	// var grabsong = document.querySelector(buttontext);
	
	button.addEventListener('click', function() {
		soundcloud.embedsong(curtrack.permalink_url);
		
	});
	
	content.addEventListener('click', function() {
		soundcloud.embedsong(curtrack.permalink_url);
		//console.log(content);
	});
	soundcloud.clearplaylist();
	});
}



/*add song to playlist*/
soundcloud.embedsong = function (curtrack) {
	SC.oEmbed(curtrack, {
  auto_play: true
}).then(function(embed){
  //console.log('oEmbed response: ', embed);
  var sidebar = document.querySelector('.js-playlist');
  var box = document.createElement('div');
  box.innerHTML = embed.html;
  console.log(sidebar.children);
  sidebar.insertBefore(box,sidebar.children[1]);
  
  

});
}






soundcloud.searchquery = function() {
var body = document.querySelector('.js-search-results');
	
var search = document.querySelector('.js-search');
	search.addEventListener('keyup', function(event) {
		
		if(event.which===13){
			body.innerHTML="";
			soundcloud.searchsong(search.value);
		}
	});
	var iconsearch = document.querySelector('.search.icon');
	
	iconsearch.addEventListener('click', function() {
		body.innerHTML="";
		soundcloud.searchsong(search);
	});
}
soundcloud.searchquery();
soundcloud.searchsong = function(song) {
	var search = document.querySelector('.js-search-results');
	search.innerHTML = "";
	SC.get('/tracks', {
	q: song
	}).then(function (tracks) {
	//console.log(tracks);
	soundcloud.getcard(tracks);

	});
};

