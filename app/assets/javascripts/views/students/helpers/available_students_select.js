Ember.Handlebars.helper('districtStudentsSelect', Ember.Select.extend({
  contentBinding: 'content', // This is set in the router directly using setupController.
  prompt: "Select a student:",
  valueBinding: 'controller.selectedStudentId',
  optionLabelPath: 'content.selectValue',
  optionValuePath: 'content.id',

  didInsertElement: function () {
  	FormElements.customSelects();
  }

}));