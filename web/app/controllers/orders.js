import Ember from 'ember';

export default Ember.Controller.extend({
	open: function() {
		return this.model.filterBy('open', true);
	}.property('model.@each.open'),
	
	closed: function() {
		return this.model.filterBy('open', false);
	}.property('model.@each.open'),
	
	openOrders: true,
	
	actions: {
		switchTab: function() {
			this.toggleProperty('openOrders');
		}
	}
});
