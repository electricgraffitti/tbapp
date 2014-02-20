TBook.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('user', 1);
  }
});
