TBook.URL = {

  /**
  @private

  Set a general wrapper around jQuery's getJSON setting the namespace to /api

  @method basicLoad
  **/

  basicLoad: function (urlString) {
    return $.getJSON('/api/' + urlString);
  },

  /**
  @private

  Sets up a general Ajax status code handler. This may need to be more robust based on specific cases.

  @method basicLoad
  **/
  generalErrorHandler: function () {
    $(document).ajaxError(function (event, response, ajaxSettings, thrownError) {
      var router = TBook.URL.router();

      if (response.status === 401) {
        window.location.href = TBook.getLoginPage();
      }

      // if a callback has defined an error callback, use it!
      if (ajaxSettings.error !== undefined) {
        return;
      }
      if (response.status === 400) {
        router.transitionTo('errors', { id: '400' });
      }
      if (response.status === 404) {
        router.transitionTo('errors', { id: '404' });
      }
      if (response.status === 500) {
        router.transitionTo('errors', { id: '500' });
      }
    });
  },

  /**
  @private

  Get a handle on the application's router. Note that currently it uses `__container__` which is not
  advised but there is no other way to access the router.

  @method router
  **/
  router: function () {
    return TBook.__container__.lookup('router:main');
  },

  /**
  @private

  Get the origin of the current location.
  This has been extracted so it can be tested.

  @method origin
  **/
  origin: function () {
    return window.location.origin;
  },

  /**
  @private

  Redirect to a URL.
  This has been extracted so it can be tested.

  @method redirectTo
  **/
  redirectTo: function (url) {
    window.location = url;
  },

  /**
  @private

  Simple method to return a root url

  @method getRoot
  **/
  getRoot: function (rootType) {
    switch (rootType) {
      case "Retro":
        return TBook.retroDomain;
        break;
      case "ClinicalOps":
        return TBook.localDomain;
        break;
      default:
        return TBook.localDomain;
    }
  },

  /**
  @private

  Pass an Object hash and generate a URL.
  This has been extracted so it can be tested.

  @arguments
  root - 'Retro' or 'ClinicalOps',
  params - Key Value Object that we iterate over making a url params string
  encoded - Whether or not we want to use the urlEncode


  @method generateUrlString
  **/
  generateUrlString: function (root, params, encoded) {
    var returnString = '',
        urlRoot = TBook.URL.getRoot(root),
        paramsString = '';

    $.each(params, function (k, v) {
      if (paramsString !== '') {
        paramsString += '&'
      }
      paramsString += k;
      paramsString += '=';
      paramsString += v;
      if (encoded === true) {
        paramsString = TBook.URL.urlEncode(paramsString);
      }
    });
  },

  /**
  @private

  Generates an encoded url for use with retro
  utf8 encode, then base64 encode, then c# UrlTokenEncode, ported from mono.
  You must still attach the page.aspx?data= portion
  input should be querystring values key=value&key2=value2 to be converted to
  order is not important!!!
  Q2xpZW50PUVCTUMmQ2xhU2VxPTczODEzNTYmQ2xhU3ViPTAmU3RhdHVzPVU1

  this method depends on base64 library

  @method urlEncode
  **/
  urlEncode: function (input) {
    if (input === undefined) return undefined;
    // utf encode the string (unescape it as well)
    input = unescape(encodeURIComponent(input));
    if (input.length < 1) return "";
    // convert to base 64
    var b64 = base64.encode(input);
    var retlen;
    // if base64 fail
    if (b64 === undefined || (retlen = b64.length) === 0) return "";

    // MS.NET implementation seems to process the base64
    // string before returning. It replaces the chars:
    //
    //  + with -
    //  / with _
    //
    // Then removes trailing ==, which may appear in the
    // base64 string, and replaces them with a single digit
    // that's the count of removed '=' characters (0 if none
    // were removed)
    var equalsCount = 0x30;
    while (retlen > 0 && b64[retlen - 1] === '=') {
      equalsCount++;
      retlen--;
    }
    var chars = new Array(retlen + 1);
    chars[retlen] = String.fromCharCode(equalsCount);
    for (var i = 0; i < retlen; i++) {
      switch (b64[i]) {
        case '+':
          chars[i] = '-';
          break;

        case '/':
          chars[i] = '_';
          break;

        default:
          chars[i] = b64[i];
          break;
      }
    }
    return chars.join("");
  }
};

