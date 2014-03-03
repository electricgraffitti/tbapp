// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require vendor/jquery
// require_tree ./../vendor/flat-ui

//= require vendor/handlebars
//= require vendor/ember
//= require vendor/ember-data
//= require vendor/ic-ajax
//= require ./../config/app_init
//= require ./../config/router
//= require_tree ./../libs
//= require_self

$(function() {
	TBook.Flash.injectFlashBox();
  TBook.Flash.setFlash();
  $('#username').focus();
});
