//createModal: function (modalType, insertedContent, notificationType, title, callback, callbackContext, secondaryModal)
TBook.Modal = {

  initModal: function () {
    var modalTrigger = $(".modal_trigger");

    modalTrigger.on("click", function (e) {
      e.preventDefault();
      var modalContent = $(this).data("modalmessage"),
          modalType = $(this).data("modaltype"),
          modalTitle = $(this).data("modaltitle"),
          notificationType = $(this).data("notificationtype"),
          modalCallback = $(this).data('callback');

      TBook.Modal.removeModal();
      TBook.Modal.createModal(modalType, modalContent, notificationType, modalTitle, modalCallback);

    });

  },

  removeModal: function () {
    var modal = $("#TBook_modal_wrap");
    modal.remove();
    TBook.Expose.removeExpose();
    TBook.Modal.removeKeyboard();
  },

  isInModal: function (element) {
    return ($(element).parents("#TBook_modal_wrap").length > 0);
  },

  createModal: function (modalType, insertedContent, notificationType, title, callback, callbackContext, secondaryModal) {
    var modalHtml = TBook.Modal.generateHtml(modalType, notificationType),
        modalTitle = (title != undefined) ? title : TBook.Modal.setModalTitle(notificationType),
        modalData = insertedContent;

    modalHtml.find("#modal_title").text(modalTitle);
    modalHtml.find("#TBook_modal_content").append(modalData);

    if (!secondaryModal) {
      $("#TBook_modal_wrap").remove();
      TBook.Expose.appendExpose(TBook.Expose.createExpose(), modalHtml);
    } else {
      $("body").append(modalHtml);
    }

    TBook.Modal.setChildModalZIndex(modalHtml);
    TBook.Modal.setupDrag(modalHtml);
    TBook.Modal.modalClose(modalHtml, secondaryModal, callback, callbackContext);
    TBook.Modal.setRoundedCorners(modalHtml);
    TBook.Modal.centerModal();
    TBook.Modal.setChildModalTop(modalHtml);
    TBook.Modal.setupCallback(modalHtml, notificationType, callback, callbackContext);
    TBook.Modal.hookupKeyboard();
  },

  hookupKeyboard: function () {
    $(document).on('keyup', TBook.Modal.escapeFunction);
  },

  removeKeyboard: function () {
    $(document).off('keyup', TBook.Modal.escapeFunction);
  },

  escapeFunction: function (e) {
    if (e.keyCode == 27) {

      TBook.Modal.removeModal();
    }
  },

  getModalCount: function () {
    var modals = $(".TBook_modal_wrap"),
        modalCount = modals.length;
    return modalCount;
  },

  setChildModalTop: function (modalHtml) {
    var modalCount = TBook.Modal.getModalCount(),
        newTopPosition = 50;

    if (modalCount > 1) {
      newTopPosition = newTopPosition + (modalCount * 4);
      modalHtml.css({ top: newTopPosition + "%" });
    }
  },

  setChildModalZIndex: function (modalHtml) {
    var updatedIndex = 9000 + TBook.Modal.getModalCount();

    modalHtml.css({ zIndex: updatedIndex });
  },

  centerModal: function () {
    var modal = $("#TBook_modal_wrap");
    modal.css("margin-left", "-" + (modal.width() / 2) + "px");
    modal.css("margin-top", "-" + ((modal.height() / 2) + 10) + "px");
  },

  setupCallback: function (modalHtml, notificationType, callback, callbackContext) {
    var callbackLink = modalHtml.find("#complete_link"),
        context = callbackContext;

    if (callback != undefined) {
      switch (notificationType) {
        case 'confirmation':
          callbackLink.on("click", function () {
            if (context != null) {
              callback.call(context);
            } else {
              callback();
            }
            TBook.Modal.removeModal();
            return this;
          });
          break;
        case 'secure':
          callbackLink.on("click", function () {
            if (context != null) {
              callback.call(context);
            } else {
              callback();
            }
            TBook.Modal.removeModal();
          });
          break;
        default:
          callback();
          break;
      }
    } else {
      return;
    }
  },

  setRoundedCorners: function (modalHtml) {
    return;
    // If IE you get square corners.
    // if (($.browser.msie) && ($.browser.version == '8.0')) {
    //   modalHtml.find('#TBook_modal_wrap').corner("10px");
    // }
  },

  modalClose: function (modalHtml, secondaryModal, callback, callbackContext) {
    var closeLink = modalHtml.find(".modal_close"),
        cancelOverride = true;

    closeLink.on("click", function () {
      if (callback != undefined) {
        callback.call(callbackContext, cancelOverride);
        modalHtml.remove();
        TBook.Expose.removeExpose();
        return false;
      } else {
        modalHtml.remove();
        if (secondaryModal === true) {
          return;
        } else {
          TBook.Expose.removeExpose();
        }
        return;
      }
    });
  },

  closeConfirmAndParent: function (parentCancelLink) {
    var parentModal = parentCancelLink.parents("#TBook_modal_wrap").first(),
        confirmModal = $("#TBook_modal_wrap.notification");

    confirmModal.remove();
    parentModal.remove();
    TBook.Expose.removeExpose();
  },

  setupDrag: function (modalHtml) {
    var modalHeader = modalHtml.find(".modal_header");
    // modalHtml.drags(); TODO need to make this better
  },

  generateHtml: function (modalType, notificationType) {
    var modalWrap = $("<div id='TBook_modal_wrap' class='TBook_modal_wrap curved'></div>"),
      modalTitleBar = $("<div id='TBook_modal_header' class='modal_header black_gradient'></div>"),
      modalTitle = $("<span id='modal_title'>Title</span>"),
      modalCloseLink = $("<div id='TBook_modal_close' title='click to close (or press esc on your keyboard)' class='close_icon icon small_icon modal_close'>Close</div>"),
      modalContentWrap = $("<div id='TBook_modal_content_wrap' class='modal_content_wrap'></div>"),
      modalContent = $("<div id='TBook_modal_content' class='modal_content'></div>");

    modalContentWrap.append(modalContent);
    modalTitleBar.append(modalTitle).append(modalCloseLink);
    modalWrap.append(modalTitleBar).append(modalContentWrap);
    modalWrap.addClass(notificationType);

    if (modalType === 'notification') {
      return TBook.Modal.appendNotificationElements(notificationType, modalWrap);
    } else {
      return modalWrap;
    }
  },

  appendNotificationElements: function (notificationType, modalWrap) {
    var modalContentWrap = modalWrap.find("#TBook_modal_content_wrap"),
      modalNotification = $("<div id='TBook_modal_notification' class='icon large_icon'></div>"),
      modalConfirmationLinks = $("<div id='confirmation_links'><div id='complete_link' class='work_button'>OK</div><span>or</span><span class='span_link modal_close'>Cancel</span></div>");

    modalWrap.addClass("notification");

    switch (notificationType) {
      case 'error':
        modalNotification.addClass('error_icon');
        break;
      case 'verified':
        modalNotification.addClass('verified_icon');
        break;
      case 'confirmation':
        modalNotification.addClass('confirmation_icon');
        modalConfirmationLinks.find("#complete_link").text("OK");
        modalContentWrap.append(modalConfirmationLinks);
        break;
      case 'secure':
        modalNotification.addClass('secure_icon');
        modalConfirmationLinks.find("#complete_link").text("Save");
        modalContentWrap.append(modalConfirmationLinks);
        break;
      default:
        modalNotification.addClass('error_icon');
        break;
    }
    modalContentWrap.prepend(modalNotification);
    modalWrap.append(modalContentWrap);
    return modalWrap;
  },

  setModalTitle: function (modalType) {
    switch (modalType) {
      case 'error':
        return "Page Error";
      case 'verified':
        return "Verified Notification";
      case 'confirmation':
        return "Page Confirmation";
      case 'secure':
        return "Secure Notification";
      default:
        return "Modal Window Title";
    }
  },

  initModalNoteToggle: function () {
    var noteToggle = $(".modal_note_toggle"),
      noteForm = $(".modal_note_form");

    noteToggle.on("click", function () {
      if ($(this).hasClass("note_off")) {
        noteForm.slideDown();
        $(this).removeClass("note_off").addClass("note_on");
      } else {
        noteForm.slideUp();
        noteForm.val("");
        $(this).removeClass("note_on").addClass("note_off");
      }
    });
  },

  submitModalForm: function (response, callback) {
    var modalForm = $("#modal_form"),
      url = modalForm.attr("action"),
      submitButton = $("#form_submit");

    submitButton.on("click", function (e) {
      e.preventDefault();
      $.ajax({
        url: url,
        data: modalForm.serialize(),
        type: "POST",
        success: function (d) {
          callback();
          TBook.Modal.removeModal();
        },
        error: function (d, type, message) {
          TBook.Modal.removeModal();
          TBook.Modal.createModal(message, 'error');
        }
      });
    });
  }

};
