import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'form',
	submit: function(e) {
		e.preventDefault();
		if (this.searchTerms != "") {
			this.get('onSubmit')(this.searchTerms);
		}
	}
});
