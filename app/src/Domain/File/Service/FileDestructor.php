<?php

namespace App\Domain\File\Service;

use Psr\Container\ContainerInterface;

/**
 * Service
 */
final class FileDestructor
{
    /**
     * @var String Upload directroy
     */
    protected $directory;

    /**
     * Constructor
     */
    public function __construct(ContainerInterface $container)
    {
        $this->directory = $container->get('settings')['upload'];
    }

    public function delete(string $fileName)
    {
        if (!is_string($fileName) || (strlen($fileName) == 0)) {
            return;
        }
        if (file_exists($this->directory . DIRECTORY_SEPARATOR . $fileName)) {
            var_dump($fileName);
            unlink($this->directory . DIRECTORY_SEPARATOR . $fileName);
        }
    }
}
