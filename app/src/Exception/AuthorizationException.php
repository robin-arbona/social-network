<?php

namespace App\Exception;

use RuntimeException;
use Throwable;


final class AuthorizationException extends RuntimeException
{
    private $errors;

    public function __construct(
        string $message,
        array $errors = [],
        int $code = 403,
        Throwable $previous = null
    ) {
        parent::__construct($message, $code, $previous);

        $this->errors = $errors;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
