<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {

    $app->get('/', \App\Action\Connexion::class);

    $app->post('/googleAuth', \App\Action\UserAuth::class);

    $app->get('/wall', \App\Action\Wall::class);

    $app->get('/profil', \App\Action\Profil::class);
};
