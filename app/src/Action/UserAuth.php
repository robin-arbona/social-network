<?php

namespace App\Action;

use App\Domain\User\Service\UserGoogleVerificator;
use App\Exception\AuthorizationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;


final class UserAuth
{
    protected $userGoogleVerificator;

    public function __construct(UserGoogleVerificator $userGoogleVerificator)
    {
        $this->userGoogleVerificator = $userGoogleVerificator;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        try {
            $result = $this->userGoogleVerificator->verifyIdToken($data);
            $status = $result["success"] ? 201 : 401;
        } catch (AuthorizationException $e) {
            $result["success"] = false;
            $result["message"] = $e->getMessage();
            $status = $e->getCode();
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
