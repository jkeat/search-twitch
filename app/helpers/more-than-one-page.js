import Ember from 'ember';
import config from '../config/environment';

export function moreThanOnePage(params) {
	let totalStreams = params[0];
	let totalPages = Math.ceil(totalStreams/config.APP.STREAMS_PER_PAGE);
	return (totalPages > 1)
}

export default Ember.Helper.helper(moreThanOnePage);
