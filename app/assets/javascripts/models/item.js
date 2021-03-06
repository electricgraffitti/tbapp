TBook.Item = DS.Model.extend({
  name: DS.attr('string'),
  serial_number: DS.attr('string'),
  make: DS.attr('string'),
  model_name: DS.attr('string'),
  original_cost: DS.attr('number'),
  parts_count: DS.attr('number'),
  purchase_date: DS.attr('date'),
  warranties_count: DS.attr('number'),
  extended_warranties_count: DS.attr('number'),
  reminders_count: DS.attr('number'),
  removal_vendor: DS.attr('string'),
  estimated_weight: DS.attr('number'),
  refrigerant_removal_quantity: DS.attr('number'),
  item_rebate: DS.attr('number'),
  scrap_value: DS.attr('number'),
  capitalization_reason: DS.attr('string'),
  physical_location: DS.attr('string'),
  removal_date: DS.attr('date'),
  created_at: DS.attr('date'),
  purchased_from: DS.attr('string'),
  is_capitalized: DS.attr(),

  location: DS.belongsTo('location'),
  service_records: DS.hasMany('service_record'),
  warranties: DS.hasMany('warranty'),
  parts: DS.hasMany('part'),

  itemName: function() {
    return this.get('name') + ' - ' + this.get('serial_number');
  }.property('name', 'serial_number'),

  modelNumber: Ember.computed.alias('model_name'),

  serviceRecords: Ember.computed.alias('service_records'),
  serialNumber: Ember.computed.alias('serial_number'),

  isCapitalized: Ember.computed.alias('is_capitalized'),
  removalQuantity: Ember.computed.alias('refrigerant_removal_quantity'),

  formattedDate: function () {
    return moment(this.get('purchase_date')).format("MMM Do YYYY");
  }.property('purchase_date'),

  formattedRemovalDate: function () {
    return moment(this.get('removal_date')).format("MMM Do YYYY");
  }.property('removal_date'),

  partCount: function () {
    return this.get('parts.length');
  }.property('parts.length'),

  serviceRecordCount: function () {
    return this.get('service_records.length')
  }.property('service_records.length'),

  warrantyCount: function () {
    return this.get('warranties.length')
  }.property('warranties.length'),

  serviceRecordTotals: function () {
    var serviceRecords = this.get('service_records'),
        serviceTotals = 0;
    serviceRecords.forEach(function(record) {
      serviceTotals += parseFloat(record.get('invoice_amount'));
    });
    return serviceTotals;
  }.property('service_records.length'),

  lifetimeCost: function() {
    var originalCost = this.get('original_cost'),
        serviceCosts = this.get('serviceRecordTotals'),
        totalCosts = parseFloat(originalCost) + parseFloat(serviceCosts);

    return totalCosts - (parseFloat(this.get('scrap_value')) + parseFloat(this.get('item_rebate')));
  }.property('isCapitalized')


});
