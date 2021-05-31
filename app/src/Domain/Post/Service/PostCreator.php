<?php

namespace App\Domain\Post\Service;

use App\Domain\Post\Repository\PostRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class PostCreator
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
     * Create a new user.
     *
     * @param array $data The form data
     *
     * @return int The new user ID
     */
    public function createPost(array $data): int
    {

        $this->validateNewPost($data);

        $id = $this->repository->newPost($data, $_SESSION["user"]["id"]);

        $result = [];

        if ($id > 0) {
            $result["success"] = true;
            $result["id"] = $id;
            $result["message"] = "New post successfully added in database.";
        } else {
            $result["success"] = false;
            $result["message"] = "An error occured while emptenting to add the new post in database.";
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
    private function validateNewPost(array $data): void
    {
        $errors = [];

        // Here you can also use your preferred validation library

        if (empty($data['username'])) {
            $errors['username'] = 'Input required';
        }

        if (empty($data['email'])) {
            $errors['email'] = 'Input required';
        } elseif (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
            $errors['email'] = 'Invalid email address';
        }

        if ($errors) {
            throw new ValidationException('Please check your input', $errors);
        }
    }
}
