<?php

use Controller\OrderController;
use Controller\UserController;
use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

// Base url
$baseurl = '/api';


// Orders
$app->post($baseurl.'/orders', function(Request $request) use ($app) {
		$controller = new OrderController($app, $request);

		$this->app['utils']->serializePropelOutput(
			$controller->placeOrder()
		);
});

$app->get($baseurl.'/orders', function(Request $request) use ($app) {
		$controller = new OrderController($app, $request);

		$this->app['utils']->serializePropelOutput(
			$controller->getOrders()
		);
});

$app->put($baseurl.'/orders/{id}', function(Request $request, $id) use ($app) {
		$controller = new OrderController($app, $request);

		$this->app['utils']->serializePropelOutput(
			$controller->updateOrder($id)
		);
});

$app->delete($baseurl.'/orders/{id}', function(Request $request, $id) use ($app) {
		$controller = new OrderController($app, $request);

		$this->app['utils']->serializePropelOutput(
			$controller->deleteOrder($id)
		);
});

$app->get($baseurl.'/time', function(Request $request) use ($app) {
		$response = new JsonResponse(array(
			'time' => time()
		));
		$response->send();
});


// Users
$app->post($baseurl.'/users', function(Request $request) use ($app) {
		$controller = new UserController($app, $request);

		$this->app['utils']->serializePropelOutput(
			$controller->registerUser()
		);
});

$app->post($baseurl.'/login', function(Request $request) use ($app) {
		$controller = new UserController($app, $request);

		$this->app['utils']->serializePropelOutput(
			$controller->userLogin()
		);
});

$app->post($baseurl.'/auth', function(Request $request) use ($app) {
		$controller = new UserController($app, $request);

		$response = new JsonResponse($controller->authenticateToken());
		$response->send();
});

?>
