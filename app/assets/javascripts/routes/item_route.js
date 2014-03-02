TBook.ItemsRoute = Ember.Route.extend({
  model: function() {
  	return this.store.all('item');
  }
});

TBook.ItemRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('item', params.item_id);
  }
});

TBook.ItemServiceRecordsRoute = Ember.Route.extend({
  model: function() {
  	return this.store.all('service_record');
  }
});

TBook.ItemServiceRecordRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('service_record', params.service_record_id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    model.set('isSelected', true);
  }

});

TBook.ItemServiceRecordsAddServiceRecordRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    this._super(controller, model);
    var item = this.controllerFor('item').get('model');
    controller.set('serviceRecordItem', item);
  }

});

TBook.ItemServiceRecordsCapitalizeItemRoute = Ember.Route.extend({});

TBook.ItemWarranties = Ember.Route.extend({
  model: function() {
  	return this.store.all('warranties');
  }
});

TBook.ItemWarrantyRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('warranty', params.warranty_id);
  }
});

TBook.ItemWarrantiesAddWarrantyRoute = Ember.Route.extend({});

TBook.AccountItemsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.all('item');
  }
});

TBook.AccountItemRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('item', params.item_id);
  }
});