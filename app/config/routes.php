<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {

    // Connexion page
    $app->get('/', \App\Page\PageConnexion::class);

    // Authentification
    $app->post('/googleAuth', \App\Action\UserAuth::class);

    // Wall page(s)
    $app->get('/wall[/{user_id}]', \App\Page\PageWall::class);

    // Post(s)
    $app->group('/post', function (RouteCollectorProxy $group) {

        $group->get('/form', \App\Page\ComponentFormPost::class);

        $group->post('', \App\Action\CreatePost::class);

        $group->delete('/{post_id}', \App\Action\DeletePost::class);
    });

    $app->get('/posts[/{page}[/{user_id}]]', \App\Action\GetPost::class);


    // Comment(s)
    $app->get('/comment/form', \App\Page\ComponentFormComment::class);

    $app->post('/comment/{id}', \App\Action\CreateComment::class);


    // User(s)
    $app->get('/user[/{user_id}]', \App\Action\GetUser::class);

    $app->get('/users', \App\Action\GetUsers::class);


    // Voting
    $app->post('/vote', \App\Action\Vote::class);
};
