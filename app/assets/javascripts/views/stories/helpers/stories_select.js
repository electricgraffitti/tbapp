Ember.Handlebars.helper('storySelect', Ember.Select.extend({
  contentBinding: 'this.content',
  prompt: "Select a story:",
  valueBinding: 'this.controller.story_id',
  optionLabelPath: 'content.nameForSelect',
  optionValuePath: 'content.id',
  classNames: ['select'],


  didInsertElement: function () {
  	FormElements.customSelects();
  }

}));