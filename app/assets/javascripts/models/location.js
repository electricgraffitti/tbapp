TBook.Location = DS.Model.extend({
  item_count: DS.attr('number'),
  parts_count: DS.attr('number'),
  warranties_count: DS.attr('number'),
  extended_warranties_count: DS.attr('number'),
  name: DS.attr('string'),
  location_number: DS.attr('string'),
  reminders_count: DS.attr('number'),
  user_vendors_count: DS.attr('number'),
  service_records_count: DS.attr('number'),
  location: DS.belongsTo('address'),

  locationName: Ember.computed.alias('name')

});
