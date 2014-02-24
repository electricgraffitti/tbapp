TBook.LocationsRoute = Ember.Route.extend({
  model: function() {
  	return this.store.findAll('location');
  }
});

TBook.LocationsNewRoute = Ember.Route.extend({

	setupController: function(controller){
		this._super(controller);
		controller.set('stateObjs', this.store.findAll('state'))
	}


});

TBook.LocationRoute = Ember.Route.extend({
  model: function(params) {
    return {}
  }
});
