<?php

use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

//use Controller\OrderController;
//use Controller\TruckController;

// // Orders
// $app->post('/orders', function(Request $request) use ($app) {
// 		$controller = new OrderController($app, $request);

// 		$response = new JsonResponse($controller->placeOrder());
// 		$response->send();
// });

// $app->get('/orders', function(Request $request) use ($app) {
// 		$controller = new OrderController($app, $request);

// 		$response = new JsonResponse($controller->getOrders());
// 		$response->send();
// });

// $app->put('/orders/{id}', function(Request $request, $id) use ($app) {
// 		$controller = new OrderController($app, $request);

// 		$response = new JsonResponse($controller->updateOrder($id));
// 		$response->send();
// });

// $app->delete('/orders/{id}', function(Request $request, $id) use ($app) {
// 		$controller = new OrderController($app, $request);

// 		$response = new JsonResponse($controller->deleteOrder($id));
// 		$response->send();
// });


$app->get('/time', function(Request $request) use ($app) {
		$response = new JsonResponse(array(
			'time' => time()
		));
		$response->send();
});


// // Trucks
// $app->get('/trucks/{id}', function(Request $request, $id) use ($app) {
// 		$controller = new OrderController($app, $request);

// 		$response = new JsonResponse($controller->getTruck($id));
// 		$response->send();
// });



?>