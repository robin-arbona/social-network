<?php

namespace App\Action;

use App\Domain\Post\Service\PostCreator;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class PostAction
{
    private $postCreator;

    public function __construct(PostCreator $postCreator)
    {
        $this->postCreator = $postCreator;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        // Invoke the Domain with inputs and retain the result
        $result = $this->postCreator->createPost($data);

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
