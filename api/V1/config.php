<?php

use Exception;
use Silex\Application;
use Silex\ControllerProviderInterface;
use Silex\ServiceProviderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use \Services_Twilio;
use Utility\Utils;

// Configure Silex
// Turn on debugging
$app['debug'] = true;
// Setup Silex to support creating controllers as services
$app->register(new Silex\Provider\ServiceControllerServiceProvider());

// Configure error messages
$app->error(function (Exception $e) {
	return new JsonResponse(array(
		'error' => $e->getCode(),
		'message' => $e->getMessage()
	));
});

// Configure texts (Twilio)
$twilioSID = "AC78540198e4a33ab4f8ccc87488417b4a";
$twilioToken = "1d66b27bd5de6ebe63da925d99e7263a";
$app['twilio'] = new Services_Twilio($twilioSID, $twilioToken);

?>