TBook.ApplicationRoute = Ember.Route.extend({
  model: function () {
  	this.store.findAll('state');
    return this.store.find('user', 1);
  },

  afterModel: function (model, transition) {
  	this.transitionTo('locations');
  }
});
