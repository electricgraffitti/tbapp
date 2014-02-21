TBook.LocationsController = Ember.ArrayController.extend({
  
  emptyLocationsMessage: 'There are no locations available.',

  visibleLocations: Ember.computed.alias('content')

});

TBook.LocationsNewController = Ember.Controller.extend({
});

TBook.LocationController = Ember.ObjectController.extend({
});
