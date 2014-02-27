TBook.Address = DS.Model.extend({
  street: DS.attr(),
  city: DS.attr(),
  zipcode: DS.attr(),
  longitude: DS.attr(),
  latitude: DS.attr(),
  state_name: DS.attr(),
  account_detail: DS.belongsTo('account_detail'),
  state: DS.belongsTo('state'),
  location: DS.belongsTo('location'),

  stateName: Ember.computed.alias('state_name')

});