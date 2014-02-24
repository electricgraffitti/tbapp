TBook.CustomSelectComponent = Ember.Component.extend({

  classNames: ['custom_select_component', 'field'],
  defaultOption: null,
  selectedOption: 'Please Select',
  optionsVisible: false,
  selectOptions: Em.A(),
  onSelection: null,
  focusAction: null,
  requiredProperty: null,
  isRequired: false,
  resetOn: false,
  hasRendered: false,

  setDefaultValue: function () {
    var defaultOption = this.get('defaultOptionName'),
        selectedOption = this.get('selectedOption');

    this.set('defaultOption', defaultOption || selectedOption);

    if (!this.get('selectedOption') && defaultOption) {
      this.set('selectedOption', defaultOption);
    }
  } .on('init'),

  focusActions: function () {
    this.sendAction('focusAction', this.get('optionsVisible'));
  } .observes('optionsVisible'),

  isInvalid: false,

  // honestly this should work as a property instead of observes, but it isn't
  watchInvalid: function () {
    var isInvalid = this.get('notifyInvalid') && this.get('requiredProperty');
    this.set('isInvalid', isInvalid);
  } .observes('notifyInvalid', 'requiredProperty'),

  watchResetState: function () {
    this.set('selectedOption', this.get('defaultOption'));
  } .observes('resetOn'),

  setOptionsPlacement: function () {
    var container = this.$(),
      inputElement = container.find('.selected_option'),
      filters = container.find('.select_options'),
      targetPosition = inputElement.offset().top + inputElement.outerHeight();

    filters.css({
      top: targetPosition,
      position: 'fixed'
    });
  },

  actions: {

    toggleOptionsList: function () {
      this.set('hasRendered', true);
      this.setOptionsPlacement();
      this.toggleProperty('optionsVisible');
    },

    optionIsSelected: function (option) {
      this.set('selectedOption', option.optionName);
      this.toggleProperty('optionsVisible');
      this.sendAction('onSelection', option);
    },

    hideOptionsList: function () {
      this.set('optionsVisible', false);
    }
  }

});
