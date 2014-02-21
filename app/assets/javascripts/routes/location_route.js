TBook.LocationsRoute = Ember.Route.extend({
  model: function() {
  	return Em.A();
  }
});

TBook.LocationsNewRoute = Ember.Route.extend();

TBook.LocationRoute = Ember.Route.extend({
  model: function(params) {
    return {}
  }
});
