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
            'post_name' => $post['name'],
            'post_picture' => $post['picture'],
            'post_content' => $post['content'],
            'post_fk_user_id' => $post['post_fk_user_id']
        ];
        $sql = "INSERT INTO post SET 
                post_name=:post_name, 
                post_picture=:post_picture, 
                post_content=:post_content,
                post_fk_user_id=:post_fk_user_id;";

        $this->connection->prepare($sql)->execute($row);

        return (int)$this->connection->lastInsertId();
    }
}
