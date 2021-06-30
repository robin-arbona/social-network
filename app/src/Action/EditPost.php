<?php

namespace App\Action;

use App\Domain\Post\Service\PostEditor;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function DI\value;

final class EditPost
{
    private $postEditor;

    public function __construct(PostEditor $postEditor)
    {
        $this->postEditor = $postEditor;
    }

    public function __invoke(ServerRequestInterface $request,  ResponseInterface $response, array $args): ResponseInterface
    {
        //Check if user is authentified
        if (isset($_SESSION["user"])) {
            // Invoke the Domain with inputs and retain the result
            // get post data

            $data = (array)$request->getParsedBody();

            $result = $this->postEditor->editPost($args["post_id"], $data);

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
