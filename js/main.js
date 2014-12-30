var catInfo = '<div id="{{id}}"><h1>{{name}}</h1><img src="{{img}}"><p>{{name}} has been clicked: <span>0</span> times!</p></div>'


var catClicker = function(id, num) {
		$("#"+id).click(function(){
			catData[num]["clicks"] +=1;
			$("#" + id + ' span').text(catData[num]["clicks"]);
			console.log(id + " has been clicked");
	});
};

for (var cat in catData) {
	$('#cat-area').append(catInfo
		.replace("{{id}}", catData[cat]["id"])	
		.replace("{{name}}", catData[cat]["name"])
		.replace("{{name}}", catData[cat]["name"])
		.replace("{{img}}", catData[cat]["img"])
	);
	catClicker(catData[cat]["id"], cat);
}
