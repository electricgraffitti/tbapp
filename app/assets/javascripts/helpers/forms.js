Handlebars.registerHelper('listed_icon', function(text) {
  return new Handlebars.SafeString('<span class="icon listed_icon"></span>');
});

Handlebars.registerHelper('medium_avatar', function(text) {
  return new Handlebars.SafeString('<span class="icon listed_icon"></span>');
});

Handlebars.registerHelper('submitButton', function(text) {
  return new Handlebars.SafeString('<button type="submit" class="button red_button">' + text + '</button>');
});

Handlebars.registerHelper('toggleArrow', function () {
	return new Handlebars.SafeString('<span class="nav_toggle"></span>');
});

Handlebars.registerHelper('processingButton', function(text) {
  return new Handlebars.SafeString('<button class="button green_button" disabled="disabled">' + text + '</button>');
});

Handlebars.registerHelper('clear', function() {
	return new Handlebars.SafeString('<div class="clear"></div>');
});

Handlebars.registerHelper('required', function(text) {
  return new Handlebars.SafeString('<span class="required_asterisk">*</span>');
});

Handlebars.registerHelper('radioButton', function(text) {
  return new Handlebars.SafeString('<span class="radio_button"><span></span></span>');
});

Ember.Handlebars.helper('wysiwyg', Ember.View.extend({
  tagName: 'div',
  attributeBindings: ['placeholder'],

  init: function() {
    this._super();

    this.on("focusOut", this, this._elementValueDidChange);
    this.on("change", this, this._elementValueDidChange);
    this.on("paste", this, this._elementValueDidChange);
    this.on("cut", this, this._elementValueDidChange);
    this.on("input", this, this._elementValueDidChange);
  },

  _updateElementValue: Ember.observer(function() {
    var value = Ember.get(this, 'value'),
        textarea = this.$();

    if (!Ember.isEmpty(value)) {
    	if (textarea && value !== textarea.getCode()) {
	      textarea.setCode(value);
	    }
    } else {
     if (textarea && value !== textarea.getCode()) {
        textarea.setCode('');
      }
    }

  }, 'value'),

  _elementValueDidChange: function() {
    if (this.$().length) {
      Ember.set(this, 'value', this.$().getCode());
    }
  },

  didInsertElement: function() {
    this.$().redactor({
    	placeholder: true,
    	linebreaks: true,
    	buttons: ['fontcolor', 'backcolor', '|', 'formatting', '|', 'bold', 'italic', 'deleted', 'underline', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', '|', 'alignment', '|', 'horizontalrule', '|', 'table']
    });
    this._updateElementValue();
  }
}));

Ember.Handlebars.helper('answerTypeSelect', Ember.Select.extend({
	contentBinding: 'TBook.answerTypes',
  prompt: "Select expected answer type",
  valueBinding: 'this.controller.lesson_answer_type',
  classNames: ['select'],

  didInsertElement: function () {
  	FormElements.customSelects();
  }
}));

Ember.Handlebars.helper('avatar-uploader', Ember.TextField.extend({
	type: 'file',
	classNames: 'custom_upload pointer',

	didInsertElement: function () {
		FormElements.customUploadElement(this.$());
	},

	change: function (event) {
		var input = event.target,
				reader = new FileReader();
				self = this;

		if (input.files && input.files[0]) {
			FormElements.updateCustomUploadElement(self.$(), input.files[0])
    	reader.onload = function(e) {
    		var fileToUpload = e.srcElement.result;
        self.get('parentController').set('newAvatar', input.files[0]);
      }
    	reader.readAsDataURL(input.files[0]);
  	}
	}
}));

Ember.Handlebars.helper('date-field', Ember.TextField.extend({
  type: 'date',
  hasFocus: false,
  placeholderBinding: 'MM/DD/YYYY',
  classNames: 'form-control'
}));

Ember.Handlebars.helper('number-field', Ember.TextField.extend({
  type: 'number',
  attributeBindings: ['min', 'max', 'step'],
  numbericValue : function (key,v) {
    if (arguments.length === 1)
      return parseFloat(this.get('value'));
    else
      this.set('value', v !== undefined ? v+'' : '');
  }.property('value'),
  didInsertElement: function() {
    this.$().keypress(function(key) {
      if((key.charCode!=46)&&(key.charCode!=45)&&(key.charCode < 48 || key.charCode > 57)) return false;
    })  
  }
}));

Ember.Handlebars.helper('document-uploader', Ember.TextField.extend({
	type: 'file',
	classNames: 'custom_upload pointer',

	didInsertElement: function () {
		FormElements.customUploadElement(this.$());
	},

	change: function (event) {
		var input = event.target,
				reader = new FileReader();
				self = this;
		if (input.files && input.files[0]) {
			FormElements.updateCustomUploadElement(self.$(), input.files[0])
    	reader.onload = function(e) {
    		var fileToUpload = e.srcElement.result;
        self.get('parentController').set('resource_document', input.files[0]);
      }
    	reader.readAsDataURL(input.files[0]);
  	}
	}
}));

Ember.Handlebars.helper('image-uploader', Ember.TextField.extend({
	type: 'file',
	classNames: 'custom_upload pointer',

	didInsertElement: function () {
		FormElements.customUploadElement(this.$());
	},

	change: function (event) {
		var input = event.target,
				reader = new FileReader();
				self = this;
		if (input.files && input.files[0]) {
			FormElements.updateCustomUploadElement(self.$(), input.files[0])
    	reader.onload = function(e) {
    		var fileToUpload = e.srcElement.result;
        self.get('parentController').set('resource_image', input.files[0]);
      }
    	reader.readAsDataURL(input.files[0]);
  	}
	}
}));

Ember.Handlebars.helper('video-uploader', Ember.TextField.extend({
	type: 'file',
	classNames: 'custom_upload pointer',

	didInsertElement: function () {
		FormElements.customUploadElement(this.$());
	},

	change: function (event) {
		var input = event.target,
				reader = new FileReader();
				self = this;
		if (input.files && input.files[0]) {
			FormElements.updateCustomUploadElement(self.$(), input.files[0])
    	reader.onload = function(e) {
    		var fileToUpload = e.srcElement.result;
        self.get('parentController').set('resource_video', input.files[0]);
      }
    	reader.readAsDataURL(input.files[0]);
  	}
	}
}));
