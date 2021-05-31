<?php

namespace App\Action;

use App\Domain\Post\Service\PostCreator;
use App\Exception\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class HandlePostCreation
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
        try {
            $result = $this->postCreator->createPost($data);
        } catch (ValidationException $e) {
            $result["message"] = $e->getMessage();
            $result["errors"] = $e->getErrors();
        }

        if (isset($result["success"]) && $result["success"]) {
            $status = 201;
        } elseif (isset($result["success"]) && !$result["success"]) {
            $status = 500;
        } else {
            $status = 422;
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
