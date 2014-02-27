TBook.Router.map(function() {
	this.route('dashboard', {path: '/'});
	this.route('add_item', {path: '/add_item'});

	this.resource('locations', {path: '/locations'}, function() {
		this.route('new');
		this.resource('location', {path: '/locations/:location_id'}, function () {
			this.route('new_location_item');
			this.resource('location_items');
			this.resource('location_warranties');
			this.resource('location_service_records');
		});
	});

	this.resource('items', {path: '/items'}, function() {
		this.resource('item', {path: '/items/:item_id'}, function () {
			this.route('add_warranty');
		});
	});

	this.resource('warranties', {path: '/warranties'}, function() {
		this.resource('warranty', {path: '/warranties/:warranty_id'}, function () {

		});
	});

});
