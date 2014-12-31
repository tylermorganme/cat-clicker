$(function(){
	var model = {
		catData:[
			{
				id: "toby",
				img: "https://placekitten.com/g/200/300",
				name: "Toby",
				link: "",
				clicks: 0  
			},
			{
				id: "keith",
				img: "https://placekitten.com/g/800/300",
				name: "Keith",
				link: "",
				clicks: 0 
			},
			{
				id: "oz",
				img: "https://placekitten.com/g/500/500",
				name: "Oz",
				link: "",
				clicks: 0 
			},
			{
				id: "Nickodemus",
				img: "https://placekitten.com/g/200/200",
				name: "Nick",
				link: "",
				clicks: 0 
			},
			{
				id: "Alabaster",
				img: "https://placekitten.com/g/300/300",
				name: "Al",
				link: "",
				clicks: 0 
			}	
		],
		catInfo: '<div id="{{id}}"><h1>{{name}}</h1><p>has been clicked: <span>{{clicks}}</span> times!</p><img src="{{img}}"></div>',
		totalClicks: 0
	};

	var controller = {

	};

	var view = {

	};

	var catClicker = function(id, num) {
		$("#"+id).click(function(){
			model.catData[num]["clicks"] +=1;
			model.totalClicks +=1;
			$("#" + id + ' span').text(model.catData[num]["clicks"]);
			$("#total-clicks span").text(model.totalClicks);
		});
	};

	var catSelectClicker = function(num) {
		$("#cat-names li").eq(num).click(function(){
			changeCat(num);
		});
	};

	var displayCat = function(num) {
		$('#cat-showcase').append(catInfo
			.replace("{{id}}", model.catData[num]["id"])
			.replace("{{clicks}}", model.catData[num]["clicks"])	
			.replace("{{name}}", model.catData[num]["name"])
			.replace("{{img}}", model.catData[num]["img"])
		);
		catClicker(model.catData[num]["id"], num);
	}

	var displayCatList = function(){
		for (var cat in model.catData) {
			$('#cat-names ul').append("<li>" + model.catData[cat]["name"] + "</li>");
			catSelectClicker(cat);
		}
	}

	var changeCat = function(num) {
		$('#cat-showcase').html('');
		displayCat(num);
	}

	displayCatList();	
});




