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

    /**
     * 
     * Check id likes exist in db
     * 
     * @param int $id - Result offset
     * 
     * @param string $table - Result offset
     * 
     * @return mixed $id or false
     */
    public function isInDb($id, $table)
    {
        $sql = "SELECT {$table}_fk_likes_id
                FROM $table
                WHERE {$table}_pk_id = $id";
        return $this->connection->query($sql)->fetchColumn(0);
    }

    /**
     * 
     * Create a new entry for likes in db and link it with element
     * 
     * @param int $id - element id
     * 
     * @param string $table - Result offset
     * 
     * @return mixed $id or false
     */
    public function new(int $id, string $table)
    {
        $sql = "INSERT INTO `likes`(`likes_likes`, `likes_disslikes`) 
                VALUES (0,0);";

        if ($this->connection->query($sql)) {
            $likesId = $this->connection->lastInsertId();

            $sql = "UPDATE $table 
                SET {$table}_fk_likes_id = $likesId 
                WHERE {$table}_pk_id = $id";

            if ($this->connection->query($sql)) {
                return $likesId;
            }
        }

        return false;
    }

    /**
     * 
     * Create a new entry for likes in db and link it with element
     * 
     * @param int $id - element id
     * 
     * @return bool $sucess
     */
    public function addLike(int $id)
    {
        $sql = "UPDATE `likes`
                SET `likes_likes` = `likes_likes` + 1 
                WHERE `likes_pk_id` = $id";
        return $this->connection->query($sql) ? true : false;
    }

    /**
     * 
     * Create a new entry for likes in db and link it with element
     * 
     * @param int $id - element id
     * 
     * @return bool $sucess
     */
    public function addDissLike(int $id)
    {
        $sql = "UPDATE `likes`
                SET `likes_disslikes` = `likes_disslikes` + 1 
                WHERE `likes_pk_id` = $id";
        return $this->connection->query($sql) ? true : false;
    }
}
