<?php

namespace App\Domain\Likes\Service;

use App\Domain\Likes\Repository\LikesRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class LikesFetcher
{
    /**
     * @var LikesRepository
     */
    private $repository;

    /**
     * The constructor.
     *
     * @param LikesRepository $repository The repository
     */
    public function __construct(LikesRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get Likes.
     *
     * @param array $args array of posts results & comments
     *
     * @return array $results array with likes
     */
    public function fetch(array $results = []): array
    {
        foreach ($results["posts"] as &$post) {
            $id = $post["post_pk_id"];
            $post["likes"] = $this->repository->getLikes($id, 'post');
            foreach ($post["comments"] as &$comment) {
                $id = $comment["comment_pk_id"];
                $comment["likes"] = $this->repository->getLikes($id, 'comment');
            }
        }

        return $results;
    }
}
