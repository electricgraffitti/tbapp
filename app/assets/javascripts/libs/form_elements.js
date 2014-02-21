TBook.FormElements = {

  customSelects: function (form) {
    var selects = "",
      authWrap = "";

    if (form == undefined) {
      selects = $("select.select");
      authWrap = $(".auth_wrap");
    } else {
      selects = form.find("select.select");
      authWrap = form.find(".auth_wrap");
    }

    // Trigger active state for rollover effect on element
    selects.hover(
      function () {
        $(this).siblings('span').addClass('active');
      },
      function () {
        $(this).siblings('span').removeClass('active');
      });


    // iterate over each select and set style and active value
    selects.each(function () {
      var self = $(this),
        title = "",
        defaultText = $(this).data("defaulttext"),
        viewableText = $('<span class="select" style="overflow:hidden;"></span>'),
        fauxSelector = $('<span class="select_toggle"></span>');

      if (self.attr('title')) {
        title = self.attr('title');
      }
      if (self.siblings('.select_toggle').length) {
        return;
      } else {
        if ($('option:selected', this).val() != '') {
          title = $('option:selected ', this).text();
          self.css({
            'z-index': 10,
            'opacity': 0,
            '-khtml-appearance': 'none'
          })
            .after('<span class="select" style="overflow:hidden;">' + title + '</span>')
            .after('<span class="select_toggle"><span class="toggle"></span></span>')
            .change(function () {
              var valSpan = self.siblings('span.select'),
                val = $('option:selected', this).text();
              valSpan.text(val);
            });

          if (self.parent().hasClass("disabled")) {
            self.siblings('span.select').text(defaultText);
          }

          if (authWrap.hasClass("disabled_controls")) {
            self.remove();
            viewableText.html("");
            fauxSelector.addClass("rcbDisabled");
          }
        }
      }
    });
  },

  placeholderText: function () {
    if (!Modernizr.input.placeholder) {

      $('[placeholder]').focus(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
          input.removeClass('placeholder');
        }
      }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
          input.addClass('placeholder');
          input.val(input.attr('placeholder'));
        }
      }).blur();

      $('[placeholder]').parents('form').submit(function () {
        $(this).find('[placeholder]').each(function () {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
          }
        })
      });

    }
  }

};
