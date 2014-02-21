TBook.ItemsRoute = Ember.Route.extend({
  model: function() {
  	return Em.A();
  }
});

TBook.ItemRoute = Ember.Route.extend({
  model: function(params) {
    return {}
  }
});