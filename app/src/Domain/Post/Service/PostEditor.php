<?php

namespace App\Domain\Post\Service;

use App\Domain\Post\Repository\PostRepository;
use App\Exception\AuthorizationException;

/**
 * Service.
 */
final class PostEditor
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
     * Edit post.
     *
     * @param array $data The form data
     *
     */
    public function editPost(int $postId, array $data): array
    {

        $this->validateAuthorization($postId);

        $success = $this->repository->editPost($postId, $data);

        $result = [];

        if ($success) {
            $result["success"] = true;
            $result["message"] = "Post successfully edited in database.";
        } else {
            $result["success"] = false;
            $result["message"] = "An error occured while emptenting to edit post in database.";
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
        if ($_SESSION['user']['rights']['rights_type'] == 'ADMINISTRATOR') {
            return;
        }

        // Check if post owner
        if ($this->repository->getOwner($postId) != $_SESSION["user"]["id"]) {
            $errors[] = 'You\'re not the owner of this post.';
        }


        if ($errors) {
            throw new AuthorizationException('Forbidden request', $errors);
        }
    }
}
