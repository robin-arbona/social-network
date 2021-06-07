<?php

namespace App\Domain\Education\Service;

use App\Domain\Eduction\Repository\EducationRepository;
use App\Exception\ValidationException;

/**
 * Service
 */

final class EducationCreator
{
    /**
     * @var EducationRepository
     */
    private $repository;

    /**
     * Constructor
     * 
     * @param EducationRepository 
     */
    public function __construct(EducationRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Create new Education
     * 
     * @param array $data
     * 
     */
    public function createEducation(array $data): array
    {
    }
}
