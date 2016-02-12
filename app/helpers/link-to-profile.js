import Ember from 'ember';

export function linkToProfile(params) {
	let streamURL = params[0];
	return (streamURL + "/profile");
}

export default Ember.Helper.helper(linkToProfile);
