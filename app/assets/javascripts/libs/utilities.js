TBook.Utilities = {

  externalControllerLookup: function (name) {
    return TBook.__container__.lookup('controller:' + name);
  },

  capitalizeFirstLetter: function(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
  },

  lowercaseString: function (str) {
    return str.toLowerCase();
  },

  getDateYear: function () {
    var d = new Date();
    return d.getFullYear();
  },

  sortBy: function (field, reverse, primer) {
    var key = function (x) { return primer ? primer(x.get(field)) : x.get(field); };

    return function (a, b) {
      var A = key(a), B = key(b);
      return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
    };
  },

  filterBy: function (field, value, array) {
    var ret = [];
    array.forEach(function (item) {
      if (item.get(field) === value) {
        ret.push(item);
      }
    });
    return ret;
  },

  convertFloatToCurrency: function (theFloat) {
    return theFloat.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  regExpEscape: function(s) {
    return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08');
  },

  nonAlphaNumericInput: function (event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) // Numbers
         || (event.keyCode >= 65 && event.keyCode <= 90) // Letters
         || (event.keyCode >= 96 && event.keyCode <= 105) // 10 Key Numbers
         || (event.keyCode == 46 // Delete
            || event.keyCode == 32 // Backspace
            || event.keyCode == 8 // Backspace
            || event.keyCode == 9 // Tab
            || event.keyCode == 27 // Escape
            || event.keyCode == 13 // Enter
            || event.keyCode == 189 // Dash
            || event.keyCode == 190 // Period
            )
         || (event.keyCode >= 35 && event.keyCode <= 40)
       ) {
      return false;
    } else {
      event.preventDefault();
      return true;
    }
  },

  onlyNumericInput: function (view, event, returnType) {
    // Allow: backspace, delete, tab, escape, and enter
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
    // Allow: Ctrl+A
    (event.keyCode == 65 && event.ctrlKey === true) ||
    // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39)) {
      view.set('isError', false);
      // let it happen, don't do anything
      return;
    } else {
      // Ensure that it is a number and stop the keypress
      if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        view.set('isError', true);
        TBook.Notice.errorNotice('Only numbers allowed.');
        event.preventDefault();
      }
    }
  },

  onlyDecimalInput: function (view, event) {
    // Allow: backspace, delete, tab, escape, and enter
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
    // Allow: Ctrl+A
    (event.keyCode == 65 && event.ctrlKey === true) ||
    // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39) ||
    // Allow decimal
    (event.keyCode == 190 || event.keyCode == 110)) {
      view.set('isError', false);
      // let it happen, don't do anything
      return;
    } else {
      // Ensure that it is a number and stop the keypress
      if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        view.set('isError', true);
        TBook.Notice.errorNotice('Only numbers allowed.');
        event.preventDefault();
      }
    }
  },

  currencyToDecimal: function (value) {
    if (typeof value === 'number') {
      return value;
    } else {
      return Number(value.replace(/[^0-9\.]+/g, ""));
    }
  },

  kc: function (callback) {
    var keys = [],
        konami = '38,38,40,40,37,39,37,39,66,65';

    $(document).keydown(function (event) {
      keys.push(event.keyCode);
      if (keys.toString().indexOf(konami) >= 0) {
        callback();
        keys = [];
      }
    });
  },

  blue: function () {
    var keys = [],
        konami = '38,38,40,40,37,39,37,39,66,76,85,69';

    $(document).keydown(function (event) {
      keys.push(event.keyCode);
      if (keys.toString().indexOf(konami) >= 0) {
        $('body').addClass('verisk_blue');
        keys = [];
      }
    });
  },

  eeOne: function () {
    TBook.Utilities.kc(TBook.Utilities.hammerTime);
  },

  eeTwo: function () {
    TBook.Utilities.kc(TBook.Utilities.porkins);
  },

  hammerTime: function (event) {
    var easterEgg = "<img id='eeOwo' class='eetwo' src='Content/images/eeone.gif'/>",
        injectElement = $('#eewrap');

    injectElement.html(easterEgg);
    $('#eeOne').toggleClass('eeone');

    $('#eeOne').on('click', function () {
      injectElement.html('');
    });
  },

  porkins: function (event) {
    var easterEgg = "<img id='eeTwo' class='eetwo' src='Content/images/wayne.gif'/>",
        injectElement = $('#eewrap');

    injectElement.html(easterEgg);
    $('#eeTwo').toggleClass('eetwo');

    $('#eeTwo').on('click', function () {
      injectElement.html('');
    });
  }

}
