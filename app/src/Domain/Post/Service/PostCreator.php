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
     * Create a new post.
     *
     * @param array $data The form data
     * 
     * @param filename or false if there is no file to upload
     *
     */
    public function createPost(array $data, $fileName): array
    {

        $this->validateNewPost($data);

        $data["post_fk_user_id"] = $_SESSION["user"]["id"];
        $data["picture"] = $fileName;

        $id = $this->repository->newPost($data);

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

        foreach ($data as $key => $value) {
            if (empty($value)) {
                $errors[$key] = 'Input required';
            }
        }

        if ($errors) {
            throw new ValidationException('Please check your input', $errors);
        }
    }
}
