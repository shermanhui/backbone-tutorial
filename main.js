(function($){ // illustrates how to delegate the rendering of a Model to a dedicated View
	var Item = Backbone.Model.extend({
		defaults: {
			part1: 'This Is',
			part2: 'Backbone'
		}
	});

	var List = Backbone.Collection.extend({
		model: Item
	});

	var ItemView = Backbone.View.extend({ // Responsible for rendering each individual Item
		tagName: 'li', // name of (orphan) root tag in this.el

		initialize: function() {
			_.bindAll(this, 'render'); // every fn that uses 'this' as the current object should be included here
		},
		render: function(){
			$(this.el).html('<span>'+this.model.get('part1')+' '+this.model.get('part2')+'</span>');
			return this; // for chainable calls, like .render().el
		}
	});

	var ListView = Backbone.View.extend({
		el: $('body'),

		events: {
			'click button#add': 'addItem'
		},

		initialize: function(){ // now instantiates a Collection and binds its add event to own method 'appendItem'
			_.bindAll(this, 'render', 'addItem', 'appendItem'); // every fn that uses 'this' as the current obj should be in here!

			this.collection = new List();
			this.collection.bind('add', this.appendItem); // collection event binder

			this.counter = 0;
			this.render();
		},

		render: function(){
			var self = this; //save reference to 'this' so it can be accessed within the scope of callback
			$(this.el).append("<button id='add'>Add List Item</button>");
			$(this.el).append("<ul></ul>")
			_(this.collection.models).each(function(item){ //in case collection is not empty
				self.appendItem(item);
			}, this); // reference to 'this' was saved above
		},

		addItem: function(){
			this.counter++;
			var item = new Item();
			item.set({
				part2: item.get('part2') + " " + this.counter // modify item defaults
			});
			this.collection.add(item);
		},

		appendItem: function(item){ // no longer responsible for rendering an individual Item. This is now delegated to render() in each of the ItemView instance
			var itemView = new ItemView({
				model: item
			});
			$('ul', this.el).append(itemView.render().el);
		}
	});

	var listView = new ListView();
})(jQuery);