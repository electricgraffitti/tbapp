var Layouts = {

  resizeAll: function () {
    Ember.run.debounce(this, this._resizeAll, 100);
  },

  resizeSearchViews: function () {
    Ember.run.debounce(this, this._resizeSearchViews, 100);
  },

  _resizeAll: function () {
    Layouts.resizeStage();
    Layouts.resizeTopSections();
    Layouts.resizeBottomSections();
  },

  _resizeSearchViews: function () {
    Layouts.resizeStage();
    Layouts.resizeMainColumns();
  },

  resizeStage: function () {
    var quickLaunch = $("#quick_launch"),
        stageElement = $("#stage"),
        stockHeight = $(window).height() - $("#main_header").height();

    if ($(window).width() >= 1280) {
      $("#tracking-book").width($(window).width());
    }

    stageElement.width($(window).width() - quickLaunch.width());
    quickLaunch.height(stockHeight)
    stageElement.height(stockHeight);

    var resizeCallback = function () {
      var resizedQuickLaunch = $("#quick_launch"),
          resizedStageElement = $("#stage"),
          newStockHeight = $(window).height() - $("#main_header").height();

      if ($(this).width() >= 1280) {
        $("#tracking-book").width($(this).width());
      }
      resizedStageElement.width($(window).width() - quickLaunch.width());
      resizedQuickLaunch.height(stockHeight)
      resizedStageElement.height(stockHeight);
    };

    this.setupResizeEvent("resizeStage", resizeCallback);
  },

  resetTopSection: function (newHeight, defaultHeight) {
    var topSection = $("#top_section"),
        components = topSection.find('.component');

    if (newHeight < defaultHeight) {
       components.each(function(idx, component) {
       if ($(component).height() > defaultHeight) {
            $(component).height(defaultHeight);
          }
       });
    }
  },

  resizeTopSections: function () {
    var topSection = $("#top_section"),
      mainContainers = topSection.find(".component_left"),
      secondaryContainers = topSection.find(".component_right");

    secondaryContainers.width($(window).width() - (mainContainers.outerWidth() + 2));
    mainContainers.height(topSection.height());
    secondaryContainers.height(topSection.height());

    var resizeCallback = function () {
      secondaryContainers.width($(window).width() - (mainContainers.outerWidth() + 2));
      mainContainers.height(topSection.height());
      secondaryContainers.height(topSection.height());
    };

    this.setupResizeEvent("resizeTopSections", resizeCallback);
  },

  resizeBottomSections: function () {
    var topSection = $("#top_section"),
      bottomSection = $('#bottom_section'),
      componentHeader = bottomSection.find('.component_header'),
      componentScroller = bottomSection.find('.component_scroller'),
      mainContainers = bottomSection.find(".component_left"),
      secondaryContainers = bottomSection.find(".component_right"),
      stageElement = $("#stage"),
      initStageScrollBar = stageElement.hasScrollBar('horizontal'),
      initScrollbarHeight = 0;

    if (initStageScrollBar) {
      initScrollbarHeight = 17;
    }

    bottomSection.height(stageElement.height() - (topSection.height() + initScrollbarHeight)).width($(window).width());
    componentScroller.height(bottomSection.height() - (componentHeader.outerHeight() + 27));
    mainContainers.height(bottomSection.height());
    secondaryContainers.width($(window).width() - mainContainers.outerWidth());

    var resizeCallback = function () {
      var stageScrollBar = $("#stage").hasScrollBar('horizontal'),
        scrollbarHeight = 0;

      if (stageScrollBar) {
        scrollbarHeight = 17;
      }

      bottomSection.height($("#stage").height() - (topSection.height() + scrollbarHeight)).width($("#stage").width());
      componentScroller.height(bottomSection.height() - (componentHeader.outerHeight() + 27));
      mainContainers.height(bottomSection.height());
      secondaryContainers.width($(window).width() - mainContainers.outerWidth());
    };

    this.setupResizeEvent("resizeBottomSections", resizeCallback);
  },

  resizeMainColumns: function () {
    Layouts.resizeColumnHeights();
    Layouts.resizeRightColumn();
  },

  resizeColumnHeights: function () {
    var columns = $('#columns'),
        stage = $("#stage"),
        componentScroller = columns.find('.component_scroller'),
        componentHeader = columns.find('.component_header');

    columns.width(stage.width());
    columns.height(stage.height());
    componentScroller.height(columns.height() - (componentHeader.outerHeight() + 27));

    var resizeCallback = function () {
      columns.width(stage.width());
      columns.height(stage.height());
      componentScroller.height(columns.height() - (componentHeader.outerHeight() + 27));
    };

    this.setupResizeEvent("resizeColumnHeights", resizeCallback);
  },

  // This could be used to make a left column expand if a right column is non-existent
  resizeLeftColumn: function () {
    var leftColumn = $("#left_column_main"),
        rightColumn = $("#right_column_main"),
        components = leftColumn.find(".component");
     
    leftColumn.width($(window).width() - rightColumn.outerWidth());
    
    var resizeCallback = function () {
      leftColumn.width($(window).width() - rightColumn.outerWidth());
    };

    this.setupResizeEvent("resizeLeftColumn", resizeCallback);
  },

  resizeRightColumn: function () {
    var leftColumn = $("#left_column_main"),
        rightColumn = $("#right_column_main"),
        rightColumnComponents = rightColumn.find('.component'),
        rightColumnComponentsCount = rightColumnComponents.length;

    rightColumn.width($('#columns').width() - (leftColumn.outerWidth() + 2));

    var resizeCallback = function () {
      rightColumn.width($('#columns').width() - (leftColumn.outerWidth() + 2));
    };

    this.setupResizeEvent("resizeRightColumn", resizeCallback);
  },

  setupResizeEvent: function (previousHookName, callback) {
    var key = previousHookName + "-key",
      previousHook = this[key];

    // remove any previous hook from the resize event
    if (previousHook) {
      $(window).off("throttledresize", previousHook);
    }

    // hook up the callback to the resize event
    $(window).on("throttledresize", callback);

    // keep track of any resize event (in case we need to remove it later)
    this[key] = callback;
  }

};