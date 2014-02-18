Ember.Handlebars.helper('assignmentStorySelector', Ember.Select.extend({
  contentBinding: 'this.content',
  prompt: "Find assignment by story",
  valueBinding: 'this.controller.assignmentStory',
  optionLabelPath: 'content.nameForSelect',
  optionValuePath: 'content',
  classNames: ['select'],


  didInsertElement: function () {
  	FormElements.customSelects();
  }

}));

Ember.Handlebars.helper('assignmentSelect', Ember.Select.extend({
  contentBinding: 'this.content',
  prompt: "Select an assignment:",
  valueBinding: 'this.controller.lesson_id',
  optionLabelPath: 'content.nameForSelect',
  optionValuePath: 'content.id',
  classNames: ['select'],


  didInsertElement: function () {
  	FormElements.customSelects();
  }

}));