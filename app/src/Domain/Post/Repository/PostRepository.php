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
     * Insert post row.
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
     * Insert post row.
     *
     * @param int $postId Post id to update
     * 
     * @param array $post Post data
     *
     * @return bool Success/Failure
     */
    public function editPost(int $postId, array $post): bool
    {
        $row = [
            'post_name' => htmlspecialchars($post['name']),
            'post_content' => htmlspecialchars($post['content']),
            'post_pk_id' => htmlspecialchars($postId)
        ];
        $sql = "UPDATE post SET 
                post_name=:post_name, 
                post_content=:post_content
                WHERE post_pk_id=:post_pk_id;";

        return $this->connection->prepare($sql)->execute($row);
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
     * Get post
     * 
     * @param int $offset - Result offset
     * 
     * @param int $limit - Nb max of result
     * 
     * @return array $posts - set of result
     */
    public function getPost(int $postId)
    {
        $sql = "SELECT * 
                FROM `post` 
                WHERE `post_pk_id` = $postId;";
        return $this->connection->query($sql)->fetch();
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

    /**
     * Delete post
     */
    public function deletePost(int $postId)
    {
        $sql = "DELETE FROM `post` WHERE `post_pk_id` = $postId;";
        return $this->connection->exec($sql);
    }

    /**
     * Get post owner
     * 
     * @param int $postId - Post ID
     * 
     * @param int $userId - Owner (user) ID
     */
    public function getOwner(int $postId): int
    {
        $sql = "SELECT `post_fk_user_id` FROM `post` WHERE `post_pk_id` = $postId;";
        return $this->connection->query($sql)->fetchColumn();
    }
}
