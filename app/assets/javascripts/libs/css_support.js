TBook.CSS = {

  zebraStripe: function (viewElement) {
    var rowWrap = $(viewElement).find('.striped'),
      evenRows = rowWrap.find('.row').filter(':even');

    if (evenRows.length) {
      evenRows.addClass('even');
    }
  },

  gridDataFormatter: function (gridLabel, gridValue, gridValuePrefix) {
    var formattedLabel = " ";

    if (gridValue == null || gridValue === '') { // Use == here because we want to check for both null or undefined
      gridValue = '';
      gridValuePrefix = '';
    }

    if (gridValuePrefix === '$') {
      gridValue = TBook.Utilities.convertFloatToCurrency(gridValue);
    }

    if (gridValuePrefix === undefined) {
      gridValuePrefix = '';
    }

    formattedLabel = '<span class="grid_label">' + gridLabel + ': </span><span class="grid_value clipped" title="' + gridValuePrefix + gridValue + '">' + gridValuePrefix + gridValue + '</span>';
    return new Handlebars.SafeString(formattedLabel);
  },

  simpleGridDataFormatter: function (gridLabel, gridValue, gridValuePrefix) {
    var formattedLabel = " ";

    if (gridValue == null || gridValue === '') { // Use == here because we want to check for both null or undefined
      gridValue = '';
      gridValuePrefix = '';
    }

    if (gridValuePrefix === '$') {
      gridValue = TBook.Utilities.convertFloatToCurrency(gridValue);
    }

    if (gridValuePrefix === undefined) {
      gridValuePrefix = '';
    }

    formattedLabel = '<span class="grid_label">' + gridLabel + ': </span><span class="grid_value">' + gridValuePrefix + gridValue + '</span>';
    return new Handlebars.SafeString(formattedLabel);
  }

};
