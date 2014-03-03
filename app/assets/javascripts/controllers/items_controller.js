TBook.ItemsController = Ember.ArrayController.extend({
});

TBook.ItemController = Ember.ObjectController.extend({
});

TBook.ItemServiceRecordsController = Ember.ArrayController.extend({

	emptyLocationsMessage: 'There are no service records attached to this item.'

});

TBook.ItemServiceRecordController = Ember.ObjectController.extend({
});

TBook.ItemServiceRecordsAddServiceRecordController = Ember.Controller.extend({
	
	createServiceRecord: function () {
		var self = this, params = {};

		params.service_record = {};
		params.service_record.item_id = this.get('serviceRecordItem').get('id');
  	params.service_record.custom_order_number = this.get('orderNumber');
  	params.service_record.po_number = this.get('poNumber');
		params.service_record.service_date = this.get('serviceDate');
  	params.service_record.invoice_amount = this.get('invoiceAmount');
    params.service_record.technician = this.get('technicianName');
    params.service_record.description = this.get('recordDetails');

  	dataObj = {
  		type: 'POST',
  		dataType: 'json',
  		data: params,
  	}

  	TBook.ajax('/service_records', dataObj).then(function(result) {
  		self.setNewRecord(result);
  	}, function(reject) {
  		self.handleCreateError(reject);
  	});
	},

	setNewRecord: function (data) {
    var store = this.store, serviceRecord;
    serviceRecord = store.createRecord('service_record', data.service_record);
		this.resetForm();
    this.get('serviceRecordItem.serviceRecords').pushObject(serviceRecord);
    this.transitionToRoute('item_service_record', serviceRecord);
	},

	handleCreateError: function (reject) {
		Modal.loadValidationModal('<p>There was a problem.</p>');
	},

	resetForm: function () {
	  this.set('orderNumber', null);
  	this.set('poNumber', null);
		this.set('serviceDate', null);
  	this.set('invoiceAmount', null);
    this.set('technicianName', null);
    this.set('recordDetails', null);
	},

	actions: {

		validateServiceRecord: function () {
      var validationMessages = [];

      if (Ember.isEmpty(this.get('orderNumber'))) {
        validationMessages.push('An Order Number is required');
      }

      if (Ember.isEmpty(this.get('poNumber'))) {
        validationMessages.push('A PO is required');
      }

      if (Ember.isEmpty(this.get('serviceDate'))) {
        validationMessages.push('A Service Date is required');
      }

      if (Ember.isEmpty(this.get('invoiceAmount'))) {
        validationMessages.push('An Invoice Amount is required');
      }

      if (Ember.isEmpty(this.get('technicianName'))) {
        validationMessages.push('A Technician Name is required');
      }

      if (validationMessages.length > 0) {
        Modal.loadValidationModal(validationMessages);
        return false;
      } else {
        this.createServiceRecord();
      }
		},

		clearServiceRecordForm: function () {
			this.resetForm();
		}
	}

});

TBook.ItemServiceRecordCapitalizeItemController = Ember.Controller.extend({});

TBook.ItemWarrantiesController = Ember.ArrayController.extend({

	emptyLocationsMessage: 'There are no service records attached to this item.'

});

TBook.ItemWarrantyController = Ember.ObjectController.extend({
});

TBook.ItemWarrantiesAddWarrantyController = Ember.Controller.extend({

  createWarranty: function () {
    var self = this, params = {};

    params.warranty = {};
    params.warranty.item_id = this.get('warrantyItem').get('id');
    params.warranty.parts_exp = this.get('partsExp');
    params.warranty.labor_exp = this.get('laborExp');
    params.warranty.warranty_start_date = this.get('startDate');
    params.warranty.warranty_end_date = this.get('endDate');
    params.warranty.warranty_provider = this.get('warrantyProvider');
    params.warranty.terms = this.get('warrantyTerms');

    dataObj = {
      type: 'POST',
      dataType: 'json',
      data: params,
    }

    TBook.ajax('/warranties', dataObj).then(function(result) {
      self.setNewRecord(result);
    }, function(reject) {
      self.handleCreateError(reject);
    });
  },

  setNewRecord: function (data) {
    var store = this.store, warranty;
    warranty = store.createRecord('warranty', data.warranty);
    this.resetForm();
    this.get('warrantyItem.warranties').pushObject(warranty);
    this.transitionToRoute('item_warranty', warranty);
  },

  handleCreateError: function (reject) {
    Modal.loadValidationModal('<p>There was a problem.</p>');
  },

  resetForm: function () {
    this.set('partsExp', null);
    this.set('laborExp', null);
    this.set('startDate', null);
    this.set('endDate', null);
    this.set('warrantyProvider', null);
    this.set('warrantyTerms', null);
  },

  actions: {

    validateWarranty: function () {
      var validationMessages = [];

      if (Ember.isEmpty(this.get('partsExp'))) {
        validationMessages.push('A Parts Expiration is required');
      }

      if (Ember.isEmpty(this.get('laborExp'))) {
        validationMessages.push('A Labor Expiration is required');
      }

      if (Ember.isEmpty(this.get('startDate'))) {
        validationMessages.push('A Start Date is required');
      }

      if (Ember.isEmpty(this.get('endDate'))) {
        validationMessages.push('An End Date is required');
      }

      if (Ember.isEmpty(this.get('warrantyProvider'))) {
        validationMessages.push('A Provider Name is required');
      }

      if (validationMessages.length > 0) {
        Modal.loadValidationModal(validationMessages);
        return false;
      } else {
        this.createWarranty();
      }
    },

    clearWarrantyForm: function () {
      this.resetForm();
    }
  }

});

TBook.AccountItemsController = Ember.ArrayController.extend({
});

TBook.AccountItemController = Ember.ObjectController.extend({
});

