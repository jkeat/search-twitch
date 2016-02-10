import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		searchStreams(searchTerms) {
			this.transitionToRoute("search.results", { queryParams: {
				page: 1,
				q: searchTerms
			}});
		}
	}
});
