import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		order: function() {
			var route = this;
			
			var handler = StripeCheckout.configure({
			    key: 'pk_test_s29HTCY8SQwT0TpHBxDnfpjI',
			    locale: 'auto',
			    token: function(token) {
			      // Use the token to create the charge with a server-side script.
			      // You can access the token ID with `token.id`
			      var order = route.store.createRecord('order', {
				      customerName: route.controller.customerName,
				      customerEmail: token.email,
				      itemName: 'Mac & Cheese',
				      price: 6,
				      customerPhoneNumber: route.controller.phoneNumber,
				      token: token.id
			      });
			      
			      order.save().then(
			      	//success
			      	function() {
				      	route.notifications.addNotification({
					        message: 'Order up!',
					        type: 'success',
					        autoClear: true
					    });
					    route.transitionTo('confirmation');
			      	}
			      );
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
