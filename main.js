(function($){ // demonstrates the declaration and instatiation of a minimalist View
	var ListView = Backbone.View.extend({
		el: $('body'), // attaches 'this.el' to an existing element (body)

		events: {
			'click button#add': 'addItem'
		},
		initialize: function(){
			_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

			this.counter = 0;
			this.render(); // not all views are self-rendering. This one is.
		},

		render: function(){
			$(this.el).append("<button id='add'>Add List Item</button>");
			$(this.el).append("<ul></ul>")
			//$(this.el).append("<ul><li>This is Backbone</li></ul>");
		},

		addItem: function(){
			this.counter++;
			$('ul', this.el).append("<li>Counted " + this.counter + " Times</li>");
		}
	});

	var listView = new ListView();
})(jQuery);