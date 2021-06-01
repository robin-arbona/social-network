<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {

    $app->get('/', \App\Action\Connexion::class);

    $app->post('/googleAuth', \App\Action\UserAuth::class);

    $app->get('/wall', \App\Action\Wall::class);

    $app->get('/profil', \App\Action\Profil::class);
    $app->get('/post/new/form', \App\Action\ShowPostCreation::class);

    $app->post('/post/new/db', \App\Action\HandlePostCreation::class);

    $app->get('/post[/{page}[/{user_id}]]', \App\Action\GetPostAction::class);
};
