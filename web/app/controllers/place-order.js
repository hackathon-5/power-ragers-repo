import Ember from 'ember';

export default Ember.Controller.extend({
	needs: 'application',
	
	menuItem: function() {
		return this.get('controllers.application.menuItem');
	}.property('controllers.application.menuItem')
});
