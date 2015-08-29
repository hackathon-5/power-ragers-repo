<?php

use Controller\OrderController;
use Controller\TruckController;
use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

// Base url
$baseurl = '/api';


// Orders
$app->post($baseurl.'/orders', function(Request $request) use ($app) {
		$controller = new OrderController($app, $request);

		$response = new JsonResponse($controller->placeOrder());
		$response->send();
});

$app->get($baseurl.'/orders', function(Request $request) use ($app) {
		$controller = new OrderController($app, $request);

		$response = new JsonResponse($controller->getOrders());
		$response->send();
});

$app->put($baseurl.'/orders/{id}', function(Request $request, $id) use ($app) {
		$controller = new OrderController($app, $request);

		$response = new JsonResponse($controller->updateOrder($id));
		$response->send();
});

$app->delete($baseurl.'/orders/{id}', function(Request $request, $id) use ($app) {
		$controller = new OrderController($app, $request);

		$response = new JsonResponse($controller->deleteOrder($id));
		$response->send();
});


$app->get($baseurl.'/time', function(Request $request) use ($app) {
		$response = new JsonResponse(array(
			'time' => time()
		));
		$response->send();
});


// Trucks
$app->get($baseurl.'/trucks/{id}', function(Request $request, $id) use ($app) {
		$controller = new TruckController($app, $request);

		$response = new JsonResponse($controller->getTruck($id));
		$response->send();
});



?>
