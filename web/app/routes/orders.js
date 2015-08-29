import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return [{
			itemName: 'Mac & Cheese',
			createdAt: 'placed 4 minutes ago',
			customerName: 'Truck Harrison',
			open: true,
			price: 5.50
		},
		{
			itemName: 'Mac & Cheese',
			createdAt: 'placed 4 minutes ago',
			customerName: 'Truck Harrison',
			open: true,
			price: 5.50
		},
		{
			itemName: 'Mac & Cheese',
			createdAt: 'placed 4 minutes ago',
			customerName: 'Truck Harrison',
			open: true,
			price: 5.50
		},
		{
			itemName: 'Mac & Cheese',
			createdAt: 'placed 4 minutes ago',
			customerName: 'Truck Harrison',
			open: false,
			price: 5.50
		},
		{
			itemName: 'Mac & Cheese',
			createdAt: 'placed 4 minutes ago',
			customerName: 'Truck Harrison',
			open: false,
			price: 5.50
		},
		{
			itemName: 'Mac & Cheese',
			createdAt: 'placed 4 minutes ago',
			customerName: 'Truck Harrison',
			open: false,
			price: 5.50
		},
		{
			itemName: 'Mac & Cheese',
			createdAt: 'placed 4 minutes ago',
			customerName: 'Truck Harrison',
			open: false,
			price: 5.50
		}];	
	}
});
