(function($){ // illustrates how to use a Collection of Models to store data and tie changes to a View
	var Item = Backbone.Model.extend({
		defaults: {
			part1: 'This Is',
			part2: 'Backbone'
		}
	});

	var List = Backbone.Collection.extend({
		model: Item
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

		addItem: function(){ // now works only for models/collections, View updates delegated to add listener ('appendItem()')
			this.counter++;
			var item = new Item();
			item.set({
				part2: item.get('part2') + " " + this.counter // modify item defaults
			});
			this.collection.add(item); // add item to collection; view is updated via event 'add'
			// $('ul', this.el).append("<li>Counted " + this.counter + " Times</li>");
		},

		appendItem: function(item){ // this is triggered by collection event add and handles visual update
			$('ul', this.el).append("<li>" + item.get('part1')+" "+item.get('part2') + "</li>");
		}
	});

	var listView = new ListView();
})(jQuery);