<?php

namespace App\Domain\Post\Service;

use App\Domain\Post\Repository\PostRepository;
use App\Exception\AuthorizationException;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class PostDestructor
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
     * Delete a post.
     *
     * @param int $postId The post Id to delete
     *
     */
    public function deletePost(int $postId): array
    {

        $this->validateAuthorization($postId);

        $success = $this->repository->deletePost($postId);

        $result = [];

        if ($success) {
            $result["success"] = true;
            $result["message"] = "Post successfully deleted from database.";
        } else {
            $result["success"] = false;
            $result["message"] = "An error occured while emptenting to delete post from database.";
        }

        return $result;
    }


    /**
     * Input validation.
     *
     * @param array $data The form data
     *
     * @throws ValidationException
     *
     * @return void
     */
    private function validateAuthorization(int $postId): void
    {
        $errors = [];

        // Check if admin 

        // Check if post owner
        if ($this->repository->getOwner($postId) != $_SESSION["user"]["id"]) {
            $errors[] = 'You\'re not the owner of this post.';
        }


        if ($errors) {
            throw new AuthorizationException('Forbidden request', $errors);
        }
    }
}
