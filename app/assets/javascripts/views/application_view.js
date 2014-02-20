TBook.ApplicationView = Ember.View.extend({

	didInsertElement: function () {
		AjaxNotice.initializeGlobalEvents();
		Resize.setMainAppViewPort();
	}

});
