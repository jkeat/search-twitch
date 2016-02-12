import Ember from 'ember';
import config from '../config/environment';

export function calculateTotalPages(params) {
  let totalStreams = params[0];
  let totalPages = Math.ceil(totalStreams/config.APP.STREAMS_PER_PAGE);
  totalPages = totalPages < 1 ? 1 : totalPages; // For UI purposes, don't allow 0 total pages
  return totalPages;
}

export default Ember.Helper.helper(calculateTotalPages);
