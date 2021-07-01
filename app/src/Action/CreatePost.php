<?php

namespace App\Action;

use App\Domain\File\Service\FileDestructor;
use App\Domain\File\Service\FileUploader;
use App\Domain\Post\Service\PostCreator;
use App\Exception\ValidationException;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class CreatePost
{
    private $postCreator;
    private $fileUploader;
    private $fileDestructor;

    public function __construct(PostCreator $postCreator, FileUploader $fileUploader, FileDestructor $fileDestructor)
    {
        $this->postCreator = $postCreator;
        $this->fileUploader = $fileUploader;
        $this->fileDestructor = $fileDestructor;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();
        $files = (array)$request->getUploadedFiles();

        // Invoke the Domain with inputs and retain the result
        try {
            $fileName = $this->fileUploader->upload($files);
            $result = $this->postCreator->createPost($data, $fileName);
        } catch (ValidationException $e) {
            $result["message"] = $e->getMessage();
            $result["errors"] = $e->getErrors();
            if (isset($fileName) && is_string($fileName)) {
                $this->fileDestructor->delete($fileName);
            }
        }

        if (isset($result["success"]) && $result["success"]) {
            $status = 201;
        } elseif (isset($result["success"]) && !$result["success"]) {
            $status = 500;
        } else {
            $status = 422;
        }

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($status);
    }
}
