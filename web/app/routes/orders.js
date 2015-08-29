import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return this.store.find('order', {
			truckId: 3
		});
	},
	
	actions: {
		closeOrder: function(order) {
			order.set('open', false);
			order.save();
		}
	}
});
