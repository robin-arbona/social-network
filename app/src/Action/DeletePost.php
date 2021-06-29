<?php

namespace App\Action;

use App\Domain\Post\Service\PostDestructor;
use App\Exception\AuthorizationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class DeletePost
{
    private $postDestructor;

    public function __construct(PostDestructor $postDestructor)
    {
        $this->postDestructor = $postDestructor;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {

        // Delete post if allowed
        try {
            $result = $this->postDestructor->deletePost((int) $args["post_id"]);
        } catch (AuthorizationException $e) {
            $result["message"] = $e->getMessage();
            $result["errors"] = $e->getErrors();
            $status = $e->getCode();
        }

        if (isset($result["success"]) && $result["success"]) {
            $status = 201;
        } elseif (isset($result["success"]) && !$result["success"]) {
            $status = 500;
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
