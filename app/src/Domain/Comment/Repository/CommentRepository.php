<?php

namespace App\Domain\Comment\Repository;

use PDO;

/**
 * Repository.
 */
final class CommentRepository
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
     * Get posts
     * 
     * @param int $offset - Result offset
     * 
     * @return array $posts - set of result
     */
    public function getComments(int $id): array
    {
        $sql = "SELECT * 
                FROM `comment` 
                INNER JOIN `user` ON `comment`.`comment_fk_user_id` = `user`.`user_pk_id` 
                WHERE `comment`.`comment_fk_post_id` = $id
                ORDER BY `comment`.`comment_pk_id` ASC;";
        return $this->connection->query($sql)->fetchAll();
    }
}