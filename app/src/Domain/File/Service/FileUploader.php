<?php

namespace App\Domain\File\Service;

use App\Exception\ValidationException;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\UploadedFileInterface;

/**
 * Service.
 */
final class FileUploader
{
    /**
     * @var ContainerInterface
     */
    private $container;

    /**
     * The constructor
     * 
     * @param ContainerInterface $container DI Container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }

    /**
     * Upload file in public dedecated folder
     * 
     * @param array of UploadedFileInterface object
     * 
     * @return False/String if there is no file to upload, Filname is file uploaded.
     */
    public function upload($files)
    {

        $directory = $this->container->get('settings')['upload'];

        if ($files["picture"]->getSize() == 0) {
            return false;
        }
        $uploadedFile = $files["picture"];

        $this->validateUploadedFile($uploadedFile);

        $filename = $this->moveUploadedFile($directory, $uploadedFile);

        return $filename;
    }

    /**
     * Moves the uploaded file to the upload directory and assigns it a unique name
     * to avoid overwriting an existing uploaded file.
     *
     * @param string $directory The directory to which the file is moved
     * @param UploadedFileInterface $uploadedFile The file uploaded file to move
     *
     * @return string The filename of moved file
     */
    function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile)
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
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
    private function validateUploadedFile(UploadedFileInterface $uploadedFile): void
    {
        $errors = [];

        if ($uploadedFile->getError() !== UPLOAD_ERR_OK) {
            $errors[] = $uploadedFile->getError();
        }

        if ($uploadedFile->getSize() > 5000000) {
            $errors[] = "Sorry, your file is too large: 5Mb maximum allowed.";
        }

        $imageFileType = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            $errors[] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        }

        if ($errors) {
            throw new ValidationException('Uploaded failed', $errors);
        }
    }
}
