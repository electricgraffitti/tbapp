TBook.Notice = {

  errorNotice: function (message) {
    // remove any previoius modals first
    TBook.Modal.removeModal();
    TBook.Modal.createModal('notification', message, 'error');
  },

  confirmationNotice: function (message, title, callback, callbackContext) {
    TBook.Modal.removeModal();
    TBook.Modal.createModal('notification', message, 'confirmation', title, callback, callbackContext);
  },

  validationNotice: function (message) {
  	TBook.Modal.removeModal();
  	if (typeof message === 'object') {
    	TBook.Modal.createModal('notification', message.map(function(message) {
        return "<p>" + message + "</p>";
      }).join(''), 'error');
    } else {
      TBook.Modal.createModal('notification', message, 'error');
    }
  }

};

TBook.Flash = {

  injectFlashBox: function() {
    $('#flash').addClass("flash_wrap");
    $("#flash").hide();
  },

  setFlash: function() {
    var flashMessage = $("#flash").html();
    var msg = $.trim(flashMessage);
    if (msg !== "") {
      TBook.Flash.activateNotice(flashMessage);
    }
  },

  activateNotice: function(flashMessage) {
    var flashDiv = $("#flash");
    flashDiv.html(flashMessage);
    flashDiv.slideDown(600).delay(2500).slideUp(600, function() {flashDiv.html('')});
  }
};

TBook.AjaxNotice = {

  initializeGlobalEvents: function () {
    $(document).ajaxStart(function() {
      TBook.AjaxNotice.addAjaxNotice();
    });

    $(document).ajaxStop(function() {
     TBook.AjaxNotice.removeAjaxNotice();
    });
  },

  addAjaxNotice: function () {
    TBook.AjaxNotice.slideInNotice();
  },

  removeAjaxNotice: function () {
    TBook.AjaxNotice.slideOutNotice();
  },

  slideInNotice: function () {
    $('body').append(TBook.AjaxNotice.getHtml());
  },

  slideOutNotice: function () {
    $("#ajax_notice").remove();
  },

  getHtml: function () {
    return '<div id="ajax_notice" class="green_button"><div id="facebookG"><div id="blockG_1" class="facebook_blockG"></div><div id="blockG_2" class="facebook_blockG"></div><div id="blockG_3" class="facebook_blockG"></div></div> Working...</div>'
  }
}
