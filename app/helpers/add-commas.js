import Ember from 'ember';

export function addCommas(params) {
  let num = params[0];
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Ember.Helper.helper(addCommas);
