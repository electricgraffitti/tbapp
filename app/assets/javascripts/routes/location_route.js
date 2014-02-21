Msmapp.LocationsRoute = Ember.Route.extend({
  model: function() {
  	return Em.A();
  }
});

Msmapp.LocationsNewRoute = Ember.Route.extend();

Msmapp.LocationRoute = Ember.Route.extend({
  model: function(params) {
    return {}
  }
});