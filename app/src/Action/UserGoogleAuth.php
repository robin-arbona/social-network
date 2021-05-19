<?php

namespace App\Action;

use App\Domain\User\Service\UserGoogleVerificator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;


final class UserGoogleAuth
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

        $result = $this->userGoogleVerificator->verifyIdToken($data);

        if ($result["success"]) {
            $status = 201;
        } else {
            $status = 401;
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
