$(function(){
	var initialCats = [
		{
			clickCount: 0,
			firstName: "Toby",
			lastName: "McWhiskerMittens",
			imgSrc: "https://placekitten.com/g/200/300",
			imgAttr: 'https://placekitten.com',
			nicknames: [
				"El Scratchito",
				"The Shanghai Sprayer",
				"Silent Death",
				"Steve"
				]
		},
		{
			clickCount: 0,
			firstName: "Gertrude",
			lastName: "The Cat",
			imgSrc: "https://placekitten.com/g/300/200",
			imgAttr: 'https://placekitten.com',
			nicknames: [
				"Snuggles",
				"Bread Eater"
				]
		},
		{
			clickCount: 0,
			firstName: "Tabitha",
			lastName: "Tabby",
			imgSrc: "https://placekitten.com/g/400/200",
			imgAttr: 'https://placekitten.com',
			nicknames: [
				"That One Cat",
				"Tour de Tabby",
				"Tabber-Blabber"
				] 
		},
		{
			clickCount: 0,
			firstName: "Felicity",
			lastName: "Feline",
			imgSrc: "https://placekitten.com/g/200/400",
			imgAttr: 'https://placekitten.com',
			nicknames: [
				"Fel Fel",
				"Feline Fury",
				"Five Star Felicity"
				]
		}
	]

	var Cat = function(data) {
		this.clickCount = ko.observable(data.clickCount);
		this.firstName = ko.observable(data.firstName);
		this.lastName = ko.observable(data.lastName);
		this.imgSrc = ko.observable(data.imgSrc);
		this.imgAttr= ko.observable(data.imgAttr);
		this.nicknames = ko.observableArray(data.nicknames);

		this.fullName = ko.computed(function() {
	        return this.firstName() + " " + this.lastName();
	    }, this);

	    this.level = ko.computed(function(){
	    	var result = 'Newborn'
	    	if (this.clickCount() > 100) {
	    		result = "Laser Catcher"
	    	} else if (this.clickCount() >= 75) {
	    		result = "Whiskered Warrior"
	    	} else if (this.clickCount() >= 50) {
	    		result = "Ferocious Feline"
	    	} else if (this.clickCount() >= 25) {
	    		result = "Kitty-cat"
	    	} else if (this.clickCount() >= 10) {
	    		result = "Infant"
	    	} 
	    	return result;
	    }, this)
	}

	var ViewModel = function() {
		var self = this;
		this.catList = ko.observableArray([]);

		initialCats.forEach(function(catItem) {
			self.catList.push(new Cat(catItem))
		});

		this.currentCat = ko.observable(self.catList()[0]);

		this.totalClicks = ko.computed(function(){
			var result = 0;
			for (var i = 0; i < self.catList().length; i++){
				result += self.catList()[i].clickCount();
			}
			return result;
		});

		this.incrementCounter = function() {
			self.currentCat().clickCount(self.currentCat().clickCount() + 1);
		}

		this.setCurrentCat = function(clickedCat) {
			self.currentCat(clickedCat);
		};
	}

	ko.applyBindings(new ViewModel());

	/*var controller = {
		init: function() {
			model.setActiveCat(0);
			viewCatList.displayAll(model.catData);
			viewSingleCat.display(model.catData[0], 0);
			viewAdmin.init();
		},
		getCats: function() {
			return model.catData;
		},
		changeCat: function(num) {
			model.setActiveCat(num);
			viewSingleCat.display(model.getActiveCat(num), num);
		},
		catClick: function(id) {
			model.totalClicks += 1;
			viewTotal.display();
			model.addClick(id);
			viewSingleCat.updateClicks(model.catData[id]["clicks"]);
			viewAdmin.updateClicks(model.activeCat);
		},
		getActiveCat: function() {
			return model.activeCat;
		},
		getTotalClicks: function() {
			return model.totalClicks;
		},
		submitCat: function(cat) {
			model.setCat(cat);
			model.setActiveCat(model.activeCat.num);
			viewSingleCat.display(cat, model.activeCat.num);
			viewCatList.displayAll(model.catData);
			model.updateTotalClicks();
			viewTotal.display();
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
			$('#cat-showcase span').text(num);
		}
	};

	var viewCatList = {
		displayAll: function(cats){
			var $catListElem = $('#cat-names ul');
			$catListElem.html('');
			for (var cat in cats) {
				$catListElem.append("<li>" + cats[cat]["name"] + "</li>");
			}
			$('#cat-names li').each(function(index){
				$(this).click(function(){
					controller.changeCat(index);
					viewAdmin.update(controller.getActiveCat());
				});
			});
		},
	};

	var viewTotal = {
		display: function() {
			$("#total-clicks span").text(controller.getTotalClicks());
		}
	};

	var viewAdmin = {
		init: function() {
			$('#btn-admin').click(function(){
				$('#admin-interface').toggle();
				viewAdmin.update(controller.getActiveCat());
			});
			$('#btn-cancel').click(function(event){
				$('#admin-interface').hide();
				event.preventDefault();
			});
			$('#btn-submit').click(function(event){
				$('#admin-interface').hide();
				controller.submitCat({
					id: $('#id').val(),
					img: $('#image').val(),
					name: $('#name').val(),
					link: $('#link').val(),
					clicks: parseInt($('#clicks').val())
				});
				event.preventDefault();
			});
		},
		update: function(cat) {
			$('#id').val(cat.id);
			$('#image').val(cat.img);
			$('#name').val(cat.name);
			$('#link').val(cat.link);
			$('#clicks').val(cat.clicks);
		},
		updateClicks: function(cat) {
			$('#clicks').val(cat.clicks);
		}
	}

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
				id: "nickodemus",
				img: "https://placekitten.com/g/200/200",
				name: "Nick",
				link: "",
				clicks: 0 
			},
			{
				id: "alabaster",
				img: "https://placekitten.com/g/300/300",
				name: "Al",
				link: "",
				clicks: 0 
			}	
		],
		totalClicks: 0,
		updateTotalClicks: function() {
			var result = 0;
			for (var cat in model.catData) {
				result += model.catData[cat]["clicks"];
			}
			model.totalClicks = result;
		},
		setActiveCat: function(num) {
			model.activeCat = model.catData[num];
			model.activeCat.num = num;
		},
		getActiveCat: function() {
			return model.activeCat;
		},
		findByID: function() {
			for (var cat in model.catData) {
				if (model.catData[cat]["id"] == id) {
					return cat;
					break;
				}
			}
		},
		addClick: function(id) {
			model.activeCat["clicks"] += 1;
		},
		setCat: function(cat) {
			model.catData[model.activeCat.num] = cat;
		}
	};

	controller.init();	*/
});




