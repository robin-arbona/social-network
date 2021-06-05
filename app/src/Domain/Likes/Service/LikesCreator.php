<?php

namespace App\Domain\Likes\Service;

use App\Domain\Likes\Repository\LikesRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class LikesCreator
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
     * @param array $vote array of with 3 keys, type(like/disslike), id, element(post/comment)
     *
     * @return array $results array with likes
     */
    public function vote(array $vote): array
    {
        $results["matchingEntry"] = $this->createEntry($vote);
        if ($results["matchingEntry"]["success"]) {
            $results["success"] = $vote["type"] == "like"
                ? $this->repository->addLike($results["matchingEntry"]["id"])
                : $this->repository->addDissLike($results["matchingEntry"]["id"]);
            $results["total"] = $this->repository->getLikes($vote["id"], $vote["element"]);
        }

        return $results;
    }

    /**
     * Create new entry in db if there is no for the couple id/element
     * 
     * @param array $vote array of with 3 keys, type(like/disslike), id, element(post/comment)
     * 
     * @return array $matchingEntry string with 'Entry creation / Entry already in db / failed' and success bool
     */
    public function createEntry(array $vote): array
    {
        $matchingEntry = [];
        if ($id = $this->repository->isInDb($vote["id"], $vote["element"])) {
            $matchingEntry["message"] = "Entry already exist in db";
        } else {
            if ($id = $this->repository->new($vote["id"], $vote["element"])) {
                $matchingEntry["message"] = "New entry in db";
            } else {
                $matchingEntry["message"] = "Failed in new entry creation";
                $matchingEntry["success"] = false;
                return $matchingEntry;
            }
        }
        $matchingEntry["id"] = $id;
        $matchingEntry["success"] = true;
        return $matchingEntry;
    }
}
