import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('search', {path: "/"}, function() {
    this.route('results', {path: "streams"});
  });
});

export default Router;
