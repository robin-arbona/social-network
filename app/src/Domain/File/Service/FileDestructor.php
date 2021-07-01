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
        if (file_exists($this->directory . DIRECTORY_SEPARATOR . $fileName)) {
            unlink($this->directory . DIRECTORY_SEPARATOR . $fileName);
        }
    }
}
