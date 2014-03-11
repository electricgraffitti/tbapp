TBook.LocationsController = Ember.ArrayController.extend(
  TBook.ListActions, {

  locationObjects: Ember.computed.alias('model'),
  emptyLocationsMessage: 'There are no locations available.',

  visibleLocations: Ember.computed.alias('content'),

  actions: {

    selectLocationRow: function(location) {
      this.setSelectedObject(location, this.get('locationObjects'));
      this.transitionToRoute('location', location);
    }
  }
});

TBook.LocationsNewController = Ember.Controller.extend({
  needs: ['locations'],

  visibleLocations: Ember.computed.alias('controllers.locations.visibleLocations'),

	createLocation: function () {
		var self = this, params = {};

		params.location = {};
		params.location.address_attributes = {};
  	params.location.name = this.get('locationName');
  	params.location.location_number = this.get('locationNumber');
		params.location.address_attributes.street = this.get('locationStreet');
  	params.location.address_attributes.city = this.get('locationCity');
    params.location.address_attributes.state_id = this.get('locationState').get('id');
    params.location.address_attributes.zipcode = this.get('locationZip');

  	dataObj = {
  		type: 'POST',
  		dataType: 'json',
  		data: params,
  	}

  	TBook.ajax('/locations', dataObj).then(function(result) {
  		self.setNewLocation(result);
  	}, function(reject) {
  		self.handleCreateError(reject);
  	});
	},

	setNewLocation: function (data) {
    var store = this.store, location;
    location = store.createRecord('location', data.location);
    store.createRecord('address', data.addresses[0]);
		this.resetForm();
    this.get('visibleLocations').pushObject(location);
    this.transitionToRoute('location', location);
	},

	handleCreateError: function (reject) {
		Modal.loadValidationModal('<p>There was a problem.</p>');
	},

	resetForm: function () {
	  this.set('locationName', null);
  	this.set('locationNumber', null);
		this.set('locationStreet', null);
  	this.set('locationCity', null);
    this.set('locationState', null);
    this.set('locationZip', null);
	},

	actions: {

		validateLocation: function () {
      var validationMessages = [];

      if (Ember.isEmpty(this.get('locationName'))) {
        validationMessages.push('A Location Name is required');
      }

      if (Ember.isEmpty(this.get('locationNumber'))) {
        validationMessages.push('A Location Number is required');
      }

      if (Ember.isEmpty(this.get('locationStreet'))) {
        validationMessages.push('A Location Street is required');
      }

      if (Ember.isEmpty(this.get('locationCity'))) {
        validationMessages.push('A Location City is required');
      }

      if (Ember.isEmpty(this.get('locationState'))) {
        validationMessages.push('A Location State is required');
      }

      if (Ember.isEmpty(this.get('locationZip'))) {
        validationMessages.push('A Location Zipcode is required');
      }

      if (validationMessages.length > 0) {
        Modal.loadValidationModal(validationMessages);
        return false;
      } else {
        this.createLocation();
      }
		},

		clearLocationForm: function () {
			this.resetForm();
		}
	}
});

TBook.LocationController = Ember.ObjectController.extend({
});

TBook.LocationItemsController = Ember.ArrayController.extend({

  emptyLocationsMessage: 'You have not added any items to this location.'

});

TBook.LocationNewLocationItemController = Ember.Controller.extend({

  createLocationItem: function () {
    var self = this, params = {};

    params.item = {};
    params.item.name = this.get('itemName');
    params.item.serial_number = this.get('serialNumber');
    params.item.make = this.get('itemMake');
    params.item.model = this.get('itemModel');
    params.item.purchase_date = this.get('purchaseDate');
    params.item.original_cost = this.get('originalCost');
    params.item.purchased_from = this.get('purchasedFrom');
    params.item.physical_location = this.get('itemPhysicalLocation');
    params.item.notes = this.get('itemNotes');
    params.item.location_id = this.get('itemLocation.id');

    dataObj = {
      type: 'POST',
      dataType: 'json',
      data: params,
    }

    TBook.ajax('/items', dataObj).then(function(result) {
      self.setNewLocationItem(result);
    }, function(reject) {
      self.handleCreateError(reject);
    });
  },

  setNewLocationItem: function(data) {
    var item = this.store.createRecord('item', data.item);
    this.get('itemLocation.items').pushObject(item);
    this.resetForm();
    this.transitionToRoute('location_items');
  },

  handleCreateError: function (reject) {
    Modal.loadValidationModal('<p>There was a problem.</p>');
  },

  resetForm: function () {
    this.set('itemName', null);
    this.set('serialNumber', null);
    this.set('itemMake', null);
    this.set('itemModel', null);
    this.set('purchaseDate', null);
    this.set('originalCost', null);
    this.set('purchasedFrom', null);
    this.set('itemPhysicalLocation', null);
    this.set('itemNotes', null);
  },

  actions: {

    validateItem: function () {
      var validationMessages = [];

      if (Ember.isEmpty(this.get('itemName'))) {
        validationMessages.push('An Item Name is required');
      }

      if (Ember.isEmpty(this.get('serialNumber'))) {
        validationMessages.push('An Item Serial Number is required');
      }

      if (Ember.isEmpty(this.get('itemMake'))) {
        validationMessages.push('An Item Make is required');
      }

      if (Ember.isEmpty(this.get('itemModel'))) {
        validationMessages.push('An Item Model is required');
      }

      if (Ember.isEmpty(this.get('purchaseDate'))) {
        validationMessages.push('A Purchase Date is required');
      }

      if (Ember.isEmpty(this.get('originalCost'))) {
        validationMessages.push('An Original Cost is required');
      }

      if (validationMessages.length > 0) {
        Modal.loadValidationModal(validationMessages);
        return false;
      } else {
        this.createLocationItem();
      }
    },

    clearItemForm: function () {
      this.resetForm();
    }

  }
});

TBook.LocationWarrantiesController = Ember.ArrayController.extend({
  emptyLocationsMessage: 'You do not have any warranties associated with this location.',

  actions: {

    selectWarrantyRow: function(warranty) {
      this.transitionToRoute('item_warranty', warranty.get('item'), warranty);
    }

  }

});

TBook.LocationServiceRecordsController = Ember.ArrayController.extend({
  emptyLocationsMessage: 'You do not have any warranties associated with this location.',

  actions: {
    
    selectServiceRecordRow: function(service_record) {
      this.transitionToRoute('item_service_record', service_record.get('item'), service_record);
    }
  }

});
