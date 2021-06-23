<?php

namespace App\Domain\Post\Repository;

use PDO;

/**
 * Repository.
 */
final class PostRepository
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
     * @param array $post The post
     *
     * @return int The new ID
     */
    public function newPost(array $post): int
    {
        $row = [
            'post_name' => htmlspecialchars($post['name']),
            'post_picture' => htmlspecialchars($post['picture']),
            'post_content' => htmlspecialchars($post['content']),
            'post_fk_user_id' => htmlspecialchars($post['post_fk_user_id'])
        ];
        $sql = "INSERT INTO post SET 
                post_name=:post_name, 
                post_picture=:post_picture, 
                post_content=:post_content,
                post_fk_user_id=:post_fk_user_id;";

        $this->connection->prepare($sql)->execute($row);

        return (int)$this->connection->lastInsertId();
    }

    /**
     * Get posts
     * 
     * @param int $offset - Result offset
     * 
     * @param int $limit - Nb max of result
     * 
     * @return array $posts - set of result
     */
    public function getPosts(int $offset = 0, int $limit = 100): array
    {
        $sql = "SELECT * 
                FROM `post` 
                INNER JOIN `user` ON `post`.`post_fk_user_id` = `user`.`user_pk_id` 
                ORDER BY `post`.`post_date` DESC
                LIMIT $limit OFFSET $offset;";
        return $this->connection->query($sql)->fetchAll();
    }

    /**
     * Get posts by id
     * 
     * @param int $userId - user ID
     * 
     * @param int $offset - Result offset
     * 
     * @param int $limit - Nb max of result
     * 
     * @return array $posts - set of result
     */
    public function getPostsBydId(int $userId, int $offset = 0, int $limit = 100): array
    {
        $sql = "SELECT * 
                FROM `post` 
                INNER JOIN `user` ON `post`.`post_fk_user_id` = `user`.`user_pk_id` 
                WHERE post_fk_user_id = $userId 
                ORDER BY `post`.`post_date` ASC
                LIMIT $limit OFFSET $offset;";
        return $this->connection->query($sql)->fetchAll();
    }

    /**
     * Count total nb of posts
     * 
     * @param int $userId - user ID
     * 
     * @return int 
     */
    public function countPosts(int $userId = 0): int
    {
        $sql = "SELECT count(*) FROM `post` ";
        $sql = $userId == 0 ? $sql : $sql . "WHERE post_fk_user_id = $userId";
        return $this->connection->query($sql . ";")->fetchColumn();
    }
}
