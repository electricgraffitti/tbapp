TBook.View = Ember.View.extend({
  didInsertElement: function () {
    Layouts.resizeAll();
  }
});

TBook.ColumnView = TBook.View.extend({
	didInsertElement: function() {
		this._super();
	}
});

TBook.FormView = TBook.View.extend({
	didInsertElement: function() {
		this._super();
		this.$('input:first').focus();
	}
});

TBook.ListView = TBook.View.extend({

  didInsertElement: function () {
    this._super();
    TBook.CSS.zebraStripe(this.$());
  },

  contextChange: function () {
    this.rerender();
    Ember.run.next(this, function() {
    	Layouts.resizeAll();
    });
  } .observes('controller.model')

});

TBook.SearchView = Ember.View.extend({
  didInsertElement: function () {
    Layouts.resizeSearchViews();
  }
});

TBook.SearchGridView = TBook.SearchView.extend({

  didInsertElement: function () {
    this._super();
    TBook.CSS.zebraStripe(this.$());
  },

  contextChange: function () {
    this.rerender();
    Ember.run.next(this, function () {
      Layouts.resizeSearchViews();
    });
  }.observes('controller.model')

});
