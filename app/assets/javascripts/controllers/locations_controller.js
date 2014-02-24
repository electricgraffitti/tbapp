TBook.LocationsController = Ember.ArrayController.extend({
  
  emptyLocationsMessage: 'There are no locations available.',

  visibleLocations: Ember.computed.alias('content')

});

TBook.LocationsNewController = Ember.Controller.extend({

	createLocation: function () {
		var self = this, params = {};

		params.location = {};
		params.location.address = {};
  	params.location.name = this.get('locationName');
  	params.location.location_number = this.get('locationNumber');
		params.location.address.street = this.get('locationStreet');
  	params.location.address.city = this.get('locationCity');
    params.location.address.state = this.get('locationState');
    params.location.address.zipcode = this.get('locationZip');
    params.location.address.longitude = this.get('locationLong');
  	params.location.address.latitude = this.get('locationLat');

  	dataObj = {
  		type: 'POST',
  		dataType: 'json',
  		data: params,
  	}

  	TBook.ajax('/locations', dataObj).then(function(result) {
  		self.setNewLocation(result);
  	}, function() {
  		self.handleCreateError(result);
  	});

	},

	setNewLocation: function (data) {
		console.log(data);
		this.resetForm();
	},

	handleCreateError: function () {
		Modal.loadValidationModal('There was a problem.');
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
