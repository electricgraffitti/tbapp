TBook.Item = DS.Model.extend({
  name: DS.attr('string'),
  serial_number: DS.attr('string'),
  make: DS.attr('string'),
  model: DS.attr('string'),
  original_cost: DS.attr('number'),
  parts_count: DS.attr('number'),
  warranties_count: DS.attr('number'),
  extended_warranties_count: DS.attr('number'),
  reminders_count: DS.attr('number'),
  estimated_weight: DS.attr('number'),
  refrigerant_removal_quantity: DS.attr('number'),
  scrap_value: DS.attr('number'),
  capitalization_reason: DS.attr('number'),
  physical_location: DS.attr('string'),
  removal_date: DS.attr('date'),
  created_at: DS.attr('date'),
  purchased_from: DS.attr('string'),

  location: DS.belongsTo('location'),
  service_records: DS.hasMany('service_record'),
  warranties: DS.hasMany('warranty'),

  serviceRecords: Ember.computed.alias('service_records')

});
