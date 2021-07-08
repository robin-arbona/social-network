<?php

namespace App\Domain\User\Service;

use App\Domain\User\Repository\UserRepository;
use App\Exception\AuthorizationException;

/**
 * Service.
 */
final class UserRightsSetter
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function set(int $user_id, int $rights_pk_id)
    {
        return $this->userRepository->setRights($user_id, $rights_pk_id);
    }


    /**
     * Input validation.
     *
     * @throws ValidationException
     *
     * @return void
     */
    private function validateAuthorization()
    {
        $errors = [];

        // Check if admin 
        if ($_SESSION['user']['rights']['rights_type'] == 'ADMINISTRATOR') {
            return;
        } else {
            $errors[] = 'Only administrator can update user rights.';
        }


        if ($errors) {
            throw new AuthorizationException('Forbidden request', $errors);
        }
    }
}
