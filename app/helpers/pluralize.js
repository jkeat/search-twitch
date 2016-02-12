import Ember from 'ember';

export function pluralize(params) {
	let num = params[0];
	if (num != 1) {
		return 's'
	}
}

export default Ember.Helper.helper(pluralize);
