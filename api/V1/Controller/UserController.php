<?php

namespace Controller;

use Model\AccessToken;
use Model\AccessTokenQuery;
use \Exception;
use Model\UserQuery;
use Model\User;
use Silex\Application;

use Symfony\Component\HttpFoundation\Request;

class UserController {

	protected $app;
	protected $request;
	protected $request_body;

	public function __construct($app, $request)
	{
		$this->app = $app;
		$this->request = $request;

		$this->request_body = json_decode($request->getContent());
	}

	public function registerUser()
	{
		$user = new User();
		$user->setEmail($this->request_body->email);
		$user->setPassword(md5($this->request_body->password));
		$user->save();

		$token = new AccessToken();
		$token->setTokenContent(uniqid());
		$token->setUser($user);
		$token->save();

		return array('user' => $user->toArray(), 'token' => $token->toArray());
	}

	public function userLogin()
	{
		$user = UserQuery::create()
				->filterByEmail($this->request_body->email)
				->filterByPassword(md5($this->request_body->password))
				->findOne();

		if(null === $user)
		{
			throw new Exception("Incorrect username or password.", 401);
		}

		// TODO: Add previous token invalidation

		$token = new AccessToken();
		$token->setTokenContent(uniqid());
		$token->setUser($user);
		$token->save();

		return array('user' => $user->toArray(), 'token' => $token->toArray());
	}

	public function authenticateToken()
	{
		if(null === $this->request_body->token && null === $this->request->get('token'))
		{
			return null;
		}

		$token_identifier = ($this->request_body->token === null) ? $this->request->get('token') : $this->request_body->token;
		$token = AccessTokenQuery::create()
				->filterByTokenContent($token_identifier)
				->findOne();
		if(null === $token || null === $token->getUser())
		{
			return null;
		}

		return $token->getUser();
	}

}
