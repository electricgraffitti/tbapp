TBook.Warranty = DS.Model.extend({
  location: DS.belongsTo('location'),
  item: DS.belongsTo('item'),
  part: DS.belongsTo('part'),
  parts_exp: DS.attr('string'),
  labor_exp: DS.attr('string'),
  terms: DS.attr('string'),
  warranty_start_date: DS.attr('string'),
  warranty_end_date: DS.attr('string'),
  warranty_provider: DS.attr('string'),
  terms: DS.attr('string'),

  formattedEndDate: function () {
    return moment(this.get('warranty_end_date')).format("M/D/YY");
  }.property('warranty_end_date'),

  formattedStartDate: function(){
    return moment(this.get('warranty_start_date')).format("M/D/YY");
  }.property('warranty_start_date'),

  formattedPartsExp: function () {
    return moment(this.get('parts_exp')).format("M/D/YY");
  }.property('parts_exp'),

  formattedLaborExp: function () {
    return moment(this.get('labor_exp')).format("M/D/YY");
  }.property('labor_exp')

});
