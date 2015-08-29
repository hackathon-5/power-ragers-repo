<?php

use \Silex\Application;

// Include stripe
$stripeRoot = '/../vendor/stripe/stripe-php/lib/';
// Stripe singleton
//require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Stripe.php');
// Utilities
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Util.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Util/Set.php');
// Errors
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Error.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/ApiError.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/ApiConnectionError.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/AuthenticationError.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/CardError.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/InvalidRequestError.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/RateLimitError.php');
// Plumbing
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Object.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/ApiRequestor.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/ApiResource.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/SingletonApiResource.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/AttachedObject.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/List.php');
// Stripe API Resources
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Account.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Card.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Balance.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/BalanceTransaction.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Charge.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Customer.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Invoice.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/InvoiceItem.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Plan.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Subscription.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Token.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Coupon.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Event.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Transfer.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Recipient.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/Refund.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/ApplicationFee.php');
require_once(dirname(__FILE__) . $stripeRoot . '/Stripe/ApplicationFeeRefund.php');

class StripeController extends \Stripe
{
	protected $app;

	public function __construct(Application $app, $apiKey)
	{
		// Configure
		$this->app = $app;
		$this->setApiKey($apiKey);
	}

	public function payForOrder($order)
	{
		// Create a new customer
		$customer = \Stripe\Customer::create(array(
			'email' => $order['customerEmail'],
			'card'  => $order['token']
		));

		// Pay for order
		$charge = \Stripe\Charge::create(array(
			'customer' => $customer->id,
			'amount'   => $order['price']*100,
			'currency' => 'usd'
		));

		// Return charge object
		return array(
			'chargeId' => $charge->id,
			'customerId' => $customer->id
		);
	}
}
?>