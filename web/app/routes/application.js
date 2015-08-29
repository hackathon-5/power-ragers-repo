import Ember from 'ember';

export default Ember.Route.extend({
	// Implementing the setup controller method to setup notifications
	// using ember-cli-notifications
    setupController: function(controller, model) {
    	this.notifications.setDefaultClearNotification(6000);
    	controller.set('model', model);
    },
});
