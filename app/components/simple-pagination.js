import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		/**
		 * Can use the same code for +1 and -1
		 */
		sendChangePageAction(numPages) {
			this.sendAction('changePage', numPages);
		}
	}
});
