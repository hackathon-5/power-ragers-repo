<?php

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', '1');

// Autoload dependencies
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/generated-conf/config.php';

// Load Silex app
use Silex\Application;

$app = new Application();

// Configure Silex app and above dependencies
require_once __DIR__.'/config.php';
// Define routes
require_once __DIR__.'/routes.php';

// Run app
$app->run();

?>
