<?php

namespace App\Domain\User\Repository;

use PDO;

/**
 * Repository.
 */
final class UserRepository
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
     * @param array $user The user
     *
     * @return int The new ID
     */
    public function insertUser(array $user): int
    {
        $row = [
            'user_firstname' => $user['given_name'],
            'user_name' => $user['family_name'],
            'user_mail' => $user['email'],
            'user_picture' => $user['picture'],
        ];
        $sql = "INSERT INTO user SET 
                user_picture=:user_picture, 
                user_firstname=:user_firstname, 
                user_name=:user_name, 
                user_mail=:user_mail;";

        $this->connection->prepare($sql)->execute($row);

        return (int)$this->connection->lastInsertId();
    }

    /**
     * Check user in db
     * 
     * @param array $data (payload with email field)
     * 
     * @return void false or user id
     */
    public function userInDb(array $user)
    {
        $sql = "SELECT `user_pk_id` FROM user WHERE user_mail = :mail";
        $row = [
            ":mail" => $user['email']
        ];
        $sth = $this->connection->prepare($sql);
        $sth->execute($row);
        return $sth->fetchColumn(0);
    }

    /**
     * Get all user information
     * 
     * @return array 
     */
    public function getAll()
    {
        $sql = "SELECT * FROM user ORDER BY user_name ASC";
        $sth = $this->connection->prepare($sql);
        $sth->execute();
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get user rights information
     * 
     * @param int $id
     * 
     * @return array
     */
    public function checkRights(int $id)
    {
        $sql = "SELECT `rights`.`rights_value`, `rights`.`rights_type` 
        FROM `rights` 
        INNER JOIN `user` 
        ON `user`.`user_fk_rights_id` = `rights`.`rights_pk_id` 
        WHERE `user`.`user_pk_id` = :id";
        $row = [
            ":id" => $id
        ];
        $sth = $this->connection->prepare($sql);
        $sth->execute($row);
        return $sth->fetch(PDO::FETCH_ASSOC);
    }
}
