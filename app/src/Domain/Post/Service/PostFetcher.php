<?php

namespace App\Domain\Post\Service;

use App\Domain\Post\Repository\PostRepository;

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
    public function fetch(int $postId): array
    {

        $post = $this->repository->getPost($postId);

        $results["success"] =  empty($post) ? false : true;

        if ($results["success"]) {
            $results["resultsNb"] = $this->repository->countPosts(isset($args["user_id"]) ? $args["user_id"] : 0);
        }

        $results["post"] = $post;

        return $results;
    }
}
