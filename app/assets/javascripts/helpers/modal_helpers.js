Ember.Handlebars.helper('modalImageLink', Ember.View.extend({
	template: Ember.Handlebars.compile('View large image'),
	classNames: 'modal_link pointer',

	click: function () {
		var largeImage = "<img src='" + this.obj.get('original_image') + "'/>";
		Modal.loadModal(largeImage, this.obj.get('resource_name'));
	}

}));

Ember.Handlebars.helper('modalLinkPosterWrap', Ember.View.extend({
	tagName: 'img',
	attributeBindings: ['src'],
	classNames: 'modal_link pointer',

	src: function () {
		return this.get('obj').get('original_image');
	}.property('obj'),

	click: function () {
		var largeImage = "<img id='modal_image' src='" + this.obj.get('original_image') + "'/>";
		Modal.loadModal(largeImage, this.obj.get('story_name'));
	}

}));

Ember.Handlebars.helper('modalLinkCoverArtWrap', Ember.View.extend({
	tagName: 'img',
	attributeBindings: ['src'],
	classNames: 'modal_link pointer',

	src: function () {
		return this.get('obj.model').get('reg_avatar');
	}.property('obj.model'),

	click: function () {
		var largeImage = "<img id='modal_image' src='" + this.obj.get('original_image') + "'/>";
		Modal.loadModal(largeImage, this.obj.get('story_name'));
	}

}));

Ember.Handlebars.helper('modalLinkImageWrap', Ember.View.extend({
	tagName: 'img',
	attributeBindings: ['src'],
	classNames: 'modal_link pointer',

	src: function () {
		return this.obj.get('small_image');
	}.property(),

	click: function () {
		var largeImage = "<img id='modal_image' src='" + this.obj.get('original_image') + "'/>";
		Modal.loadModal(largeImage, this.obj.get('resource_name'));
	}

}));

Ember.Handlebars.helper('modalVideoLink', Ember.View.extend({
	template: Ember.Handlebars.compile('View video'),
	classNames: 'modal_link pointer',

	click: function () {
		var videoTag = '<video id="msmapp_video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360" poster="' + this.obj.get('thumbnail_url') + '"><source src="' + this.obj.get('video_url') + '" type="video/mp4" /></video>';
		Modal.loadModal(videoTag, this.obj.get('resource_name'));
	}

}));

Ember.Handlebars.helper('modalLinkVideoWrap', Ember.View.extend({
	tagName: 'img',
	attributeBindings: ['src'],
	classNames: 'modal_link pointer video_thumb',

	src: function () {
		return this.obj.get('thumbnail_url');
	}.property(),

	click: function () {
		var videoTag = '<video id="msmapp_video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360" poster="' + this.obj.get('thumbnail_url') + '"><source src="' + this.obj.get('video_url') + '" type="video/mp4" /></video>';
		Modal.loadModal(videoTag, this.obj.get('resource_name'));
	}

}));