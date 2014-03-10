TBook.LocationsRoute = Ember.Route.extend({
  model: function() {
  	return this.store.findAll('location');
  }
});

TBook.LocationsNewRoute = Ember.Route.extend({
	setupController: function(controller, model){
		this._super(controller, model);
    var locations = this.controllerFor('locations').get('locationObjects'),
        currentSelectedObject = locations.filterBy('isSelected', true)[0];
    controller.set('availableLocations', locations);
		controller.set('stateObjs', this.store.findAll('state'));
    if (currentSelectedObject) {
      controller.set('currentSelectedObject', currentSelectedObject);
    } else {
      controller.set('currentSelectedObject', locations.objectAt(0));
    }

	}
});

TBook.LocationRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('location', params.location_id);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    model.set('isSelected', true);
  },
  afterModel: function(model, transition) {
    this.transitionTo('location_items', model);
  },

  actions: {
    willTransition: function(transition) {
      model.set('isSelected', false);
    }
  }
});

TBook.LocationItemsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('location').get('items');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('location', this.controllerFor('location').get('model'));
  },

  actions: {
    selectItemRow: function (item) {
      this.transitionTo('item_service_records', item);
    }
  }
});

TBook.LocationNewLocationItemRoute = Ember.Route.extend({
  model: function(params) {
    return {};
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    var location = this.controllerFor('location').get('model');
    controller.set('itemLocation', location);
  }

});

TBook.LocationWarrantiesRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('location').get('warranties');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('location', this.controllerFor('location').get('model'));
  },

  actions: {
    selectItemRow: function (item) {
      this.transitionTo('item_warranties', item);
    }
  }
});

TBook.LocationServiceRecordsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('location').get('service_records');
  }
});

