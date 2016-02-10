import Ember from 'ember';

export default Ember.Controller.extend({
	// Specify query parameters
	queryParams: ['q', 'page'],

	/**
	 * Query parameters are automatically bound to these properties
	 * Defaults values are set
	 */
	q: null,
	page: 1,
});
