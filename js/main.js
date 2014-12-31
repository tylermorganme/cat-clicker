$(function(){
	var controller = {
		init: function() {
			viewCatList.displayAll(model.catData);
			viewSingleCat.display(model.catData[0], 0);
		},
		getCats: function() {
			return model.catData;
		},
		changeCat: function(num) {
			viewSingleCat.display(model.catData[num], num);
		},
		catClick: function(num) {
			model.totalClicks += 1;
			viewTotal.display();
			model.catData[num]["clicks"] += 1;
			viewSingleCat.updateClicks(model.catData[num]["clicks"]);
		}
	};

	var viewSingleCat = {
		catInfo: '<div id="{{id}}"><h1>{{name}}</h1><p>has been clicked: <span>{{clicks}}</span> times!</p><img src="{{img}}"></div>',
		display: function(cat, num) {
			var $showcase = $('#cat-showcase')
			$showcase.html('');
			$showcase.append(viewSingleCat.catInfo
				.replace("{{id}}", cat["id"])
				.replace("{{clicks}}", cat["clicks"])	
				.replace("{{name}}", cat["name"])
				.replace("{{img}}", cat["img"])
			);
			$('#cat-showcase img').click(function(){
				controller.catClick(num);
			});
		},
		updateClicks: function(num) {
			$('#cat-showcase span').text(num)
		}
	};

	var viewCatList = {
		displayAll: function(cats){
			var $catListElem = $('#cat-names ul');
			for (var cat in cats) {
				$catListElem.append("<li>" + cats[cat]["name"] + "</li>");
			}
			$('#cat-names li').each(function(index){
				$(this).click(function(){
					controller.changeCat(index);
				});
			});
		},
	};

	var viewTotal = {
		display: function() {
			$("#total-clicks span").text(model.totalClicks);
		}
	};

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
		totalClicks: 0
	};

	controller.init();	
});




