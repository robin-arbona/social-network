<?php

namespace App\Action;

use App\Domain\Post\Service\PostFetcher;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetPost
{
    private $postFetcher;

    public function __construct(PostFetcher $postFetcher)
    {
        $this->postFetcher = $postFetcher;
    }

    public function __invoke(ServerRequestInterface $request,  ResponseInterface $response, array $args): ResponseInterface
    {
        //Check if user is authentified
        if (isset($_SESSION["user"])) {
            // Invoke the Domain with inputs and retain the result
            // get post

            $result = $this->postFetcher->fetch($args["post_id"]);

            if ($result["success"]) {
                $status = 200;
            } else {
                $status = 500;
            }
        } else {
            $result["success"] = false;
            $result["message"] = 'Permission denied';
            $status = 403;
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
