TBook.View = Ember.View.extend({

	classNames: ['j-resize-view'],

	didInsertElement: function() {
		Layouts.resizeAll();
	}

});

TBook.ColumnView = TBook.View.extend({

	didInsertElement: function() {
		this._super();
	}

});

TBook.FormView = TBook.View.extend({

	didInsertElement: function() {
		this._super();
		this.$('input:first').focus();
	}

});