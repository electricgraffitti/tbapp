TBook.ItemsController = Ember.ArrayController.extend({
});

TBook.ItemController = Ember.ObjectController.extend({
});

TBook.ItemServiceRecordsController = Ember.ArrayController.extend(
  TBook.ListActions, {

	emptyLocationsMessage: 'There are no service records attached to this item.',


  actions: {
  
    selectServiceRecordRow: function(serviceRecord) {
      this.setSelectedObject(serviceRecord, this.get('model'));
      this.transitionToRoute('item_service_record', serviceRecord);
    }
  
  }
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
    params.service_record.vendor_name = this.get('vendorName');

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
    this.set('vendorName', null);
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

      if (Ember.isEmpty(this.get('vendorName'))) {
        validationMessages.push('A Vendor Name is required');
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

TBook.ItemServiceRecordsCapitalizeItemController = Ember.Controller.extend({
  
  capitalizeItem: function (item) {
    var self = this, params = {};

    params.item = {};
    params.item.removal_date = this.get('removalDate');
    params.item.estimated_weight = this.get('estimatedWeight');
    params.item.refrigerant_removal_quantity = this.get('removalQuantity');
    params.item.scrap_value = this.get('scrapValue');
    params.item.removal_vendor = this.get('removalVendor');
    params.item.capitalization_reason = this.get('capReason');
    params.item.is_capitalized = true;

    dataObj = {
      type: 'PUT',
      dataType: 'json',
      data: params,
    }

    TBook.ajax('/items/' + item.get('id'), dataObj).then(function(result) {
      self.viewCapitalization(result);
    }, function(reject) {
      self.handleCreateError(reject);
    });
  },

  viewCapitalization: function(data) {
    this.resetForm();
    this.transitionToRoute('item_service_records');
  },

  handleCreateError: function (reject) {
    Modal.loadValidationModal('<p>There was a problem.</p>');
  },

  resetForm: function () {
    this.set('removalDate', null);
    this.set('estimatedWeight', null);
    this.set('removalQuantity', null);
    this.set('scrapValue', null);
    this.set('removalVendor', null);
    this.set('capReason', null);
  },

  actions: {

    validateCapitalization: function (item) {
      var validationMessages = [];

      if (Ember.isEmpty(this.get('removalDate'))) {
        validationMessages.push('A Removal Date is required');
      }

      if (Ember.isEmpty(this.get('estimatedWeight'))) {
        validationMessages.push('An Estimated Weight is required');
      }

      if (Ember.isEmpty(this.get('removalQuantity'))) {
        validationMessages.push('An Refidgerant Removal Quantity is required');
      }

      if (Ember.isEmpty(this.get('scrapValue'))) {
        validationMessages.push('A Scrap Value is required');
      }

      if (Ember.isEmpty(this.get('removalVendor'))) {
        validationMessages.push('A Vendor is required');
      }

      if (Ember.isEmpty(this.get('capReason'))) {
        validationMessages.push('A Capitalization Reason is required');
      }

      if (validationMessages.length > 0) {
        Modal.loadValidationModal(validationMessages);
        return false;
      } else {
        this.capitalizeItem(item);
      }
    },

    clearItemForm: function () {
      this.resetForm();
    }

  }


});

TBook.ItemWarrantiesController = Ember.ArrayController.extend(
  TBook.ListActions, {

	emptyLocationsMessage: 'There are no service records attached to this item.',

  actions: {
  
    selectServiceRecordRow: function(warranty) {
      this.setSelectedObject(warranty, this.get('model'));
      this.transitionToRoute('item_warranty', warranty);
    }
  
  }

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

TBook.ItemPartsController = Ember.ArrayController.extend(
  TBook.ListActions, {

  emptyLocationsMessage: 'There are no service records attached to this item.',

  actions: {

    selectPartRow: function (itemPart) {
      this.setSelectedObject(itemPart, this.get('model'));
      this.transitionToRoute('item_part', itemPart);
    }

  }

});

TBook.ItemPartController = Ember.ObjectController.extend({
});

TBook.ItemPartsAddItemPartController = Ember.Controller.extend({

  createPart: function () {
    var self = this, params = {};

    params.part = {};
    params.part.item_id = this.get('partItem').get('id');
    params.part.vendor_name = this.get('vendorName');
    params.part.name = this.get('partName');
    params.part.make = this.get('partMake');    
    params.part.model_number = this.get('modelNumber');
    params.part.replacement_date = this.get('replacementDate');
    params.part.description = this.get('partDescription');    

    dataObj = {
      type: 'POST',
      dataType: 'json',
      data: params,
    }

    TBook.ajax('/parts', dataObj).then(function(result) {
      self.setNewRecord(result);
    }, function(reject) {
      self.handleCreateError(reject);
    });
  },

  setNewRecord: function (data) {
    var store = this.store, warranty;
    part = store.createRecord('part', data.part);
    this.resetForm();
    this.get('partItem.parts').pushObject(part);
    this.transitionToRoute('item_part', part);
  },

  handleCreateError: function (reject) {
    Modal.loadValidationModal('<p>There was a problem.</p>');
  },

  resetForm: function () {
    this.set('partName', null);
    this.set('partMake', null);
    this.set('modelNumber', null);
    this.set('replacementDate', null);
    this.set('partDescription', null);  
    this.set('vendorName', null);    
  },

  actions: {

    validatePart: function () {
      var validationMessages = [];

      if (Ember.isEmpty(this.get('partName'))) {
        validationMessages.push('A Part Name is required');
      }

      if (Ember.isEmpty(this.get('vendorName'))) {
        validationMessages.push('A Vendor Name is required');
      }

      if (Ember.isEmpty(this.get('partMake'))) {
        validationMessages.push('A Make is required');
      }

      if (Ember.isEmpty(this.get('modelNumber'))) {
        validationMessages.push('A Model Number is required');
      }

      if (Ember.isEmpty(this.get('replacementDate'))) {
        validationMessages.push('A Replacement Date is required');
      }

      if (Ember.isEmpty(this.get('partDescription'))) {
        validationMessages.push('An Parts Description is required');
      }

      if (validationMessages.length > 0) {
        Modal.loadValidationModal(validationMessages);
        return false;
      } else {
        this.createPart();
      }
    },

    clearPartForm: function () {
      this.resetForm();
    }
  }
});

TBook.ItemPartAddItemPartWarrantyController = Ember.Controller.extend({

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
    this.get('warrantyPart.warranties').pushObject(warranty);
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

