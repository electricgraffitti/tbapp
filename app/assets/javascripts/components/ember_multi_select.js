TBook.MultiSelectComponent = Ember.Component.extend({

  classNames: ['multi_select_component', 'field'],
  optionsVisible: false,
  onSelection: null,
  focusAction: null,
  requiredProperty: null,
  isRequired: false,
  isInvalid: false,
  currentFocusedOption: null,
  resetOn: false,

  placeholderText: function () {
    if (Ember.isEmpty(this.get('selectedOptions'))) {
      return 'Select one or more';
    } else if (this.get('selectedOptions').length === 1) {
      return Ember.get(this.get('selectedOptions').objectAt(0), 'optionName');
    } else {
      return 'Multiple values selected';
    }
  } .property('selectedOptions.length'),

  filterInput: function () {
    return this.get('placeholderText');
  } .property('placeholderText'),

  filteredOptions: function () {
    var filterValue = this.get('filterInput'),
      completeList = this.get('selectOptions'),
      escapedValue = Nucleus.Utilities.regExpEscape(this.get('filterInput')),
      regex = new RegExp(escapedValue, 'i');

    if (!filterValue || filterValue === this.get('placeholderText')) {
      return this.get('selectOptions');
    }
    return completeList.filter(function (item) {
      return regex.test(item.optionName);
    });
  } .property('filterInput', 'selectOptions.length'),

  resetOptionsList: function () {
    if (this.get('selectedOptions.length') === 0) {
      this.resetActiveStates();
      this.resetHiddenStates();
      this.resetFilters();
      this.set('allSelectedProperty', false);
    }
  } .observes('selectedOptions.length'),

  focusActions: function () {
    this.sendAction('focusAction', this.get('optionsVisible'));
  } .observes('optionsVisible'),

  focusIn: function () {
    if (this.get('optionsVisible')) {
      return false;
    }
    this.set('filterInput', null);
    this.set('optionsVisible', true);
    this.setOptionsPlacement();
  },

  keyDown: function (e) {
    var arrowKey = e.keyCode === 38 ? -1 : e.keyCode === 40 ? 1 : 0, // up or down
      enterKey = e.keyCode === 13;

    // Dont allow certain keyCodes that break the regex filter
    //if (Nucleus.Utilities.nonAlphaNumericInput(e)) {
    //  e.preventDefault();
    //}

    if (arrowKey) {
      this.send('changeSelection', {
        direction: arrowKey
      });
    }

    if (enterKey) {
      this.send('enterSelection');
    }
  },

  mouseLeave: function () {
    this.set('optionsVisible', false);
    this.$('input').blur();
    this.resetFilters();
    this.sendAction('onSelection', this.get('selectedOptions'));
  },

  resetFocus: function () {
    // Need to blur focus because IE is AWESOME!!
    this.$('input').blur();
    this.$('input').focus();
  },

  watchReset: function () {
    this.resetOptionsList();
  } .observes('resetOn').on('init'),

  resetFilters: function () {
    this.set('currentFocusedOption', null);
    this.set('filterInput', this.get('placeholderText'));
  },

  resetActiveStates: function () {
    this.get('filteredOptions').setEach('isActive', false);
  },

  resetHiddenStates: function () {
    this.get('selectOptions').setEach('isHidden', false);
  },

  getCurrentIndex: function (direction) {
    var currentObject = this.get('currentFocusedOption'),
        optionsList = this.get('filteredOptions'),
        optionsCount = this.get('filteredOptions').get('length');

    if (Ember.isEmpty(currentObject)) {
      return optionsCount - 1;
    } else {
      return optionsList.indexOf(currentObject) + direction == -1 ? optionsCount + direction : (optionsList.indexOf(currentObject) + direction) % optionsCount;
    }
  },

  nextVisibleObject: function (idx, direction) {
    var optionsList = this.get('filteredOptions'),
        optionsCount = this.get('filteredOptions').get('length'),
        currentObject = optionsList.objectAt(idx);

    if (Ember.get(currentObject, 'isHidden')) {
      idx = idx + direction == -1 ? optionsCount + direction : (optionsList.indexOf(currentObject) + direction) % optionsCount;
      return this.nextVisibleObject(idx, direction);
    } else {
      return currentObject;
    }
  },

  setActiveObject: function (selectedObject) {
    this.resetActiveStates();
    Ember.set(selectedObject, 'isActive', true);
    this.set('currentFocusedOption', selectedObject);
    this.scrollToActiveObject();
  },

  scrollToActiveObject: function () {
    $('.available_options').scrollTo('.is_active', 50, {
      offset: -150
    });
  },

  setOptionsPlacement: function () {
    var container = this.$(),
      inputElement = container.find('input'),
      filters = container.find('.select_options'),
      targetPosition = inputElement.offset().top + inputElement.outerHeight();

    filters.css({
      top: targetPosition
    });
  },

  watchSelection: function () {
    this.sendAction('onSelection', this.get('selectedOptions'));
  } .observes('selectedOptions.@each'),

  actions: {

    selectAll: function () {
      this.set('selectedOptions', []);
      this.get('selectedOptions').pushObjects(this.get('selectOptions'));
      this.get('selectOptions').forEach(function (option) {
        Ember.set(option, 'isHidden', true);
      });
      this.resetActiveStates();
      this.set('allSelectedProperty', true);
    },

    clearAll: function () {
      this.set('selectedOptions', []);
      this.resetFocus();
    },

    removeFromSelectedList: function (option) {
      this.get('selectedOptions').removeObject(option);
      Ember.set(option, 'isHidden', false);
      this.set('allSelectedProperty', false);
      this.resetFilters();
      this.resetFocus();
    },

    enterSelection: function () {
      var currentSelected = this.get('currentFocusedOption');

      if (!Ember.isEmpty(currentSelected)) {
        this.send('optionIsSelected', currentSelected);
      }
    },

    changeSelection: function (params) {
      if (Ember.typeOf(params) === 'object' && params.hasOwnProperty('direction')) {
        this.setActiveObject(this.nextVisibleObject(this.getCurrentIndex(params.direction), params.direction));
      }
    },

    optionIsSelected: function (option) {
      if (this.get('selectedOptions').contains(option)) {
        return;
      }
      this.get('selectedOptions').pushObject(option);
      Ember.set(option, 'isHidden', true);
      Ember.set(option, 'isActive', false);
      this.resetFilters();
      this.set('filterInput', null);
      this.resetFocus();
    },

    focusInput: function () {
      this.resetFocus();
    }
  }

});