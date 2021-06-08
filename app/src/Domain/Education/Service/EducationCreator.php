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
    public function createEducation(array $data)
    {
        $data["education_fk_user_id"] = $_SESSION["user"]["id"];

        $id = $this->repository->newEducation($data);

        $result = [];

        if ($id > 0) {
            $result['success'] = true;
            $result["id"] = $id;
            $result['message'] = "New Job added to database.";
        } else {
            $result['success'] = false;
            $result['message'] = "Trouble trouble";
        }

        return $result;
    }
}
