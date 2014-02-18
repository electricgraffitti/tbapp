Ember.Handlebars.helper('resourceSelect', Ember.Select.extend({
  contentBinding: 'this.content',
  prompt: "Select a resource:",
  valueBinding: 'this.controller.resource_id',
  optionLabelPath: 'content.nameForSelect',
  optionValuePath: 'content.id',
  classNames: ['select'],


  didInsertElement: function () {
  	FormElements.customSelects();
  }

}));