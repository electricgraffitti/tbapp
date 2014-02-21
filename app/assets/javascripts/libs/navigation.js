TBook.Navigation = {

  mainNavSuperfish: function () {
    var mainNav = $("#main_nav");

    mainNav.superfish({
      delay: 100,                            // one tenth second delay on mouseout
      animation: { opacity: 'show', height: 'show' },  // fade-in and slide-down animation
      speed: 'fast',                          // faster animation speed
      autoArrows: false,                           // disable generation of arrow mark-up
      dropShadows: false                            // disable drop shadows
    });

  },

  switchClientTrigger: function () {
    var switchClientTrigger = $("#switch_client"),
        swc = $("#switch_client_control"),
        header = $("#mast_header"),
        navBar = $("#master_navigation"),
        footer = $("#footer");

    swc.height($(window).height() - (header.outerHeight() + navBar.outerHeight() + footer.outerHeight() + 1));

    $(window).on("throttledresize", function () {
      swc.height($(window).height() - (header.outerHeight() + navBar.outerHeight() + footer.outerHeight() + 1));
    });
    TBook.Navigation.popOutCloseTrigger(swc);

    // Trigger to open/close the side panel list
    switchClientTrigger.on("click", function (e) {

      e.preventDefault();
      TBook.Navigation.sidePanelPopout(swc);
    });
  },

  popOutCloseTrigger: function (el) {
    var closeButton = $("#switch_client_close");
    closeButton.click(function (e) {
      TBook.Navigation.sidePanelPopout(el);
      e.preventDefault();
    });
  },

  sidePanelPopout: function (el) {
    var elWidth = el.width();
    if (el.hasClass("closed")) {
      el.animate({ right: 0 }, 700).removeClass("closed");
    } else {
      el.animate({ right: "-" + (elWidth + 3) }, 700).addClass("closed");
    }
  }

}
