<?php

namespace Controller;

use \Exception;
use Model\OrderQuery;
use Silex\Application;

use Symfony\Component\HttpFoundation\Request;

class TruckController {

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

}

?>