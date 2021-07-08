<?php

namespace App\Action;

use App\Domain\User\Service\UserRightsSetter;
use App\Exception\AuthorizationException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class SetRights
{
    private $userRightsSetter;

    public function __construct(UserRightsSetter $userRightsSetter)
    {
        $this->userRightsSetter = $userRightsSetter;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        $args
    ): ResponseInterface {

        try {
            if ($this->userRightsSetter->set($args['user_id'], $args['rights_pk_id'])) {
                $result["success"] = true;
                $result["message"] = "Update successfull";
                $status = 201;
            } else {
                $result["success"] = false;
                $result["message"] = "Something goes wrong";
                $status = 500;
            }
        } catch (AuthorizationException $e) {
            $result["message"] = $e->getMessage();
            $result["errors"] = $e->getErrors();
            $status = $e->getCode();
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
