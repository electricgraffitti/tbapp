TBook.Address = DS.Model.extend({
  street: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  zipcode: DS.attr(),
  longitude: DS.attr(),
  latitude: DS.attr(),
  account_detail: DS.belongsTo('account_detail'),
  location: DS.belongsTo('location')
});