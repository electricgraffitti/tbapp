var Expose = {

  color: "#000000",
  opacity: "0.1",

  createExpose: function () {
    return $("<div id='expose_panel'></div>)");
  },

  appendExpose: function (exposeHtml, content) {
    $("body").append(exposeHtml);
    exposeHtml.css({ zIndex: 8999, backgroundColor: Expose.color, opacity: Expose.opacity });
    $("body").append(content);
    Expose.sizeExpose(exposeHtml);
  },

  sizeExpose: function (exposeHtml) {
    exposeHtml.width($(window).width()).height($(window).height());

    $(window).resize(function () {
      exposeHtml.width($(window).width()).height($(window).height());
    });

  },

  removeExpose: function () {
    var expose = $("#expose_panel");
    expose.remove();
  }

};