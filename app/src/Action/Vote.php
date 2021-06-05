<?php

namespace App\Action;

use App\Domain\Likes\Service\LikesCreator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class Vote
{
    private $likesCreator;

    public function __construct(LikesCreator $likesCreator)
    {
        $this->likesCreator = $likesCreator;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        $result = $this->likesCreator->vote($data);

        if (isset($result["success"]) && $result["success"]) {
            $status = 201;
        } else {
            $status = 500;
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
