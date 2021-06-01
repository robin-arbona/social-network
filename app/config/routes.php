<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {

    $app->get('/', \App\Page\PageConnexion::class);

    $app->post('/googleAuth', \App\Action\UserAuth::class);

    $app->get('/wall', \App\Page\PageWall::class);

    $app->get('/post/new/form', \App\Page\ComponentFormPostCreation::class);

    $app->post('/post/new/db', \App\Action\CreatePost::class);

    $app->get('/post[/{page}[/{user_id}]]', \App\Action\GetPost::class);
};
