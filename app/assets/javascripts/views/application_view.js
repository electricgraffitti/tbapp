TBook.ApplicationView = Ember.View.extend({

	didInsertElement: function () {
		TBook.AjaxNotice.initializeGlobalEvents();
		Layouts.resizeAll();
	}

});
