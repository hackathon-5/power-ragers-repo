<?php

namespace Controller;

use Silex\Application;
use Model\OrderQuery;
use Exception;

use Symfony\Component\HttpFoundation\Request;

class TruckController {

	protected $app;
	protected $request;
	protected $request_body;

	public function __construct($app, $request)
	{
		parent::__construct($app);

		$this->app = $app;
		$this->request = $request;

		$this->request_body = json_decode($request->getContent());
	}

	public function getTruck($id)
	{
		$orders = OrderQuery::create()
				->filterByTruckId($id)
				->find();

		if(null === $orders)
		{
			throw new Exception("No orders found for truck $id.", 404);
		}

		return array(
			'truck' => array(
				'order_ids' => $this->app['utils']->listObjectIDs($orders)
			),
			'orders' => $orders
		);
	}

}

?>