Nucleus.ToolTips = {

  initToolTips: function () {
    Nucleus.ToolTips.triggerToolTips();
  },

  toolTipSwitch: function (triggerElement) {
    var toolTipType = triggerElement.data("tooltiptype");
    Nucleus.ToolTips.removeToolTip();
    switch (toolTipType) {
      case 'micro':
        Nucleus.ToolTips.microToolTip(triggerElement, toolTipType);
        break;
      case 'info':
        Nucleus.ToolTips.infoToolTip(triggerElement, toolTipType);
        break;
      default:
        Nucleus.ToolTips.microToolTip(triggerElement, toolTipType);
        break;
    }
  },

  removeToolTip: function () {
    var toolTip = jQuery("#tool_tip_wrap");
    toolTip.remove();
  },

  microToolTip: function (triggerElement, toolTipType) {
    var toolTipContent = Nucleus.ToolTips.getMicroTipValue(triggerElement),
        toolTip = Nucleus.ToolTips.createToolTip(toolTipType, toolTipContent);

    Nucleus.ToolTips.drawToolTip(triggerElement, toolTip);
  },

  infoToolTip: function (triggerElement, toolTipType) {
    var toolTipContent = Nucleus.ToolTips.getRemoteContent(triggerElement.data('tooltipdataurl')),
        toolTipHeader = Nucleus.ToolTips.buildToolTipHeader(triggerElement, toolTipContent),
        toolTip = Nucleus.ToolTips.createToolTip(toolTipType, toolTipContent, toolTipHeader);

    Nucleus.ToolTips.drawToolTip(triggerElement, toolTip);
  },

  getRemoteContent: function (toolTipContentUrl) {
    var content;
    jQuery.ajax({
      url: toolTipContentUrl,
      cache: true,
      async: false,
      success: function (data) {
        content = $(data).find('.tooltip_content');
      }
    });
    return content;
  },

  getMicroTipValue: function (triggerElement) {
    if (triggerElement.attr("data-tooltiptitle")) {
      return triggerElement.attr("data-tooltiptitle");
    } else if (triggerElement.attr("tooltiptitle")) {
      return triggerElement.attr("tooltiptitle");
    } else if (triggerElement.attr("title")) {
      return triggerElement.attr("title");
    } else {
      return triggerElement.next().text();
    }
  },

  createToolTip: function (toolTipType, content, header) {
    var toolTip = Nucleus.ToolTips.createToolTipWrapperHtml(),
        toolTipContent = Nucleus.ToolTips.createToolTipContentHtml(),
        toolTipArrow = Nucleus.ToolTips.createToolTipArrowHtml();

    toolTipContent.html(content);
    toolTip.append(header);
    toolTip.append(toolTipContent);
    toolTip.append(toolTipArrow);
    toolTip.addClass(toolTipType);

    return toolTip;
  },

  createToolTipWrapperHtml: function () {
    return jQuery("<div id='tool_tip_wrap' class='bottom left'></div>");
  },

  createToolTipHeaderHtml: function () {
    return $("<div id='tool_tip_header'>ToolTip</div>");
  },

  createToolTipContentHtml: function () {
    return jQuery("<div id='tool_tip_content' class='tip_content'></div>");
  },

  createToolTipArrowHtml: function () {
    return jQuery("<div id='tool_tip_arrow'></div>");
  },

  calculateHeaderText: function (triggerElement, toolTipContent) {
    return triggerElement.data('tooltiptitle') ? triggerElement.data('tooltiptitle') : (toolTipContent.find('.popup_header').text() ? toolTipContent.find('.popup_header').text() : "");
  },

  infoTipPopupTriggerHtml: function (triggerElement, width, height) {
    var popupWidth = width ? width : 300,
        popupHeight = height ? height : 300,
        popuptrigger = jQuery("<a id='tool_tip_popup_trigger' class='icon small_icon popup_window_icon popup_link' popupTitle='Code Desc' href='" + triggerElement.data('tooltipdataurl') + "' popupWidth='" + popupWidth + "' popupHeight='" + popupHeight + "'></a>");

    return triggerElement.data('hastooltippopout') ? popuptrigger : "";
  },

  buildToolTipHeader: function (triggerElement, toolTipContent) {
    var headerHtml = Nucleus.ToolTips.createToolTipHeaderHtml(),
        toolTipPopupTrigger = Nucleus.ToolTips.infoTipPopupTriggerHtml(triggerElement),
        headerTextValue = Nucleus.ToolTips.calculateHeaderText(triggerElement, toolTipContent);

    headerHtml.text(headerTextValue);
    headerHtml.append(toolTipPopupTrigger);
    return headerHtml;
  },

  adjustForTableTip: function (tooltip) {
    var toolTipHeader = tooltip.find('#tool_tip_header');

    tooltip.removeClass('info');
    tooltip.addClass('table_tip');
    toolTipHeader.width(tooltip.find('#tool_tip_content').width());
    tooltip.width(toolTipHeader.width() + 20);
  },

  drawToolTip: function (triggerElement, tooltip) {
    var isTableTip = triggerElement.data('istabletip');
    jQuery("body").append(tooltip);
    Nucleus.ToolTips.positionToolTip(triggerElement, tooltip);
    if (isTableTip === true) {
      Nucleus.ToolTips.adjustForTableTip(tooltip);
    }
    Nucleus.Popup.initScripts();
  },

  positionToolTip: function (triggerElement, tooltip) {
    var position = triggerElement.offset(),
        calcHorizPosition = "",
        calcVertPosition = "",
        tipHeight = tooltip.outerHeight() + 10,
        tipWidth = tooltip.outerWidth(),
        horzPosition = position.left + tipWidth + triggerElement.outerWidth();

    tooltip.css({ "position": "absolute" });

    if (jQuery(window).width() < horzPosition) {
      calcHorizPosition = (position.left - tipWidth);
      tooltip.css({ "left": calcHorizPosition });
      tooltip.removeClass("left").addClass("right");
    } else {
      calcHorizPosition = (position.left + triggerElement.outerWidth());
      tooltip.css({ "left": calcHorizPosition });
    }

    if (position.top < tipHeight) {
      calcVertPosition = (position.top + triggerElement.outerHeight());
      tooltip.css({ "top": calcVertPosition });
      tooltip.removeClass("bottom").addClass("top");
    } else {
      calcVertPosition = (position.top - tipHeight);
      tooltip.css({ "top": calcVertPosition });
    }
  },

  triggerToolTips: function () {
    var tooltips = $(".tooltip"),
        tipIsVisible = false;

    tooltips.hoverIntent({
      over: function () {
        var self = $(this);
        if (tipIsVisible) { clearTimeout(tipIsVisible); }
        Nucleus.ToolTips.toolTipSwitch(self);
      },
      timer: 1500,
      out: function () {
        tipIsVisible = setTimeout(Nucleus.ToolTips.removeToolTip, 900);
        $("#tool_tip_wrap").on("mouseenter", function () {
          clearTimeout(tipIsVisible);
        });
        $("#tool_tip_wrap").on("mouseleave", function () {
          tipIsVisible = setTimeout(Nucleus.ToolTips.removeToolTip, 900);
        });
      }
    });
  }

};