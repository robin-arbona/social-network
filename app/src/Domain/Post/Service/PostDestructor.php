<?php

namespace App\Domain\Post\Service;

use App\Domain\File\Service\FileDestructor;
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
     * @var FileDestructor
     */
    private $fileDestructor;

    /**
     * The constructor.
     *
     * @param PostRepository $repository The repository
     */
    public function __construct(PostRepository $repository, FileDestructor $fileDestructor)
    {
        $this->repository = $repository;
        $this->fileDestructor = $fileDestructor;
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

        $filename = $this->repository->getPicName($postId);

        $success = $this->repository->deletePost($postId);

        if ($success && is_string($filename)) {
            $this->fileDestructor->delete($filename);
        }

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
