TBook.ServiceRecord = DS.Model.extend({
  item: DS.belongsTo('item'),
  //part: DS.belongsTo('part'),
  custom_order_number: DS.attr('string'),
  po_number: DS.attr('string'),
  technician: DS.attr('string'),
  description: DS.attr('string'),
  invoice_amount: DS.attr('number'),
  service_date: DS.attr('date'),
  vendor_name: DS.attr('string'),

  formattedDate: function () {
  	return moment(this.get('service_date')).format("MMM Do YYYY");
  }.property('service_date'),

  orderNumber: Ember.computed.alias('custom_order_number'),
  vendorName: Ember.computed.alias('vendor_name'),
  poNumber: Ember.computed.alias('po_number'),
  serviceTechnician: Ember.computed.alias('technician'),
  serviceDescription: Ember.computed.alias('description'),
  invoiceAmount: Ember.computed.alias('invoice_amount')
});
