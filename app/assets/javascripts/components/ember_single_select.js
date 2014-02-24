TBook.SingleSelectComponent = Ember.Component.extend({

  classNames: ['custom_select_component', 'custom_select_component_type_ahead', 'form-control'],
  optionsVisible: false,

  selectedOption: null,
  defaultOptionName: null,
  selectOptions: Em.A(),
  onSelection: null,
  focusAction: null,
  requiredProperty: null,
  isRequired: false,
  resetOn: false,
  maxItems: 10,

  filter: null,

  // this might need to change, if the list changes underneath us
  defaultOption: function () {
    var defaultOptionName = this.get('defaultOptionName'),
        options = this.get('selectOptions'),
        selectedOptions = defaultOptionName ? options.filterBy('optionName', defaultOptionName) : options,
        selectedOption = selectedOptions.get('firstObject');

    options.forEach(function (option) {
      delete option.isActive;
    });

    return selectedOption;
  } .property(),

  setDefaultValue: function () {
    //be careful, I'm intentionally making default option fire
    var defaultOption = this.get('defaultOption') || { optionName: 'Please Select' },
        selectedOption = this.get('selectedOption');


    if (!this.get('selectedOption')) {
      this.set('selectedOption', defaultOption);
      this.set('filter', defaultOption.optionName);
    } else {
      this.set('filter', selectedOption.optionName);
    }
  } .on('init'),

  visibleOptions: function () {
    var filter = TBook.Utilities.regExpEscape(this.get('filter')),
        regex = new RegExp(filter, 'i'),
        options = this.get('selectOptions'),
        self = this;

    if (filter) {
      options = options.filter(function (item) {
        return item.optionName.match(regex);
      });
    }
    this.resetHighlightedItem();
    options = options.slice(0, this.get('maxItems'));
    Ember.run.next(function () { self.changeSelectedItem(1); });

    return options;
  } .property('selectOptions.length', 'filter'),

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
    this.resetHighlightedItem();
    var defaultOption = this.get('defaultOption');
    this.set('selectedOption', defaultOption);
    this.set('filter', defaultOption.optionName);
  } .observes('resetOn'),

  setOptionsPlacement: function () {
    var container = this.$(),
      inputElement = container.find('input'),
      filters = container.find('.select_options'),
      targetPosition = inputElement.offset().top + inputElement.outerHeight();

    filters.css({
      top: targetPosition
    });
  },

  highlightIndex: -1,
  highlightObject: null,

  resetHighlightedItem: function () {
    this.clearHighlightObjectActive();
    this.set('highlightIndex', -1);
    this.set('highlightObject', null);
  },

  clearHighlightObjectActive: function () {
    var item = this.get('highlightObject');

    if (item) {
      Em.set(item, 'isActive', false);
    }
  },

  changeSelectedItem: function (increment) {
    var selectedIndex = this.get('highlightIndex'),
          len = this.get('visibleOptions.length'),
          item;

    this.clearHighlightObjectActive();
    selectedIndex += increment;

    if (selectedIndex < 0) {
      selectedIndex = len - 1;
    }

    if (selectedIndex >= 0 && len > 0) {
      selectedIndex = selectedIndex % len;
      item = this.get('visibleOptions').objectAt(selectedIndex);
      Em.set(item, 'isActive', true);
      this.set('highlightIndex', selectedIndex);
      this.set('highlightObject', item);
      
    }
    this.scrollToActiveObject();
  },

  keyDown: function (e) {
    var arrowKey = e.keyCode === 38 ? -1 : e.keyCode === 40 ? 1 : 0, // up or down
      enterKey = e.keyCode === 13;

    //// Dont allow certain keyCodes that break the regex filter
    //if (Nucleus.Utilities.nonAlphaNumericInput(e)) {
    //  e.preventDefault();
    //}

    if (arrowKey) {
      this.changeSelectedItem(arrowKey);
    }

    if (enterKey) {
      this.send('optionIsSelected', this.get('highlightObject'));
      return false;
    }
  },

  scrollToActiveObject: function () {
    $('.select_options').scrollTo('.is_active', 50, {
      offset: -150
    });
  },

  mouseLeave: function () {
    if (!this.get('optionsVisible')) {
      return;
    }
    this.leaveSelect();
    var selectedItem = this.get('initialOption') || this.get('defaultOption');
    if (selectedItem) {
      this.send('optionIsSelected', selectedItem);
    }
  },

  leaveSelect: function () {
    this.set('optionsVisible', false);
    this.$('input').blur();
  },

  focusIn: function () {
    var visible = this.get('optionsVisible');
    if (visible) {
      return false;
    }
    this.set('initialOption', this.get('selectedOption'));
    this.set('filter', "");
    this.setOptionsPlacement();
    this.set('optionsVisible', true);
  },

  actions: {

    optionIsSelected: function (option) {
      option = option || this.get('defaultOption');
      this.set('highlightObjet', option);
      this.set('selectedOption', option);
      this.leaveSelect();
      this.sendAction('onSelection', option);
      this.set('filter', option.optionName);
    },

    killHighlightSelected: function () {
      this.resetHighlightedItem();
    },

    toggleOpenClose: function () {
      var visible = this.get('optionsVisible'),
          ie8 = $('html').is('.ie8');
      
      if (visible && !ie8) {
        this.mouseLeave();
      } else {
        // Supporting old browsers sucks
        this.focusIn();
        this.$('input').focus();
      }
    }
  }


});
