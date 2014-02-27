TBook.LocationsRoute = Ember.Route.extend({
  model: function() {
  	return this.store.findAll('location');
  }
});

TBook.LocationsNewRoute = Ember.Route.extend({

	setupController: function(controller){
		this._super(controller);
    var locations = this.controllerFor('locations').get('locationObjects');
    controller.set('availableLocations', locations);
		controller.set('stateObjs', this.store.findAll('state'));
	}

});

TBook.LocationRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('location', params.location_id);
  },

  afterModel: function(model, transition) {
    this.transitionTo('location_items', model);
  }

});

TBook.LocationItemsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('location').get('items');
  },

  setupController: function (controller, model) {
    this._super();
    controller.set('location', this.controllerFor('location').get('model'));
  }

});

TBook.LocationNewLocationItemRoute = Ember.Route.extend({
  model: function(params) {
    return Em.A();
  }
});

TBook.LocationWarrantiesRoute = Ember.Route.extend({
  model: function(params) {
    return Em.A();
  }
});

TBook.LocationServiceRecordsRoute = Ember.Route.extend({
  model: function(params) {
    return Em.A();
  }
});

