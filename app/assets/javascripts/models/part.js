TBook.Part = DS.Model.extend({
  name: DS.attr('string'),
  model_number: DS.attr(),
  make: DS.attr(),
  description: DS.attr(),
  replacement_date: DS.attr('date'),
  service_records_count: DS.attr(),
  account: DS.belongsTo('account'),
  location: DS.belongsTo('location'),
  warranties_count: DS.attr('number'),
  item: DS.belongsTo('item')

});