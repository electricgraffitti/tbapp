var Flash = {

  injectFlashBox: function() {
    $('#flash').addClass("flash_wrap");
    $("#flash").hide();
  },

  setFlash: function() {
    var flashMessage = $("#flash").html();
    var msg = $.trim(flashMessage);
    if (msg !== "") {
      Flash.activateNotice(flashMessage);
    }
  },

  activateNotice: function(flashMessage) {
    var flashDiv = $("#flash");
    flashDiv.html(flashMessage);
    flashDiv.slideDown(600).delay(2500).slideUp(600, function() {flashDiv.html('')});
  }
};

var AjaxNotice = {

  initializeGlobalEvents: function () {
    $(document).ajaxStart(function() {
      AjaxNotice.addAjaxNotice();
    });

    $(document).ajaxStop(function() {
      AjaxNotice.removeAjaxNotice();
    });
  },

  addAjaxNotice: function () {
    AjaxNotice.slideInNotice();
  },

  removeAjaxNotice: function () {
    AjaxNotice.slideOutNotice();
  },

  slideInNotice: function () {
    $('body').append(AjaxNotice.getHtml());
  },

  slideOutNotice: function () {
    $("#ajax_notice").remove();
  },

  getHtml: function () {
    return '<div id="ajax_notice" class="green_button"><div id="facebookG"><div id="blockG_1" class="facebook_blockG"></div><div id="blockG_2" class="facebook_blockG"></div><div id="blockG_3" class="facebook_blockG"></div></div> Working...</div>'
  }
}