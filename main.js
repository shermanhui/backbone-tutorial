(function($){ // demonstrates the declaration and instatiation of a minimalist View
	var ListView = Backbone.View.extend({
		el: $('body'), // attaches 'this.el' to an existing element (body)
		initialize: function(){
			_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

			this.render(); // not all views are self-rendering. This one is.
		},

		render: function(){
			$(this.el).append("<ul><li>This is Backbone</li></ul>");
		}
	});

	var listView = new ListView();
})(jQuery);