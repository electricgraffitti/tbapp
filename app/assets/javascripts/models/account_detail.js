TBook.AccountDetail = DS.Model.extend({
  company_name: DS.attr(),
  business_type: DS.attr(),
  main_contact: DS.attr(),
  business_phone: DS.attr(),
  business_fax: DS.attr(),
  business_hours: DS.attr(),
  account: DS.belongsTo('account')
});