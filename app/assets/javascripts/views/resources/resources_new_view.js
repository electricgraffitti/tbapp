TBook.ResourcesNewView = Ember.View.extend({

	templateName: 'resources/new',

	didInsertElement: function() {
		Resize.setAllContentAreas();
    this.$('input:first').focus();
  }

});