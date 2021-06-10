<?php

namespace App\Domain\Education\Service;

use App\Domain\Eduction\Repository\EducationRepository;
use App\Exception\ValidationException;

/**
 * Service.
 */
final class EducationFetcher
{
    /**
     * @var EducationRepository
     */
    private $repository;

    /**
     * The constructor.
     * @param EducationRepository $repository The reposistory
     */
    public function __construct(EducationRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get Education
     * 
     * @param array $arg array can be user_id connected person or specified user id
     * 
     * @return array $results array of education
     */
    public function fetchEducation(array $args = [])
    {

        if (isset($args['user_id'])) {
            $educations = $this->repository->getEducationById($args['user_id']);
        } else {
            $educations = $this->repository->getEducationUserConnected();
        }

        $results["success"] = empty($educations) ? false : true;

        $results['educations'] = $educations;

        return $results;
    }
}
