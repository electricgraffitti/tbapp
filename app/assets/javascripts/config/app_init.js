window.TBook = Ember.Application.create({
	rootElement: '#tracking-book',
	LOG_TRANSITIONS: true
});

TBook.Store = DS.Store.extend();
TBook.ajax = ic.ajax;