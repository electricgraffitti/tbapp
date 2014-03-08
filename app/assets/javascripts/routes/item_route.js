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

TBook.ItemServiceRecordsRoute = Ember.Route.extend(
  TBook.ListActions, {

  model: function() {
  	return this.modelFor('item').get('service_records');
  },

  afterModel: function(model, transition) {
    var firstRecord = model.objectAt(0);
    if(model.get('length')) {
      this.setSelectedObject(firstRecord, model);
      this.transitionTo('item_service_record', firstRecord);
    }
  }

});

TBook.ItemServiceRecordRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('service_record', params.service_record_id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    model.set('isSelected', true);
  },

  actions: {
    willTransition: function(transition) {
      model.set('isSelected', false);
    }
  }
});

TBook.ItemServiceRecordsAddServiceRecordRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    this._super(controller, model);
    var item = this.controllerFor('item').get('model');
    controller.set('serviceRecordItem', item);
    controller.set('itemLocation', item.get('location'));
  }
});

TBook.ItemServiceRecordsCapitalizeItemRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    this._super(controller, model);
    var item = this.controllerFor('item').get('model');
    controller.set('capitalizationItem', item);
  }


});

TBook.ItemServiceRecordsCapitalizationDetailsRoute = Ember.Route.extend({
    model: function() {
    return this.modelFor('item');
  }
});

TBook.ItemWarrantiesRoute = Ember.Route.extend(
  TBook.ListActions, {
  model: function() {
    // This may need to be just the model
    // Then we can build up warranties for the Item and all its Parts
  	return this.modelFor('item').get('warranties');
  },

  afterModel: function(model, transition) {
    var firstRecord = model.objectAt(0);
    if(model.get('length')) {
      this.setSelectedObject(firstRecord, model);
      this.transitionTo('item_warranty', firstRecord);
    }
  }
});

TBook.ItemWarrantyRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('warranty', params.warranty_id);
  }
});

TBook.ItemWarrantiesAddWarrantyRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    var item = this.controllerFor('item').get('model');
    controller.set('warrantyItem', item);
    controller.set('itemLocation', item.get('location'));
  }
});

TBook.ItemPartsRoute = Ember.Route.extend(
  TBook.ListActions, {
  model: function() {
    return this.modelFor('item').get('parts');
  },

  afterModel: function(model, transition) {
    var firstRecord = model.objectAt(0);
    if(model.get('length')) {
      this.setSelectedObject(firstRecord, model);
      this.transitionTo('item_part', firstRecord);
    }
  }
});

TBook.ItemPartsAddItemPartRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    var item = this.controllerFor('item').get('model');
    controller.set('partItem', item);
    controller.set('itemLocation', item.get('location'));
  }
});

TBook.ItemPartRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('part', params.part_id);
  }
});

TBook.ItemPartAddItemPartWarranty = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    var item = this.controllerFor('item').get('model');
    controller.set('partItem', item);
  }
});

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