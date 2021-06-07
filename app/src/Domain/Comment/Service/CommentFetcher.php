<?php

namespace App\Domain\Comment\Service;

use App\Domain\Comment\Repository\CommentRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class CommentFetcher
{
    /**
     * @var CommentRepository
     */
    private $repository;

    /**
     * The constructor.
     *
     * @param CommentRepository $repository The repository
     */
    public function __construct(CommentRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get comments.
     *
     * @param array $args array of posts results
     *
     * @return array $results array of c
     */
    public function fetch(array $results = []): array
    {
        foreach ($results["posts"] as &$post) {
            $id = $post["post_pk_id"];
            $post["comments"] = $this->repository->getComments($id);
        }

        return $results;
    }
}
