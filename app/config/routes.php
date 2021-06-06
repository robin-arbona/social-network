<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {

    $app->get('/', \App\Page\PageConnexion::class);

    $app->post('/googleAuth', \App\Action\UserAuth::class);

    $app->get('/wall[/{user_id}]', \App\Page\PageWall::class);

    $app->get('/post/new/form', \App\Page\ComponentFormPostCreation::class);

    $app->get('/comment/form', \App\Page\ComponentFormCommentCreation::class);

    $app->post('/post/new/db', \App\Action\CreatePost::class);

    $app->post('/comment/{id}', \App\Action\CreateComment::class);

    $app->get('/post[/{page}[/{user_id}]]', \App\Action\GetPost::class);

    $app->get('/user[/{user_id}]', \App\Action\GetUser::class);

    $app->post('/vote', \App\Action\Vote::class);
};
