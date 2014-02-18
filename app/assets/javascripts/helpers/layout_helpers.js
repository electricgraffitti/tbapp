Ember.Handlebars.helper('mediumAvatar', Ember.View.extend({
	tagName: 'img',
	attributeBindings: ['src'],
	classNames: 'modal_link pointer',

	src: function () {
		return this.get('obj').get('reg_avatar');
	}.property('obj'),

	click: function () {
		var largeImage = "<img id='modal_image' src='" + this.obj.get('original_image') + "'/>";
		Modal.loadModal(largeImage, this.obj.get('story_name'));
	}

}));