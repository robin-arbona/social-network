<?php

namespace App\Action;

use App\Domain\Post\Service\PostFetcher;
use App\Exception\ValidationException;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetPostAction
{
    private $postFetcher;
    private $postsPerPage;

    public function __construct(PostFetcher $postFetcher, ContainerInterface $container)
    {
        $this->postFetcher = $postFetcher;
        $this->postsPerPage = $container->get('settings')['postsPerPage'];
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {
        // Collect input from the HTTP request


        // Invoke the Domain with inputs and retain the result

        $result = $this->postFetcher->fetch($args, $this->postsPerPage);

        if ($result["success"]) {
            $status = 200;
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
