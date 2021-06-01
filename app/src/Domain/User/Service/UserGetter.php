<?php

namespace App\Domain\User\Service;

use App\Exception\ValidationException;

use function PHPUnit\Framework\isNull;

/**
 * Service.
 */
final class UserGetter
{

    /**
     * The constructor.
     */
    public function __construct()
    {
    }

    /**
     * Get post.
     *
     * @param int $userId optionnal - user Id / if not specified, return user logged
     *
     * @return array $results array of user
     */
    public function get(int $userId = null): array
    {
        if (!isset($_SESSION['user'])) {
            $result["success"] = false;
            $result["message"] = "User not authentified.";
            return $result;
        }

        if (isNull($userId)) {
            $result = $_SESSION['user'];
        }

        $result['success'] = true;

        return $result;
    }
}
