import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		sendSearchAction(searchTerms) {
			/**
			 * All this abstraction may be overkill, but I think
			 * in a larger app the search bar could be reused
			 */
			this.sendAction('search', searchTerms);
		}
	}
});
