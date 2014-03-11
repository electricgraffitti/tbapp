TBook.ItemsView = TBook.View.extend({
  templateName: 'items/items'
});

TBook.ItemView = TBook.View.extend({
  templateName: 'items/item'
});

TBook.ItemServiceRecordsView = TBook.View.extend({
  templateName: 'items/item_service_records'
});

TBook.ItemServiceRecordView = TBook.View.extend({
  templateName: 'items/item_service_record'
});

TBook.ItemServiceRecordsAddServiceRecordView = TBook.View.extend({
  templateName: 'items/add_service_record'
});

TBook.ItemServiceRecordsCapitalizationDetailsView = TBook.View.extend({
  templateName: 'items/capitalization_details',

  didInsertElement: function() {
    this._super();
    $('#service_records a').removeClass('active');
  }
});

TBook.ItemServiceRecordsCapitalizeItemView = TBook.View.extend({
  templateName: 'items/capitalize_item',

  didInsertElement: function() {
    this._super();
    $('#service_records a').removeClass('active');
  }
});

TBook.ItemWarrantiesView = TBook.View.extend({
  templateName: 'items/item_warranties'
});

TBook.ItemWarrantyView = TBook.View.extend({
  templateName: 'items/item_warranty'
});

TBook.ItemWarrantiesAddWarrantyView = TBook.View.extend({
  templateName: 'items/add_warranty'
});

TBook.ItemPartsView = TBook.View.extend({
  templateName: 'items/item_parts'
});

TBook.ItemPartsAddItemPartView = TBook.View.extend({
  templateName: 'items/add_item_part'
});

TBook.ItemPartView = TBook.View.extend({
  templateName: 'items/item_part'
});

TBook.ItemPartAddPartWarrantyView = TBook.View.extend({
  templateName: 'items/add_warranty'
});

TBook.AccountItemsView = TBook.View.extend({
  templateName: 'items/account_items'
});

TBook.AccountItemView = TBook.View.extend({
  templateName: 'items/account_item'
});
