<?php

namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ShowUserSignup
{
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        ob_start();
        require('../templates/inscription.php');
        $content = ob_get_clean();
        $response->getBody()->write($content);

        return $response;
    }
}
