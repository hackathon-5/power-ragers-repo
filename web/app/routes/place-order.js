import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		placeOrder: function() {
			var handler = StripeCheckout.configure({
			    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
			    locale: 'auto',
			    token: function(token) {
			      // Use the token to create the charge with a server-side script.
			      // You can access the token ID with `token.id`
			    }
			  });

			  handler.open({
			      name: 'Mac & Cheese',
			      description: 'Delicious!',
			      amount: 600
			  });
			
			  // Close Checkout on page navigation
			  $(window).on('popstate', function() {
			    handler.close();
			  });
		}
	}
});
