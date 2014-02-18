var DashboardLayout = {

	init: function() {
		DashboardLayout.resizeSections();
	},

	resizeSections: function () {
		var wrapper = $("#wrapper"),
				header = $("#master_header"),
				sidebar = $("#sidebar"),
				sidebarScroller = $("#sidebar_scroller"),
				content = $("#content"),
				contentHeader = $("#content_header"),
				contentScroller = $("#content_scroller");

		wrapper.width($(window).width()).height($(window).height());
		content.width($(window).width() - (sidebar.outerWidth() + 4));
		content.height($(window).height() - header.outerHeight());
		sidebar.height($(window).height() - header.outerHeight());
		sidebarScroller.height(sidebar.outerHeight()).width(sidebar.outerWidth());
		contentScroller.height(content.outerHeight() - contentHeader.outerHeight());
		contentScroller.width(content.outerWidth());


		$(window).resize(function() {
			wrapper.width($(window).width()).height($(window).height());
			content.width($(window).width() - (sidebar.outerWidth() + 4));
			content.height($(window).height() - header.outerHeight());
			sidebar.height($(window).height() - header.outerHeight());
			sidebarScroller.height(sidebar.outerHeight()).width(sidebar.outerWidth());
			contentScroller.height(content.outerHeight() - contentHeader.outerHeight());
			contentScroller.width(content.outerWidth());
		});
	}

}