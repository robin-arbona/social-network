<?php

namespace App\Action;

use App\Domain\Comment\Service\CommentFetcher;
use App\Domain\Likes\Service\LikesFetcher;
use App\Domain\Post\Service\PostFetcher;
use App\Exception\ValidationException;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetPost
{
    private $postFetcher;
    private $postsPerPage;
    private $likesFetcher;
    private $commentFetcher;

    public function __construct(ContainerInterface $container, PostFetcher $postFetcher, CommentFetcher $commentFetcher, LikesFetcher $likesFetcher)
    {
        $this->postFetcher = $postFetcher;
        $this->commentFetcher = $commentFetcher;
        $this->likesFetcher = $likesFetcher;
        $this->postsPerPage = $container->get('settings')['postsPerPage'];
    }

    public function __invoke(ServerRequestInterface $request,  ResponseInterface $response, array $args): ResponseInterface
    {
        //Check if user is authentified
        if (isset($_SESSION["user"])) {
            // Invoke the Domain with inputs and retain the result
            // get posts
            $result = $this->postFetcher->fetch($args, $this->postsPerPage);

            // Get matching comments
            $result = $this->commentFetcher->fetch($result);

            // Get matching likes 
            $result = $this->likesFetcher->fetch($result);


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
