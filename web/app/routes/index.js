import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return {
			"id": 3,
			"center": [38.909671288923, -77.034084142948],
			"description": "A food truck serving an eclectic Fusion, and New American Cuisine.",
			"menuItems": [
				{
					"title": "BBQ Spring Rolls",
					"description": "Slow roasted pork and apple coleslaw served with house made BBQ sauce.",
					"price": 5.00
				},
				{
					"title": "BBQ Slider Burgers",
					"description": "Three beef sliders topped with crispy bacon, white cheddar, fried jalapeño and house made BBQ sauce.",
					"price": 8.00
				},
				{
					"title": "Blackened Fish Tacos",
					"description": "Three corn tortillas stuffed with blackend flounder, shaved cabbage, pineapple salsa and poblano ranch.",
					"price": 8.00
				},
				{
					"title": "Caprese Grilled Cheese",
					"description": "Pesto marinated fresh mozzarella and sliced tomato served on parmesan crusted sandwich bread.",
					"price": 7.00
				},
				{
					"title": "Carnitas Burrito",
					"description": "Slow roasted pork, pico de gallo, fresh avacado, black beans and rice, and chipotle sour cream in a flour tortilla.",
					"price": 8.00
				},
				{
					"title": "Kettle Chips & Drink",
					"description": "Add kettle chips and a drink.",
					"price": 2.00
				},
				{
					"title": "Korean BBQ Short Rib Meat",
					"description": "Korean BBQ short rib with smoked gouda cheese on toasted sourdough bread served with a side of house made kimchi coleslaw.",
					"price": 8.00
				},
				{
					"title": "Southern Chop Salad",
					"description": "Mixed greens tossed with poblano buttermilk ranch, white cheddar, diced tomato, red onion, grilled corn, chopped bacon, and fried okra.",
					"price": 7.00
				},
				{
					"title": "Spicy Curry Chicken Wrap",
					"description": "Crispy chicken breast tossed with coconut curry, Napa cabbage slaw dressed with Thai citrus sauce wrapped in a flat bread.",
					"price": 8.00
				}
			],
			"name": "Charleston Chew",
			"photo": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/10616488_533308266813724_7444608811242941718_n.jpg?oh=e894735865d84dd3393e7ba203b7c621&oe=567DAD2D"
		}
	},
	
	actions: {
		placeOrder: function(item) {
			this.controllerFor('application').set('menuItem', item);
			this.transitionTo('place-order');
		}
	}
});
