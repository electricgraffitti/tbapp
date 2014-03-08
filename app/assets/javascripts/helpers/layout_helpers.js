/**
Truncates long strings

@method shorten
@for Handlebars
**/
Handlebars.registerHelper('shorten', function (property, options) {
  return Ember.Handlebars.get(this, property, options).truncate(35);
});

/**
Creates a looper method to repeat a piece of html. 

@method times
@for Handlebars
**/
Handlebars.registerHelper('times', function (n, block) {
  var accum = '';
  for (var i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});

/**
Uppercases a value in a Handlebars expression

@method upcase
@for Handlebars
**/
Handlebars.registerHelper('upcase', function (value) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return escaped.toUpperCase();
});

/**
Formats Float to Currency a value in a Handlebars expression

@method currency
@for Handlebars
**/
// Ember.Handlebars.helper('currency', function (value) {
//   var returnString = "$" + value;
//   return new Handlebars.SafeString(returnString);
// });

Ember.Handlebars.helper('currency', function(value) {
  var p = parseFloat(value).toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
});

Handlebars.registerHelper('emptyComponentMessage', function (message) {
  return new Handlebars.SafeString('<p class="empty_message">' + this.get(message) + '.</p>');
});


Ember.Handlebars.helper('replaceText', function (original, find, replace) {
  return original.replace(new RegExp(find, 'g'), replace);
});
