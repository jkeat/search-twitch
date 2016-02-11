import Ember from 'ember';

export function paginatorButtonDisableCheck(params) {
  let curPage = params[0],
  	  numPages = params[1],
  	  direction = params[2] // The direction that the button is incrementing
  if (curPage <= 1 && direction < 0) {
  	return true;
  }
  if (curPage >= numPages && direction > 0) {
  	return true;
  }
  return false;
}

export default Ember.Helper.helper(paginatorButtonDisableCheck);
