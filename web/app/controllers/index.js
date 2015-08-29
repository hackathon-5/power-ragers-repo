import Ember from 'ember';

export default Ember.Controller.extend({
	menuItems: [
		{
			title: 'Classic Mac',
			description: "This is the classic, where it all started. A delicious, mouth-watering heap of noodles and golden, oozing deliciousness. Did we mention the goldfish cracker crust?",
			price: 6.00
		},
		{
			title: 'Lobster Mac',
			description: "Thought it couldn't get any better? Think again. We threw in a few of Sebastian's tasty pals for this work of pasta art. Dont worry, they're on their way to Valhalla now.",
			price: 6.00
		},
		{
			title: 'Mac Attack',
			description: "7 cheeses. Enough said.",
			price: 6.00
		}
	]
});
