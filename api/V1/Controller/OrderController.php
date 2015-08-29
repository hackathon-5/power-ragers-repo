<?php

namespace Controller;

use \Exception;
use Model\Order;
use Model\OrderQuery;
use Silex\Application;

use Symfony\Component\HttpFoundation\Request;

class OrderController {

	protected $app;
	protected $request;
	protected $request_body;

	public function __construct($app, $request)
	{
		//parent::__construct($app);

		$this->app = $app;
		$this->request = $request;

		$this->request_body = json_decode($request->getContent(), true);
	}

	public function deleteOrder($id)
	{
		// Get the given order
		$order = OrderQuery::create()->findPK($id);
		if(null === $order)
		{
			throw new Exception("Order, $id, not found.", 404);
		}

		// And delete it
		$order->delete();
		return "Order, $id, deleted successfully.";
	}

	public function placeOrder()
	{
		// Make sure request is well formated
		if(!array_key_exists('order', $this->request_body))
		{
			throw new Exception('Missing or malformed request.', 422);
		}
		$input = $this->request_body['order'];
		$requiredKeys = array(
			'customerName',
			'customerEmail',
			'itemName',
			'price',
			'token'
		);
		$this->app['utils']->verifyInputIsntNull($input, $requiredKeys);

		// Create new Order object
		$order = new Order();
		$order->setTruckId($truckId = 1);
		$order->setItemName($input['itemName']);
		$order->setPrice($input['price']);
		$order->setCustomerName($input['customerName']);
		$order->setCustomerEmail($input['customerEmail']);
		if(array_key_exists('customerPhoneNumber', $order))
		{
			$order->setCustomerPhoneNumber($input['customerPhoneNumber']);
		}

		// Pay for order
		$payment = $this->payForOrder($input);
		// Add order info to order
		$order->setChargeId($payment['chargeId']);
		$order->setCustomerId($payment['customerId']);
		// Save the Order to the db
		$order->save();

		// Return Order objet
		return array('order' => $order->toArray());
	}

	protected function payForOrder($order)
	{
		// Setup Stripe
		\Stripe\Stripe::setApiKey($this->app['stripe_keys']['secret_key']);

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

	public function updateOrder($id)
	{
		// Make sure request is well formated
		if(!array_key_exists('order', $this->request_body))
		{
			throw new Exception('Missing or malformed request.', 422);
		}
		$input = $this->request_body['order'];

		// Get order
		$order = OrderQuery::create()
				->findPK($id);
		if(null === $order)
		{
			throw new Exception("Order, $id, not found.", 404);
		}

		// Update order
		if(array_key_exists('open', $input))
		{
			// Update order status
			$order->setOpen($input->open);

			// If the order is ready, alert the customer
			$customer_phone_number = $order->getCustomerPhoneNumber();
			if($customer_phone_number !== null && $input['open'] == false)
			{
				$customer_name = $order->getCustomerName();
				$item_name = $order->getItemName();

				$message = $this->app['twilio']->account->messages->create(array(
					"From" => "8433528360",
					"To" => $customer_phone_number,
					"Body" => "Hey $customer_name, your $item_name is ready!",
				));
			}
		}
		if(array_key_exists('customerPhoneNumber', $input))
		{
			$order->setCustomerPhoneNumber($input['customerPhoneNumber']);
		}
		$order->save();

		// Return Order objet
		return array('order' => $order->toArray());
	}

}

?>
