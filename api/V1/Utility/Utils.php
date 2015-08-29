<?php

namespace Utility;

use \Exception;
use \Symfony\Component\HttpFoundation\JsonResponse;

class Utils
{
	protected $response;

	public function __construct(JsonResponse $response = NULL)
	{
		// Define the timezone we'll be using
		date_default_timezone_set('America/New_York');

		// Define response
		if(is_null($response))
		{
			$response = new JsonResponse();
			$response->headers->set('Content-Type', 'application/json; charset=utf-8');
			$this->response = $response;
		}
		else
		{
			$this->response = $response;
		}
	}

	public function isAssocArray($array)
	{
		return array_keys($array) !== range(0, count($array) - 1);
	}

	public function listObjectIDs($objects)
	{
		return $this->listParameterValues('Id', $objects);
	}

	public function listParameterValues($parameter, $parentObjects)
	{
		// Loop through objects and grab parameters
		$parameters = array();
		foreach($parentObjects as $parent)
		{
			if(array_key_exists($parameter, $parent))
			{
				array_push($parameters, $parent[$parameter]);
			}
		}

		// Return parameters
		return $parameters;
	}

	protected function serializePropelChildObjects($child)
	{
		if(is_array($child) && $this->isAssocArray($child))
		{
			$sanatizedOutput = array();
			foreach($output as $key => $value)
			{
				$sanatizedOutput[lcfirst($key)] = $this->serializePropelOutput($value);
			}
		}
		else
		{
			echo $child;
			$sanatizedOutput = $child;
		}
		return $sanatizedOutput;
	}

	public function serializePropelOutput($output)
	{
		$sanatizedOutput = array();
		foreach($output as $key => $value)
		{
			$sanatizedOutput[lcfirst($key)] = $this->serializePropelChildObjects($value);
		}
		$response = new JsonResponse($sanatizedOutput);
		$response->send();
	}

	public function verifyInputIsntNull($params, $requiredParams)
	{
		if(empty($params))
		{
			throw new Exception('Missing or malformed request.', 422);
		}

		foreach ($requiredParams as $param)
		{
			if(!array_key_exists($param, $params) || is_null($params[$param]))
			{
				throw new Exception("Malformed request, make sure '$param' isn't null and try again :)", 422);
			}
		}
		return true;
	}
}

?>