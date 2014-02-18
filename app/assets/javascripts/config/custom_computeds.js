function registerCustomComputed(name, macro) {
  Ember.computed[name] = function (dependentKey) {
    var args = [].slice.call(arguments);
    return Ember.computed(dependentKey, function () {
      return macro.apply(this, args);
    });
  };
}

registerCustomComputed('ternary', function (dependentKey, truthyValue, falsyValue) {
  return Ember.get(this, dependentKey) ? truthyValue : falsyValue;
});

registerCustomComputed('stringCombinator', function (key1, key2, separator) {
  return (Ember.get(this, key1) + separator + Ember.get(this, key2));
});

Ember.computed.arrayContains = function (dependentKey, value) {
  return Ember.computed(dependentKey, function () {
    if (!Ember.isArray(Ember.get(this, dependentKey))) {
      Ember.Logger.error("Computed Property requires an Array, passed property is not an array.");
      return false;
    }
    return Ember.get(this, dependentKey).contains(value);
  });
};
