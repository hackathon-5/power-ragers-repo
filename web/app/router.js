import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('orders');
  this.route('place-order');
  this.route('confirmation');
});

export default Router;
