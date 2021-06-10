<?php

namespace App\Action;

use App\Domain\Education\Service\EducationFetcher;
use App\Exception\ValidationException;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetEducation
{
    private $educationFetcher;

    public function __construct(ContainerInterface $container, EducationFetcher $educationFetcher)
    {
        $this->educationFetcher = $educationFetcher;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {

        $result = $this->educationFetcher->fetchEducation($args);

        if ($result['success']) {
            $status = 200;
        } else {
            $status = 500;
        }

        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
