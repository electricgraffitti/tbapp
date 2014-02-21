  /**
  @Object Nucleus.Logger
  
  Dependencies: 
    JQuery and console existing (Open the dev tools in ie8)
    Meta Element <meta name="nuclog" id="nuclog" content="true">

  **/
Nucleus.Logger = {

  _on: null,

  _colorSchemes: ['background: #222; color: #bada55', 'background: #222; color: #fb8eff', 'background: #222; color: #ba8a33', 'background: #000a00; color: #ff519d', 'background: #000a00; color: #c42dff', 'background: #00fa00; color: #142dff', 'background: #000a00; color: white'],

  on: function () {
    if (this._on === null)
      this._on = ($("meta[name=nuclog]").attr("content") === "true" && typeof console !== "undefined" && typeof console.log !== "undefined");
    return this._on;
  },

  getScheme: function (schemeIndex) {
    if (schemeIndex === undefined) schemeIndex = 0;
    return this._colorSchemes[schemeIndex];
  },

  stack: function (schemeIndex) {
    if (!this.on()) return;
    try{
      var e = new Error('dummy'),
        stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
                       .replace(/^\s+at\s+/gm, '')
                       .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@');

    
      console.log('%c ' + stack, this.getScheme(schemeIndex));
    } catch (e) {
      // Screw you IE 8
      console.log('%c ' + e, this.getScheme(schemeIndex));
    }
  },

  timestamp: function (val, schemeIndex) {
    if (!this.on()) return;

    var d = new Date,
        timestamp = d.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + "." + d.getMilliseconds();

    

    if (val && val.length > 0) {
      timestamp += ": " + val;
    }
    console.log('%c ' + timestamp, this.getScheme(schemeIndex));
  }

};
