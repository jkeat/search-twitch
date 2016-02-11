import Ember from 'ember';

export function calculateTotalPages(params) {
  let totalPages = params[0];
  return Math.ceil(totalPages/10); // TODO PER PAGE
}

export default Ember.Helper.helper(calculateTotalPages);
