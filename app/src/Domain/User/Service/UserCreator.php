<?php

namespace App\Domain\User\Service;

use App\Domain\User\Repository\UserRepository;
use App\Exception\AuthorizationException;
use App\Exception\ValidationException;

use function PHPUnit\Framework\throwException;

/**
 * Service.
 */
final class UserCreator
{
    /**
     * @var UserRepository
     */
    private $repository;

    /**
     * @var UserCheckRight
     */
    private $userCheckRights;

    /**
     * The constructor.
     *
     * @param UserRepository $repository The repository
     */
    public function __construct(UserRepository $repository, UserCheckRights $userCheckRights)
    {
        $this->repository = $repository;
        $this->userCheckRights = $userCheckRights;
    }

    /**
     * Create a new user.
     *
     * @param array $data The form data
     *
     * @return int The new user ID
     */
    public function createOrGetUser(array $data): int
    {

        if (!$id = $this->repository->userInDb($data)) {
            $id = $this->repository->insertUser($data);
        }

        $_SESSION["user"] = $data;
        $_SESSION["user"]["id"] = (int) $id;
        $_SESSION["user"]["rights"] = $this->userCheckRights->check($id);
        if ($_SESSION["user"]["rights"]["rights_type"] == "NOT_WELCOME") {
            throw new AuthorizationException('You are not welcome any more');
        }

        return $id;
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
    private function validateNewUser(array $data): void
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
