<?php

namespace App\Domain\Likes\Repository;

use PDO;

/**
 * Repository.
 */
final class LikesRepository
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
    public function getLikes(int $id, string $table)
    {
        $sql = "SELECT likes_pk_id, likes_likes, likes_disslikes
                FROM  $table
                INNER JOIN `likes` ON $table.{$table}_fk_likes_id = `likes`.`likes_pk_id` 
                WHERE $table.{$table}_pk_id = $id";
        return $this->connection->query($sql)->fetch();
    }
}
