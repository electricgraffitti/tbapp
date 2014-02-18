var Resize = {

	setAllContentAreas: function() {
		Resize.resizeSections();
		// Resize.resizeColumnsWithoutFooter();
		// Resize.resizeContentArea();
		// Resize.resizeInnerContent();
		// Resize.resizeInnerColumn();
		// Resize.resizeViewPort();
		// Resize.resizeInnerViewPort();
	},

	resizeColumnsWithoutFooter: function () {
		var header = $("#header"),
				columns = $(".full_height_column");

		columns.height($(window).height() - header.outerHeight());

		$(window).resize(function() {
			columns.height($(window).height() - header.outerHeight());
		});
	},

	resizeContentArea: function() {
		var content = $("#content"),
				firstColumn = $("#column_main");

		content.width($(window).width() - (firstColumn.outerWidth() + 2));

		$(window).resize(function() {
			content.width($(window).width() - (firstColumn.outerWidth() + 2));
		});
	},

	resizeInnerContent: function() {
		var content = $("#content"),
				contentHeader = $("#content_header"),
				innerContent = $("#inner_content");

			innerContent.width(content.width());
			innerContent.height(content.outerHeight() - (contentHeader.outerHeight() - 2));

		$(window).resize(function() {
			innerContent.width(content.width());
			innerContent.height(content.outerHeight() - (contentHeader.outerHeight() - 2));
		});
	},

	resizeInnerColumn: function() {
		var innerContent = $("#inner_content"),
				innerColumn = $("#inner_column");

		innerColumn.height(innerContent.height() - 1);

		$(window).resize(function() {
			innerColumn.height(innerContent.height() - 1);
		});		
	},

	resizeViewPort: function() {
		var innerContent = $("#inner_content"),
				innerColumn = $("#inner_column"),
				mainViewPort = $("#view_port");

		mainViewPort.width(innerContent.width() - innerColumn.width() - 1);
		mainViewPort.height(innerColumn.height());
				
		$(window).resize(function() {
			mainViewPort.width(innerContent.width() - innerColumn.width() - 1);
			mainViewPort.height(innerColumn.height());
		});
	},

	resizeInnerViewPort: function() {
		var mainViewPort = $("#view_port"),
				viewPortHeader = $("#view_port_header"),
				innerViewPort = $('#inner_view_port');

		innerViewPort.width(mainViewPort.width());
		innerViewPort.height(mainViewPort.height() - (viewPortHeader.outerHeight() + 4));

		$(window).resize(function() {
			innerViewPort.width(mainViewPort.width());
			innerViewPort.height(mainViewPort.height() - (viewPortHeader.outerHeight() + 4));
		});

	},

	setMainAppViewPort: function () {
		var mainViewPort = $("#j-main_content"),
				mainNav = $("#main_nav"),
				mainHeader = $("#internal_header");

		mainViewPort.width($(window).width());
		mainViewPort.height($(window).height() - (mainNav.outerHeight() + mainHeader.outerHeight()));

		$(window).resize(function() {
			mainViewPort.width($(window).width());
			mainViewPort.height($(window).height() - (mainNav.outerHeight() + mainHeader.outerHeight()));			
		});		
	},

	resizeSections: function (viewElement) {
		// debounce all the view resizing
		Ember.run.later(this, this.resizeAllSections, 100);
	},

	resizeAllSections: function() {
		var resizeElements = $('.j-resize-view');
		$.each(resizeElements, function() {
			Resize.viewHeaders($(this));
			Resize.columns($(this));
			Resize.viewPorts($(this));
		});
	},

	viewHeaders: function (viewElement) {
		var viewHeader = viewElement.children('.j-viewheader').first(),
				wrap = viewHeader.parents('.j-outerwrap').first();

		viewHeader.outerWidth(wrap.outerWidth());

		$(window).resize(function () {
			var viewHeader = viewElement.children('.j-viewheader').first(),
					wrap = viewHeader.parents('.j-outerwrap').first();

			viewHeader.outerWidth(wrap.outerWidth());
		});			
	},

	columns: function (viewElement) {
		var column = viewElement.children('.j-column').first(),
				wrap = column.parents('.j-outerwrap').first(),
				header = viewElement.children('.j-viewheader').first();

		column.outerHeight(wrap.outerHeight() - header.outerHeight());

		$(window).resize(function () {
			var column = viewElement.children('.j-column').first(),
					wrap = column.parents('.j-outerwrap').first(),
					header = viewElement.children('.j-viewheader').first();

			column.outerHeight(wrap.outerHeight() - header.outerHeight());
		});			
	},

	viewPorts: function (viewElement) {
		var viewPort = viewElement.children('.j-viewport').first(),
				wrap = viewPort.parents('.j-outerwrap').first(),
				column = viewElement.children('.j-column').first(),
				header = viewElement.children('.j-viewheader').first();

		if (column.hasClass('hidden')) {
			viewPort.outerWidth(wrap.outerWidth());
		} else {
			viewPort.outerWidth(wrap.outerWidth() - column.outerWidth());
		}
		viewPort.outerHeight(wrap.outerHeight() - header.outerHeight());

		$(window).resize(function () {
			var viewPort = viewElement.children('.j-viewport').first(),
					wrap = viewPort.parents('.j-outerwrap').first(),
					column = viewElement.children('.j-column').first(),
					header = viewElement.children('.j-viewheader').first();

			if (column.hasClass('hidden')) {
				viewPort.outerWidth(wrap.outerWidth());
			} else {
				viewPort.outerWidth(wrap.outerWidth() - column.outerWidth());
			}
			viewPort.outerHeight(wrap.outerHeight() - header.outerHeight());
		});

	}

};