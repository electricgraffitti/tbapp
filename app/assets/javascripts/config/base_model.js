TBook.Model = DS.Model.extend();

// TBook.Model.reopen({
  
//   hasProperty: function(key) {
//     return !Ember.isEmpty(this.getProperties(key));
//   },

//   propertyEqualParam: function (property, params) {
//     return this.get(property) == params[property];
//   },

//   hasParams: function (params) {
//     var paramKey = Ember.keys(params)[0];
//     return this.hasProperty(paramKey) && this.propertyEqualParam(paramKey, params);
//   },

//   toSimpleJSON: function() {
//     var key, meta,
//         json = {},
//         attributes = this.constructor.getAttributes(),
//         properties = attributes ? this.getProperties(attributes) : {},
//         rootKey = get(this.constructor, 'rootKey');

//     for (key in properties) {
//       meta = this.constructor.metaForProperty(key);
//       if (meta.type && meta.type.serialize) {
//         json[this.dataKey(key)] = meta.type.serialize(properties[key]);
//       } else if (meta.type && Ember.Model.dataTypes[meta.type]) {
//         json[this.dataKey(key)] = Ember.Model.dataTypes[meta.type].serialize(properties[key]);
//       } else {
//         json[this.dataKey(key)] = properties[key];
//       }
//     }

//     if (rootKey) {
//       var jsonRoot = {};
//       jsonRoot[rootKey] = json;
//       return jsonRoot;
//     } else {
//       var jsonRoot = {};
//       jsonRoot[get(this.constructor, 'serialKey')] = json;
//       return jsonRoot;
//     }
//   }

// });

// TBook.LocalStorageModel = Ember.Model.extend();

// TBook.LocalStorageModel.reopenClass({
//   adapter: TBook.LocalStorageAdapter.create(),
//   localStorageAllowedLifespanMinutes: 720, //12 hours
//   localStorageSlidingExpiration: false // only last the allowed lifespan no matter what
// });
