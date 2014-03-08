TBook.DashboardRoute = Ember.Route.extend({
  beforeModel: function () {
    this.transitionTo('locations');
  },

  model: function () {
    return {}
  }
});
