<?php

namespace App\Action;

use App\Domain\User\Service\UserGetter;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetUsers
{
    private $userGetter;

    public function __construct(UserGetter $userGetter)
    {
        $this->userGetter = $userGetter;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        $result = $this->userGetter->getAll();

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
