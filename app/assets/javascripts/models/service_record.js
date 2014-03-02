TBook.ServiceRecord = DS.Model.extend({
  item: DS.belongsTo('item'),
  //part: DS.belongsTo('part'),
  custom_order_number: DS.attr('string'),
  po_number: DS.attr('string'),
  technician: DS.attr('string'),
  description: DS.attr('string'),
  invoice_amount: DS.attr('number'),
  service_date: DS.attr('date'),

  formattedDate: function () {
  	return moment(this.get('service_date')).format("ddd, MMM Do YYYY, h:mm:ss a");
  }.property('service_date')

});
