import Ember from 'ember';
import config from '../../config/environment';

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
		var STREAMS_PER_PAGE = config.APP.STREAMS_PER_PAGE; // TODO: make app variable
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
				/**
				 * Attaching these through here because afterModel hasn't fully
				 * implemented query parameter access yet.
				 * https://github.com/emberjs/ember.js/issues/12169
				 **/
				data["current_page"] = page;
				data["twitch_query"] = query;
				return data;
			},
			error: function(request, status, error) {
				console.log(error);
			}
		});
	},
	afterModel(model, transition) {
		/**
		 * Send user back to last page if they've gone past it
		 * (Happens often because the # of streams frequently changes)
		 *
		 * This works, but there's an Ember bug (I _think_?) that throws an error.
		 * Bug discussed here: https://github.com/emberjs/ember.js/issues/12169
		 * Shouldn't have used Ember 2.3 ...
		 */
		let lastPage = Math.ceil(model["_total"]/config.APP.STREAMS_PER_PAGE), // TODO!
		    curPage = model["current_page"],
		    query = model["twitch_query"];
		if (curPage > lastPage && lastPage != 0) {
			console.log("If an error occurred, it is discussed here: https://github.com/emberjs/ember.js/issues/12169");
			this.transitionTo('search.results', { queryParams: {
				page: lastPage,
				q: query
			}});
		}
	}

});