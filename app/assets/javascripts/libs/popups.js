TBook.Popup = {

  testMode: "",

  initScripts: function () {
    TBook.Popup.activateLinks();
  },

  activateLinks: function (link) {
    $('body').on("click", '.popup_link', function (e) {
      e.preventDefault();
      TBook.Popup.triggerPopup($(this));
      return false;
    });
  },

  triggerPopup: function (link) {
    var name = link.attr("popupName"),
        title = link.attr("popupTitle"),
        url = link.attr("href"),
        popupWidth = link.attr("popupWidth"),
        popupHeight = link.attr("popupHeight");

    if (name) {
      return TBook.Popup.generateReusedWindow(title, url, name, popupWidth, popupHeight);
    }
    else {
      return TBook.Popup.generateWindow(title, url, popupWidth, popupHeight);
    }
  },

  generateWindow: function (title, url, width, height) {
    return TBook.Popup.generatePositionedWindow(title, url, "", "", "", width, height);
  },

  generateReusedWindow: function (title, url, name, width, height) {
    return TBook.Popup.generatePositionedWindow(title, url, name, "", "", width, height);
  },

  generatePositionedWindow: function (title, url, name, top, left, width, height) {
    var winOptions = "", win;
    if (top != "") {
      winOptions = "top=" + top + ", ";
    };
    if (left != "") {
      winOptions += "left=" + left + ", ";
    };
    name = name.replace(/ /g, "_");
    win = window.open(url, name, winOptions + "width=" + width + ", height=" + height + ", toolbar=0, location=0, directories=0, status=0, menubar=0, copyhistory=0, resizable=1, scrollbars=0", true);
    if (win) win.focus();

    if (TBook.Popup.testMode === 'test') {
      setTimeout(function () { if (win) win.close(); }, 1000);
    }
    return win;
  },

  patientClaimHistoryWindow: undefined,

  triggerPatientClaimHistory: function (force) {
    var patientClaimHistoryLink = $('#patient_claim_history');

    // if you want it opened no matter what (aka force)
    // or if the window has been opened, and is still open
    if (force || (!!this.patientClaimHistoryWindow && !this.patientClaimHistoryWindow.closed)) {
      this.patientClaimHistoryWindow = this.triggerPopup(patientClaimHistoryLink);
    }

    if (TBook.Popup.testMode === 'test') {
      patientClaimHistoryLink.click();
    }
  }
};
