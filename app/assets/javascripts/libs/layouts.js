var Layouts = {

  resizeAll: function () {
    Ember.run.debounce(this, this._resizeAll, 100);
  },

  resizeSearchViews: function () {
    Ember.run.debounce(this, this._resizeSearchViews, 100);
  },

  _resizeAll: function () {
    var self = this;
    Layouts.resizeStage();
    Layouts.resizeTopSections();
    Layouts.resizeBottomSections();
    $(window).resize(function() {
      Ember.run.debounce(self, self._resizeAll, 150);
    });
  },

  _resizeSearchViews: function () {
    var self = this;
    Layouts.resizeStage();
    Layouts.resizeMainColumns();
    $(window).resize(function() {
      Ember.run.debounce(self, self._resizeSearchViews, 150);
    });
  },

  resizeStage: function () {
    var mainHeader = $('#main_header'),
        mainWindow = $('#main_section'),
        quickLaunch = $("#quick_launch"),
        stageElement = $("#stage"),
        stockHeight = $(window).height() - mainHeader.height();

    $("#tracking-book").width($(window).width());
    mainHeader.width($(window).width());
    mainWindow.width($(window).width());

    stageElement.width(mainWindow.width() - quickLaunch.width());
    quickLaunch.height(stockHeight)
    stageElement.height(stockHeight);
  },

  resizeTopSections: function () {
    var topSection = $("#top_section"),
      mainContainers = topSection.find(".component_left"),
      secondaryContainers = topSection.find(".component_right");

    secondaryContainers.width(topSection.width() - (mainContainers.outerWidth() + 1));
  },

  resizeBottomSections: function () {
    var topSection = $("#top_section"),
        bottomSection = $('#bottom_section'),
      componentHeader = bottomSection.find('.component_header'),
      componentScroller = bottomSection.find('.component_scroller'),
      mainContainers = bottomSection.find(".component_left"),
      secondaryContainers = bottomSection.find(".component_right"),
      secondaryContainerHeader = bottomSection.find(".component_header"),
      secondaryContainerWrap = secondaryContainers.find('.content_component_wrap'),
      stageElement = $("#main_section");

    //   initStageScrollBar = stageElement.hasScrollBar('horizontal'),
    //   initScrollbarHeight = 0;

    // if (initStageScrollBar) {
    //   initScrollbarHeight = 17;
    // }

    bottomSection.height(stageElement.height() - (topSection.height() + 2));
    componentScroller.height(bottomSection.height() - (componentHeader.outerHeight() + 27));
    mainContainers.height(bottomSection.height());
    secondaryContainers.width(bottomSection.width() - mainContainers.outerWidth());
    secondaryContainers.height(bottomSection.height());
    secondaryContainerWrap.height(bottomSection.height() - secondaryContainerHeader.height());
  },

  resizeMainColumns: function () {
    Layouts.resizeColumnHeights();
    Layouts.resizeRightColumn();
  },

  resizeColumnHeights: function () {
    var columns = $('#columns'),
        stage = $("#stage"),
        leftColumn = $("#left_column_main"),
        rightColumn = $("#right_column_main"),
        componentScroller = leftColumn.find('.component_scroller'),
        componentHeader = leftColumn.find('.component_header');

    columns.width(stage.width());
    columns.height(stage.height());
    leftColumn.height(stage.height());
    rightColumn.height(stage.height());
    componentScroller.height(columns.height() - (componentHeader.outerHeight() + 27));
  },

  resizeRightColumn: function () {
    var leftColumn = $("#left_column_main"),
        rightColumn = $("#right_column_main"),
        topComponent = rightColumn.find('#com-r1'),
        lastComponent = rightColumn.find('.last_component'),
        lastComponentHeader = lastComponent.find('.component_header'),
        lastComponentContent = lastComponent.find('.component_wrap');

    rightColumn.width($('#stage').width() - leftColumn.outerWidth());
    lastComponentContent.height($('#stage').height() - (topComponent.height() + lastComponentHeader.height()));
  }

};