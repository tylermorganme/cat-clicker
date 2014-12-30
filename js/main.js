var catInfo = '<div id="{{id}}"><h1>{{name}}</h1><p>has been clicked: <span>{{clicks}}</span> times!</p><img src="{{img}}"></div>'
var totalClicks = 0;
var catClicker = function(id, num) {
	$("#"+id).click(function(){
		catData[num]["clicks"] +=1;
		totalClicks +=1;
		$("#" + id + ' span').text(catData[num]["clicks"]);
		$("#total-clicks span").text(totalClicks);
	});
};

var catSelectClicker = function(num) {
	$("#cat-names li").eq(num).click(function(){
		changeCat(num);
	});
};

var displayCat = function(num) {
	$('#cat-showcase').append(catInfo
		.replace("{{id}}", catData[num]["id"])
		.replace("{{clicks}}", catData[num]["clicks"])	
		.replace("{{name}}", catData[num]["name"])
		.replace("{{img}}", catData[num]["img"])
	);
	catClicker(catData[num]["id"], num);
}

var displayCatList = function(){
	for (var cat in catData) {
		$('#cat-names ul').append("<li>" + catData[cat]["name"] + "</li>");
		catSelectClicker(cat);
	}
}

var changeCat = function(num) {
	$('#cat-showcase').html('');
	displayCat(num);
}

displayCatList();

