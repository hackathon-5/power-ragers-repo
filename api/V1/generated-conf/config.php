<?php
$serviceContainer = \Propel\Runtime\Propel::getServiceContainer();
$serviceContainer->checkVersion('2.0.0-dev');
$serviceContainer->setAdapterClass('truckyeah', 'pgsql');
$manager = new \Propel\Runtime\Connection\ConnectionManagerSingle();
$manager->setConfiguration(array (
  'classname' => 'Propel\\Runtime\\Connection\\ConnectionWrapper',
  'dsn' => 'pgsql:host=127.0.0.1/32;dbname=orderup',
  'user' => 'tree',
  'password' => 'TreeTruckTron',
));
$manager->setName('truckyeah');
$serviceContainer->setConnectionManager('truckyeah', $manager);
$serviceContainer->setDefaultDatasource('truckyeah');