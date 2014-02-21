//createModal: function (modalType, insertedContent, notificationType, title, callback, callbackContext, secondaryModal)
Nucleus.Modal = {

  initModal: function () {
    var modalTrigger = $(".modal_trigger");

    modalTrigger.on("click", function (e) {
      e.preventDefault();
      var modalContent = $(this).data("modalmessage"),
          modalType = $(this).data("modaltype"),
          modalTitle = $(this).data("modaltitle"),
          notificationType = $(this).data("notificationtype"),
          modalCallback = $(this).data('callback');

      Nucleus.Modal.removeModal();
      Nucleus.Modal.createModal(modalType, modalContent, notificationType, modalTitle, modalCallback);

    });

  },

  removeModal: function () {
    var modal = $("#nucleus_modal_wrap");
    modal.remove();
    Nucleus.Expose.removeExpose();
    Nucleus.Modal.removeKeyboard();
  },

  isInModal: function (element) {
    return ($(element).parents("#nucleus_modal_wrap").length > 0);
  },

  createModal: function (modalType, insertedContent, notificationType, title, callback, callbackContext, secondaryModal) {
    var modalHtml = Nucleus.Modal.generateHtml(modalType, notificationType),
        modalTitle = (title != undefined) ? title : Nucleus.Modal.setModalTitle(notificationType),
        modalData = insertedContent;

    modalHtml.find("#modal_title").text(modalTitle);
    modalHtml.find("#nucleus_modal_content").append(modalData);

    if (!secondaryModal) {
      $("#nucleus_modal_wrap").remove();
      Nucleus.Expose.appendExpose(Nucleus.Expose.createExpose(), modalHtml);
    } else {
      $("body").append(modalHtml);
    }

    Nucleus.Modal.setChildModalZIndex(modalHtml);
    Nucleus.Modal.setupDrag(modalHtml);
    Nucleus.Modal.modalClose(modalHtml, secondaryModal, callback, callbackContext);
    Nucleus.Modal.setRoundedCorners(modalHtml);
    Nucleus.Modal.centerModal();
    Nucleus.Modal.setChildModalTop(modalHtml);
    Nucleus.Modal.setupCallback(modalHtml, notificationType, callback, callbackContext);
    Nucleus.Modal.hookupKeyboard();
  },

  hookupKeyboard: function () {
    $(document).on('keyup', Nucleus.Modal.escapeFunction);
  },

  removeKeyboard: function () {
    $(document).off('keyup', Nucleus.Modal.escapeFunction);
  },

  escapeFunction: function (e) {
    if (e.keyCode == 27) {

      Nucleus.Modal.removeModal();
    }
  },

  getModalCount: function () {
    var modals = $(".nucleus_modal_wrap"),
        modalCount = modals.length;
    return modalCount;
  },

  setChildModalTop: function (modalHtml) {
    var modalCount = Nucleus.Modal.getModalCount(),
        newTopPosition = 50;

    if (modalCount > 1) {
      newTopPosition = newTopPosition + (modalCount * 4);
      modalHtml.css({ top: newTopPosition + "%" });
    }
  },

  setChildModalZIndex: function (modalHtml) {
    var updatedIndex = 9000 + Nucleus.Modal.getModalCount();

    modalHtml.css({ zIndex: updatedIndex });
  },

  centerModal: function () {
    var modal = $("#nucleus_modal_wrap");
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
            Nucleus.Modal.removeModal();
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
            Nucleus.Modal.removeModal();
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
    //   modalHtml.find('#nucleus_modal_wrap').corner("10px");
    // }
  },

  modalClose: function (modalHtml, secondaryModal, callback, callbackContext) {
    var closeLink = modalHtml.find(".modal_close"),
        cancelOverride = true;

    closeLink.on("click", function () {
      if (callback != undefined) {
        callback.call(callbackContext, cancelOverride);
        modalHtml.remove();
        Nucleus.Expose.removeExpose();
        return false;
      } else {
        modalHtml.remove();
        if (secondaryModal === true) {
          return;
        } else {
          Nucleus.Expose.removeExpose();
        }
        return;
      }
    });
  },

  closeConfirmAndParent: function (parentCancelLink) {
    var parentModal = parentCancelLink.parents("#nucleus_modal_wrap").first(),
        confirmModal = $("#nucleus_modal_wrap.notification");

    confirmModal.remove();
    parentModal.remove();
    Nucleus.Expose.removeExpose();
  },

  setupDrag: function (modalHtml) {
    var modalHeader = modalHtml.find(".modal_header");
    // modalHtml.drags(); TODO need to make this better
  },

  generateHtml: function (modalType, notificationType) {
    var modalWrap = $("<div id='nucleus_modal_wrap' class='nucleus_modal_wrap curved'></div>"),
      modalTitleBar = $("<div id='nucleus_modal_header' class='modal_header black_gradient'></div>"),
      modalTitle = $("<span id='modal_title'>Title</span>"),
      modalCloseLink = $("<div id='nucleus_modal_close' title='click to close (or press esc on your keyboard)' class='close_icon icon small_icon modal_close'>Close</div>"),
      modalContentWrap = $("<div id='nucleus_modal_content_wrap' class='modal_content_wrap'></div>"),
      modalContent = $("<div id='nucleus_modal_content' class='modal_content'></div>");

    modalContentWrap.append(modalContent);
    modalTitleBar.append(modalTitle).append(modalCloseLink);
    modalWrap.append(modalTitleBar).append(modalContentWrap);
    modalWrap.addClass(notificationType);

    if (modalType === 'notification') {
      return Nucleus.Modal.appendNotificationElements(notificationType, modalWrap);
    } else {
      return modalWrap;
    }
  },

  appendNotificationElements: function (notificationType, modalWrap) {
    var modalContentWrap = modalWrap.find("#nucleus_modal_content_wrap"),
      modalNotification = $("<div id='nucleus_modal_notification' class='icon large_icon'></div>"),
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
          Nucleus.Modal.removeModal();
        },
        error: function (d, type, message) {
          Nucleus.Modal.removeModal();
          Nucleus.Modal.createModal(message, 'error');
        }
      });
    });
  }

};
