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
			'customer_name',
			'customer_phone_number',
			'item_name',
			'price'
		);
		$this->app['utils']->verifyInputIsntNull($input, $requiredKeys);

		// Create new Order object
		$order = new Order();
		$order->setTruckId($truckId = 1);
		$order->setItemName($input['item_name']);
		$order->setPrice($input['price']);
		$order->setCustomerName($input['customer_name']);
		$order->setCustomerEmail($input['customer_email']);
		$order->setCustomerPhoneNumber($input['customer_phone_number']);
		// Save the Order to the db
		$order->save();

		// Return Order objet
		return array('order' => $order->toArray());
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

				$message = $client->account->messages->create(array(
					"From" => "8433528360",
					"To" => $customer_phone_number,
					"Body" => "Hey $customer_name, your $item_name is ready!",
				));
			}
		}
		if(array_key_exists('customer_phone_number', $input))
		{
			$order->setCustomerPhoneNumber($input->customer_phone_number);
		}
		$order->save();

		// Return Order objet
		return array('order' => $order->toArray());
	}

}

?>
