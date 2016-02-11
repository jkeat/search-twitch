import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		sendSearchAction(searchTerms) {
			this.sendAction('search', searchTerms);
		}
	}
});
