(function($){ // Introduce two new Model actions (swap/delete), illustrate how actions can be handled within a Model's view

	Backbone.sync = function(method, model, success, error){ //Overrides persistence storage w/ dummy function, enables Model.destroy() w/o raising error
		success();
	}

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

		events: {
			'click span.swap': 'swap',
			'click span.delete': 'remove'
		},

		initialize: function() { //now binds change and remove to corresponding handlers
			_.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every fn that uses 'this' as the current object should be included here

			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},

		render: function(){ // now includes two extra spans corresponding to the swap/delete actions
			$(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
			return this; // for chainable calls, like .render().el
		},

		unrender: function(){ // Makes Model remove itself from the DOM.
			$(this.el).remove();
		},

		swap: function(){ // will interchange an Item's attributes. Then .set() model function is called, the event change will be triggered
			var swapped = {
				part1: this.model.get('part2'),
				part2: this.model.get('part1')
			};
			this.model.set(swapped);
		},

		remove: function(){ //simply use the destroy() method to remove from colleciton. Normally this also deletes the record from persistent storage, but we have overridden that earlier
			this.model.destroy();
		}
	});

	var ListView = Backbone.View.extend({ // bc the new features are intrinsic to each Item, there isn't a need to change ListView
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