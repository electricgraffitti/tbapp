Nucleus.ChildPopupActions = {

	updateDocuments: function(docIds) {
		var container = Nucleus.__container__,
			claimController = container.lookup('controller:claim');
		claimController.set('hasDocs', !Ember.isEmpty(docIds));
	},

  updateNotes: function(hasNotes) {
      var container = Nucleus.__container__,
          claimController = container.lookup('controller:claim');
      claimController.set('hasNotes', hasNotes);
  },

  updateFlagLogic: function (flagId, logicState) {
 		var flag = Nucleus.Flag.find(flagId);
 		flag.set('logic', logicState);
  }

}
