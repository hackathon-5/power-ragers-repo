<?php

namespace Controller;

use \Exception;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

abstract class AuthController {

	protected $current_user;

	public function __construct($app)
	{
		$this->current_user = $app['current_user'];

		if($this->current_user === null)
		{
			throw new Exception("Oops, looks like you're not logged in :)", 403);
		}
	}

}