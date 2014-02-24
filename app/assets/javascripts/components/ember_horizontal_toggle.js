TBook.HorizontalToggleComponent = Ember.Component.extend({

	tagName: 'section',
	classNames: ['toggle_bar', 'horizontal_toggle', 'unselectable'],

	isOpen: true,

	click: function () {
		this.toggleProperty('isOpen');
		this.sendAction('clickAction');
	},

	openToggleFromParent: function () {
		this.set('isOpen', this.get('openToggle'));
	}.observes('openToggle')

});