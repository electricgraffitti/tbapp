Nucleus.Notice = {

  errorNotice: function (message) {
    // remove any previoius modals first
    Nucleus.Modal.removeModal();
    Nucleus.Modal.createModal('notification', message, 'error');
  },

  confirmationNotice: function (message, title, callback, callbackContext) {
    Nucleus.Modal.removeModal();
    Nucleus.Modal.createModal('notification', message, 'confirmation', title, callback, callbackContext);
  },

  validationNotice: function (message) {
  	Nucleus.Modal.removeModal();
  	if (typeof message === 'object') {
    	Nucleus.Modal.createModal('notification', message.map(function(message) {
        return "<p>" + message + "</p>";
      }).join(''), 'error');
    } else {
      Nucleus.Modal.createModal('notification', message, 'error');
    }
  }
  
}