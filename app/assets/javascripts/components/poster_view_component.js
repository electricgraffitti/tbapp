TBook.PosterViewComponent = Ember.Component.extend({
	// displayObject objectRoute collectionCount collection

	displayObjectUrl: function () {
		return this.get('displayObject.full_display');
	}.property('displayObject')
	

});


