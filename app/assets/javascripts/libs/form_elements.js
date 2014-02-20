var FormElements = {

  initDeleteLinks: function() {
    var deleteLinks = $(".delete_link");

    deleteLinks.on("click", function(e) {
      var self = $(this);
      
      Modal.confirmDelete("Are you sure?", function() {
        FormElements.deleteRecord(self);
      });
      e.preventDefault();
    });
  },

  initCustomFormFields: function () {
    FormElements.customSelects();
    FormElements.customUploadElement();
    FormElements.updateCustomUploadElement();
  },

  deleteRecord: function(link) {
    var url = link.attr("href"),
        parent = link.parents(".delete_parent").first();

    $.ajax({
      url: url,
      type: "DELETE",
      success: function(response) {
        parent.remove();
        Modal.loadModal("Record deleted.");
      },
      error: function(response, text, message) {
        var errorMessage = text + " - " + message;
        Modal.loadModal(errorMessage);
      }
    }); 
  },

  customSelects: function (form) {
    // var selects = "",
    //     authWrap = "";

    // if (form == null) {
    //   selects = $("body select.select");
    //   authWrap = $(".auth_wrap");
    // } else {
    //   selects = form.find("select.select");
    //   authWrap = form.find(".auth_wrap");
    // }

    // // Trigger active state for rollover effect on element
    // selects.hover(
    //   function () {
    //     $(this).siblings('span').addClass('active');
    //   },
    //   function () {
    //     $(this).siblings('span').removeClass('active');
    //   });


    // // iterate over each select and set style and active value
    // selects.each(function () {
    //   var self = $(this),
    //       title = "",
    //       defaultText = $(this).data("defaulttext"),
    //       viewableText = $('<span class="select" style="overflow:hidden;"></span>'),
    //       fauxSelector = $('<span class="select_toggle"></span>');

    //   if (self.attr('title')) {
    //     title = self.attr('title');
    //   }
    //   if (self.siblings('.select_toggle').length) {
    //     return;
    //   } else {
    //     if ($('option:selected', this).val() != '') {
    //       title = $('option:selected ', this).text();
    //       self.css({ 'z-index': 10, 'opacity': 0, '-khtml-appearance': 'none' })
    //         .after('<span class="select" style="overflow:hidden;">' + title + '</span>')
    //         .after('<span class="select_toggle"><span class="toggle"></span></span>')
    //         .change(function () {
    //           var valSpan = self.siblings('span.select'),
    //               val = $('option:selected', this).text();
    //           valSpan.text(val);
    //         });

    //       if (self.parent().hasClass("disabled")) {
    //         self.siblings('span.select').text(defaultText);
    //       }

    //       if (authWrap.hasClass("disabled_controls")) {
    //         self.remove();
    //         viewableText.html("");
    //         fauxSelector.addClass("disabled");
    //       }
    //     }
    //   }
    // });
  },

  customUploadElement: function (element) {
    var parentField = element.parent('.form-group'),
        parentFieldId = 'file_field_' + $(element).attr('id'),
        placeholderText = "Select File";

    parentField.attr('id', parentFieldId);
    parentField.prepend("<div class='faux_upload '><span class='placeholder_text icon custom_toggle'>Browse for file</span></div>");
  },

  updateCustomUploadElement: function(element, fileToUpload) {
    var parentField = element.parent('.form-group');
        fieldLabel = parentField.find('label'),
        existingLabelSize = fieldLabel.find('span'),
        fauxText = parentField.find('.faux_upload span.placeholder_text');

    if (existingLabelSize.length) {
      existingLabelSize.text('Size: ' + Utility.calculateFileSize(fileToUpload.size));
    } else {
      fieldLabel.append(' - <span>Size: ' + Utility.calculateFileSize(fileToUpload.size) + '</span>');
    }
    fauxText.text(fileToUpload.name);
  },

  disableSubmitButton: function() {
    $('.simple_form').submit(function(e) {
      var submitButton = $(this).find("input[type='submit']");
      submitButton.attr("disabled", "disabled");
      submitButton.removeClass('red_button');
      submitButton.addClass("disabled_submit");
      submitButton.val('Processing')
      AjaxNotice.addAjaxNotice();
    });
  }

};