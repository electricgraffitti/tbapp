TBook.Part = DS.Model.extend({
  name: DS.attr('string'),
  vendor_name: DS.attr('string'),
  model_number: DS.attr(),
  make: DS.attr(),
  description: DS.attr(),
  replacement_date: DS.attr('date'),
  service_records_count: DS.attr(),
  account: DS.belongsTo('account'),
  location: DS.belongsTo('location'),
  warranties_count: DS.attr('number'),
  item: DS.belongsTo('item'),

  formattedReplacementDate: function () {
    return moment(this.get('replacement_date')).format('M/D/YY');
  }.property('replacement_date')

});