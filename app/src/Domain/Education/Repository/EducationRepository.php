<?php

namespace App\Domain\Eduction\Repository;

use PDO;

/**
 * Repository.
 */
final class EducationRepository
{
    /**
     * @var PDO The database connection
     */
    private $connection;

    /**
     * Constructor.
     *
     * @param PDO $connection The database connection
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * Insert user row.
     *
     * @param array $education the training
     *
     * @return int The new ID
     */
    public function newEducation(array $education): int
    {
        $row = [
            'education_name' => $education['name'],
            'education_start_date' => $education['start_date'],
            'education_end_date' => $education['end_date'],
            'education_content' => $education['content'],
            'education_fk_user_id' => $education['education_fk_user_id']
        ];
        $sql  = "INSERT INTO education SET
                 education_name=:education_name,
                 education_start_date=:education_start_date,
                 education_end_date=:education_end_date,
                 education_content=:education_content,
                 education_fk_user_id=:education_fk_user_id";

        $this->connection->prepare($sql)->execute($row);

        return (int)$this->connection->lastInsertId();
    }

    /**
     * Get education by ID
     * 
     * @param int $offset - Result offset
     * 
     * @param int $limit - Nb max of result
     * 
     * @return array $education - set of result
     */
    public function getEducationById(int $userId): array
    {
        $sql = "SELECT *
                FROM `education`
                INNER JOIN `user` ON `education`.`education_fk_user_id` = `user`.`user_pk_id`
                WHERE `education_fk_user_id` $userId ";

        return $this->connection->query($sql)->fetchAll();
    }

    public function getEducationUserConnected()
    {
        $id = $_SESSION['user']['id'];
        $sql = "SELECT * 
                FROM `post` 
                INNER JOIN `user` ON `post`.`post_fk_user_id` = `user`.`user_pk_id`
                WHERE `post_fk_user_id` = $id";

        return $this->connection->query($sql)->fetchAll();
    }
}