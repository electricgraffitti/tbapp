TBook.DashboardView = Ember.View.extend({

	templateName: 'dashboard/dashboard',

	didInsertElement: function () {
		AjaxNotice.initializeGlobalEvents();
		Resize.setMainAppViewPort();
		Resize.resizeSections(this.$());
	}

});