window.TBook = Ember.Application.create({
	rootElement: '#tracking-book',
	LOG_TRANSITIONS: true
});

TBook.Store = DS.Store.extend();
TBook.ajax = ic.ajax;

TBook.ApplicationSerializer = DS.ActiveModelSerializer.extend({});

TBook.ApplicationAdapter = DS.RESTAdapter.extend({
  pathForType: function(type) {
    var underscored = Ember.String.underscore(type)
    return Ember.String.pluralize(underscored);
  },

  typeForRoot: function(root) {
    var camelized = Ember.String.camelize(root);
    return Ember.String.singularize(camelized);
  },

  serializeIntoHash: function(data, type, record, options) {
    var root = Ember.String.decamelize(type.typeKey);
    data[root] = this.serialize(record, options);
  },
  
  serializeAttribute: function(record, json, key, attribute) {
    var attrs = Ember.get(this, 'attrs');
    var value = Ember.get(record, key), type = attribute.type;

    if (type) {
      var transform = this.transformFor(type);
      value = transform.serialize(value);
    }

    // if provided, use the mapping provided by `attrs` in
    // the serializer
    key = attrs && attrs[key] || Ember.String.decamelize(key);

    json[key] = value;
  }
});
