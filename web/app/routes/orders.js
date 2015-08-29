import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('order', {
			truckId: 1
		});
	},
	
	actions: {
		closeOrder: function(order) {
			order.set('open', false);
			order.save();
		}
	}
});
