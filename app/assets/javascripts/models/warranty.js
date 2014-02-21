TBook.Warranty = DS.Model.extend({
  location: DS.belongsTo('location'),
  item: DS.belongsTo('item'),
  part: DS.belongsTo('part'),
  parts_exp: DS.attr('number'),
  terms: DS.attr('string'),
  warranty_start_date: DS.attr('date'),
  warranty_end_date: DS.attr('date'),
  warranty_provider: DS.attr('string')

});
