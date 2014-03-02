TBook.Router.map(function() {
	this.route('dashboard', {path: '/'});
	this.route('add_item', {path: '/add_item'});

	this.resource('locations', {path: '/locations'}, function() {
		this.route('new');
		this.resource('location', {path: ':location_id'}, function () {
			this.route('new_location_item');
			this.resource('location_items');
			this.resource('location_warranties');
			this.resource('location_service_records');
		});
	});

	this.resource('items', {path: '/items'}, function() {
		this.resource('item', {path: ':item_id'}, function () {
			this.resource('item_service_records', function() {
				this.route('add_service_record');
				this.route('capitalize_item');
				this.resource('item_service_record', {path: ':service_record_id'}, function() {
				});
			});
			this.resource('item_warranties', function() {
				this.route('add_warranty');
				this.resource('item_warranty', {path: ':warranty_id'}, function() {
				});
			});
		});
	});

	this.resource('account_items', {path: '/account_items'}, function() {
		this.resource('account_item', {path: '/:item_id'}, function () {
			this.route('add_warranty');
		});
	});

	this.resource('warranties', {path: '/warranties'}, function() {
		this.resource('warranty', {path: '/warranties/:warranty_id'}, function () {

		});
	});

});
