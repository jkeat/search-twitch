import Ember from 'ember';

export default Ember.Route.extend({
	/**
	 * For both parameters, always refresh the model() query when they change
	 */
	queryParams: {
		q: {
	    	refreshModel: true
	    },
	    page: {
	    	refreshModel: true
	    }
	},

	/**
	 * Before loading the stream data,
	 * make sure the parameters are valid
	 */
	beforeModel(transition) {
		var query = transition.queryParams["q"];
		var page = transition.queryParams["page"];
		if (query == null || !query || page < 1) {
			this.transitionTo('search');
		}
	},

	/**
	 * Get appropriate stream data via Twitch.tv API, based on the 'page' and 'query' parameters
	 * Load it so the stream-list controller and template have access
	 */
	model(params) { // TODO: Make sep. function... But where?
		var STREAMS_PER_PAGE = 10; // TODO: make app variable
		var query = params["q"];
		var page = params["page"];

		// Subtract one because pages are counted starting from 1
		var offset = (page - 1) * STREAMS_PER_PAGE;

		/**
		 * Another way to do this would be to use ember-data,
		 * normalizing the response to work with normal Ember models.
		 *
		 * Ember waits for the response here; it understands it's asynchronous
		 */
		return Ember.$.ajax( {
			type: "GET",
			url: "https://api.twitch.tv/kraken/search/streams",
			data: {
				"client_id": "egp2jih4zc15rrii16npca9feb3kglt",
				"query": query,
				"offset": offset,
				"limit": STREAMS_PER_PAGE,
			},
			success: function(data, text) {
				return data;
			},
			error: function(request, status, error) {
				console.log(error);
			}
		});
	}
});