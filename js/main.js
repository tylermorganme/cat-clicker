$(function(){
	var controller = {
		activeCat: 0,
		init: function() {
			viewCatList.displayAll(model.catData);
			viewSingleCat.display(model.catData[this.activeCat]);
		},
		getCats: function() {
			return model.catData;
		},
		changeCat: function(num) {
			console.log(num);
			viewSingleCat.display(model.catData[num]);
		}
	};

	var viewSingleCat = {
		catInfo: '<div id="{{id}}"><h1>{{name}}</h1><p>has been clicked: <span>{{clicks}}</span> times!</p><img src="{{img}}"></div>',
		display: function(cat) {
			var showcase = $('#cat-showcase')
			showcase.html('');
			showcase.append(viewSingleCat.catInfo
				.replace("{{id}}", cat["id"])
				.replace("{{clicks}}", cat["clicks"])	
				.replace("{{name}}", cat["name"])
				.replace("{{img}}", cat["img"])
			);
		},
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




