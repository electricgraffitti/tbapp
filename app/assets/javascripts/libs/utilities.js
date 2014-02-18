var Utility = {

  nonAlphaNumericInput: function(event) {
    // TODO setup keyCodes
    return true;
  },

  arrayShuffle: function (o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },

  objectArrayShuffle: function (objects) {
    for(var j, x, i = objects.length; i; j = Math.floor(Math.random() * i), x = objects[--i], objects[i] = objects[j], objects[j] = x);
    return Utility.setRandomArrayIndex(objects);
  },

  setRandomArrayIndex: function (objects) {
    for (var i=0; i < objects.length; i++) { 
      objects[i].question_index = i + 1;
    }
    return objects;
  },

	getDateYear: function () {
		var d = new Date();
		return d.getFullYear();
	},

  unifyString: function(string) {
    var splitString = string.split(' '),
        combinedString = splitString.join('-');

    return combinedString;
  },

  calculateFileSize: function (size) {
    var kbs = Math.round(parseFloat(size / 1000)),
        returnString;
        
    switch (true) {
      case (kbs > 1024):
        returnString = (kbs / 1024).toPrecision(2) + ' Mb';
        break;
      case (size < 1024):
        returnString = size + ' bytes';
        break;
      default:
        returnString = kbs + ' kb';
        break;
    }

    return returnString;
  },

  isNumeric: function(strString) {
   var validChars = "0123456789",
       strChar,
       checkResult = true;

  if (strString.length == 0) return false;

   //  test strString consists of valid characters listed above
  for (i = 0; i < strString.length && checkResult == true; i++) {
    strChar = strString.charAt(i);
    if (validChars.indexOf(strChar) == -1) {
      checkResult = false;
    }
  }
   return checkResult;
 }

};