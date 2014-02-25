TBook.LocationsController = Ember.ArrayController.extend({
  
  emptyLocationsMessage: 'There are no locations available.',

  visibleLocations: Ember.computed.alias('content')

});

TBook.LocationsNewController = Ember.Controller.extend({

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
		console.log(data);
		this.resetForm();
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
    this.set('locationLong', null);
  	this.set('locationLat', null);
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
