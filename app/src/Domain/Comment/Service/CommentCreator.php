<?php

namespace App\Domain\Comment\Service;

use App\Domain\Comment\Repository\CommentRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class CommentCreator
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
     * Create a new Comment.
     *
     * @param array $data The form data
     *
     */
    public function createComment(int $id, array $data): array
    {

        $this->validateNewComment($data);

        $data["comment_fk_post_id"] = $id;
        $data["comment_fk_user_id"] = $_SESSION["user"]["id"];

        $id = $this->repository->newComment($data);

        $result = [];

        if ($id > 0) {
            $result["success"] = true;
            $result["id"] = $id;
            $result["message"] = "New comment successfully added in database.";
        } else {
            $result["success"] = false;
            $result["message"] = "An error occured while emptenting to add the new Comment in database.";
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
    private function validateNewComment(array $data): void
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
