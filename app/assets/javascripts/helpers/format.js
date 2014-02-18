Ember.Handlebars.helper('upcase', function(textValue) {
	return textValue.toUpperCase();
});

Ember.Handlebars.helper('caplitalize', function(textValue) {
	return textValue.charAt(0).toUpperCase() + textValue.slice(1).toLowerCase();
});

Ember.Handlebars.helper('formatFileType', function(mimeType) {
	var splitString = mimeType.split('/'),
			fileType = splitString[1].toUpperCase();
	return fileType;
});

Ember.Handlebars.helper('formatFileSize', function(fileSize) {
	return Utility.calculateFileSize(fileSize);
});

Ember.Handlebars.helper('titleize', function(textValue) {
	var splitString = textValue.split(' '),
			segment;
  
  for ( var i = 0; i < splitString.length; i++ ) {
  	segment = splitString[i].charAt(0).toUpperCase();
        splitString[i] = segment + splitString[i].substr(1);
    }
    return splitString.join(" ");
});

Ember.Handlebars.helper('badge', function(count) {
  return new Handlebars.SafeString('<span class="badge">' + count + ' </span>');
});

Ember.Handlebars.helper('clean', function(value) {
	
	if (value) {
		return new Handlebars.SafeString(value);
	}
  
});