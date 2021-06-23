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
        // Handle pagination
        $page =  isset($args["page"]) ? (int) $args["page"] : 1;

        $offset = $page == 1 ? 0 : ($page - 1) * $postsPerPage;

        // Fetch Post by user_id or all post
        if (isset($args["user_id"])) {
            $posts = $this->repository->getPostsBydId($args["user_id"], $offset, $postsPerPage);
        } else {
            $posts = $this->repository->getPosts($offset, $postsPerPage);
        }

        $results["success"] =  empty($posts) ? false : true;

        if ($results["success"]) {
            $results["resultsNb"] = $this->repository->countPosts(isset($args["user_id"]) ? $args["user_id"] : 0);
            $results["currentPage"] = $page;
            $results["totalPage"] = ceil($results["resultsNb"] / $postsPerPage);
        }

        $results["posts"] = $posts;

        return $results;
    }
}
