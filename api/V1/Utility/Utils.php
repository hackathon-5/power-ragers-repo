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
		return (bool)count(array_filter(array_keys($array), 'is_string'));
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
		if(is_array($child))
		{
			$sanatizedOutput = array();
			if($this->isAssocArray($child))
			{
				foreach($child as $key => $value)
				{
					$sanatizedOutput[lcfirst($key)] = $this->serializePropelChildObjects($value);
				}
			}
			else
			{
				foreach($child as $key => $value)
				{
					$sanatizedOutput[$key] = $this->serializePropelChildObjects($value);
				}
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
