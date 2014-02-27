TBook.ListActions = Ember.Mixin.create({

  setSelectedObject: function(selectedObject, objectGroup) {
    this.deselectAllObjects(objectGroup);
    selectedObject.set('isSelected', true);
  },

  deselectAllObjects: function(objectGroup) {
    objectGroup.forEach(function(obj) {
      obj.set('isSelected', false);
    });
  }

});
