var ToolTips = {

  initToolTips: function () {
    ToolTips.triggerToolTips();
  },

  toolTipSwitch: function (triggerElement) {
    var toolTipType = triggerElement.data("tooltiptype") ? triggerElement.data("tooltiptype") : 'title';
    ToolTips.removeToolTip();
    switch (toolTipType) {
      case 'title':
        ToolTips.titleToolTip(triggerElement, toolTipType);
        break;
      case 'content':
        ToolTips.contentToolTip(triggerElement, toolTipType);
        break;
      default:
        ToolTips.titleToolTip(triggerElement, toolTipType);
        break;
    }
  },

  removeToolTip: function () {
    var toolTip = $("#tool_tip_wrap");
    toolTip.remove();
  },

  titleToolTip: function (triggerElement, toolTipType) {
    var toolTipContent = triggerElement.data("tooltiptitle") ? triggerElement.data("tooltiptitle") : triggerElement.attr("title"),
        toolTip = ToolTips.createToolTip(toolTipType, toolTipContent);

    ToolTips.drawToolTip(triggerElement, toolTip);
  },

  contentToolTip: function (triggerElement, toolTipType) {
    var toolTipHeader = $("<div id='tool_tip_header'>ToolTip</div>"),
        toolTipContentUrl = triggerElement.data('tooltipdataurl'),
        toolTipContent = ToolTips.getRemoteContent(toolTipContentUrl),
        toolTip = ToolTips.createToolTip(toolTipType, toolTipContent);

    toolTipHeader.text(toolTipContent.find('.popup_header').text());
    toolTip.prepend(toolTipHeader);

    ToolTips.drawToolTip(triggerElement, toolTip);
  },

  getRemoteContent: function (toolTipContentUrl) {
    var content;
    $.ajax({
      url: toolTipContentUrl,
      cache: true,
      async: false,
      success: function (data) {
        content = $(data).find('.tooltip_content');
      }
    });
    return content;
  },

  createToolTip: function (toolTipType, content) {
    var toolTip = $("<div id='tool_tip_wrap' class='bottom left'></div>"),
        toolTipContent = $("<div id='tool_tip_content'></div>"),
        toolTipArrow = $("<div id='tool_tip_arrow'></div>");

    toolTipContent.html(content);
    toolTip.append(toolTipContent);
    toolTip.append(toolTipArrow);
    toolTip.addClass(toolTipType);

    return toolTip;
  },

  drawToolTip: function (triggerElement, tooltip) {
    var isTableTip = triggerElement.data('istabletip');
    $("body").append(tooltip);
    ToolTips.positionToolTip(triggerElement, tooltip);
  },

  positionToolTip: function (triggerElement, tooltip) {
    var position = triggerElement.offset(),
        calcHorizPosition = "",
        calcVertPosition = "",
        tipHeight = tooltip.outerHeight() + 10,
        tipWidth = tooltip.outerWidth(),
        horzPosition = position.left + tipWidth + triggerElement.outerWidth();

    tooltip.css({ "position": "absolute" });

    if ($(window).width() < horzPosition) {
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
        ToolTips.toolTipSwitch(self);
      },
      timer: 1500,
      out: function () {
        tipIsVisible = setTimeout(ToolTips.removeToolTip, 900);
        $("#tool_tip_wrap").on("mouseenter", function () {
          clearTimeout(tipIsVisible);
        });
        $("#tool_tip_wrap").on("mouseleave", function () {
          tipIsVisible = setTimeout(ToolTips.removeToolTip, 900);
        });
      }
    });
  }
};