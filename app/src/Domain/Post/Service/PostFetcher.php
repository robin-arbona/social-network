<?php

namespace App\Domain\Post\Service;

use App\Domain\Post\Repository\PostRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class PostFetcher
{
    /**
     * @var PostRepository
     */
    private $repository;

    /**
     * The constructor.
     *
     * @param PostRepository $repository The repository
     */
    public function __construct(PostRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get post.
     *
     * @param array $args array could be empty / contain a page number for the result / and and user_id
     *
     * @return array $results array of post
     */
    public function fetch(array $args = [], int $postsPerPage = 10): array
    {
        $page = isset($args["page"]) ? $args["page"] : 1;
        if (isset($args["user_id"])) {
            $posts = $this->repository->getPostsBydId($args["user_id"], $page, $postsPerPage);
        } else {
            $posts = $this->repository->getPosts($page, $postsPerPage);
        }

        $results["success"] =  empty($posts) ? false : true;

        $results["posts"] = $posts;
        return $results;
    }
}
