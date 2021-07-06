<?php

namespace App\Domain\User\Service;

use Psr\Container\ContainerInterface;
use Google_Client;


/**
 * Service.
 */
final class UserGoogleVerificator
{
    /**
     * @var CLIENT_API_ID
     */
    private $CLIENT_ID;

    /**
     * @var UserCreator
     */
    private $userCreator;

    /**
     * The constructor.
     *
     * @param ContainerInterface 
     * @param UserCreator
     */
    public function __construct(ContainerInterface $container, UserCreator $userCreator)
    {
        $this->CLIENT_ID = $container->get('settings')['CLIENT_ID'];
        $this->userCreator = $userCreator;
    }

    /**
     * Check id_token, create new user if needed.
     *
     * @param array $data from ajax (id_token)
     *
     * @return array ["success"=bool,"message"=string]
     */
    public function verifyIdToken(array $data): array
    {
        $client = new Google_Client(['client_id' => $this->CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend

        $payload = $client->verifyIdToken($data["id_token"]);

        $result = [];

        if ($payload) {
            $result["success"] = true;
            $result["id"] = $this->userCreator->createOrGetUser($payload);
            $result["message"] = "Token successfully verified.";
        } else {
            $result["success"] = false;
            $result["message"] = "Invalid ID token.";
        }

        return $result;
    }
}
