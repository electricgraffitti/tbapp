TBook.PublicPosterComponent = Ember.Component.extend({

	displayObjectUrl: function () {
		return this.get('displayObject.full_display');
	}.property('displayObject')
	
});


