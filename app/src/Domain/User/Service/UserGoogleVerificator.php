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
     * The constructor.
     *
     * @param ContainerInterface $repository The repository
     */
    public function __construct(ContainerInterface $container)
    {
        $this->CLIENT_ID = $container->get('settings')['CLIENT_ID'];
    }

    /**
     * Create a new user.
     *
     * @param array $data The form data
     *
     * @return array ["success"=bool,"message"=string]
     */
    public function verifyIdToken(array $data): array
    {
        $client = new Google_Client(['client_id' => $this->CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend

        $payload = $client->verifyIdToken($data["id_token"]);

        $result = [];

        if ($payload) {
            $_SESSION["user"] = $payload;
            $result["success"] = true;
            $result["message"] = "Token successfully verified.";
        } else {
            $result["success"] = false;
            $result["message"] = "Invalid ID token.";
        }

        return $result;
    }
}
