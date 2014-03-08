TBook.Location = DS.Model.extend({
  account_id: DS.attr(),
  item_count: DS.attr('number'),
  parts_count: DS.attr('number'),
  warranties_count: DS.attr('number'),
  extended_warranties_count: DS.attr('number'),
  name: DS.attr('string'),
  location_number: DS.attr('string'),
  reminders_count: DS.attr('number'),
  user_vendors_count: DS.attr('number'),
  service_records_count: DS.attr('number'),
  address: DS.belongsTo('address'),
  account: DS.belongsTo('account'),
  items: DS.hasMany('item'),
  warranties: DS.hasMany('warranty'),
  service_records: DS.hasMany('service_record'),

  locationName: Ember.computed.alias('name'),
  locationNumber: Ember.computed.alias('location_number'), 
  locationState: Ember.computed.alias('address.stateName'),

  itemCount: function() {
    return this.get('items.length');
  }.property('items.length'),

  warrantyCount: function() {
    return this.get('warranties.length');
  }.property('warranties.length'),

  serviceRecordCount: function() {
    return this.get('service_records.length');
  }.property('service_records.length'),

});
