TBook.ApplicationView = Ember.View.extend({

	didInsertElement: function () {
		AjaxNotice.initializeGlobalEvents();
		Layouts.resizeAll();
	}

});
