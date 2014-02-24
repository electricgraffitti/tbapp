TBook.Account = DS.Model.extend({
  account_type: DS.attr(),
  user_count: DS.attr(),
  items_count: DS.attr(),
  parts_count: DS.attr(),
  warranties_count: DS.attr(),
  extended_warranties_count: DS.attr(),
  service_records_count: DS.attr(),
  account_details: DS.hasMany('account_detail')
});