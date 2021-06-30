<?php

use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {

    // Connexion page
    $app->get('/', \App\Page\PageConnexion::class);

    // Authentification
    $app->post('/googleAuth', \App\Action\UserAuth::class);

    // Wall page(s)
    $app->get('/wall[/{user_id:[0-9]+}]', \App\Page\PageWall::class);

    // Post(s)
    $app->group('/post', function (RouteCollectorProxy $group) {

        $group->post('', \App\Action\CreatePost::class);

        $group->get('/{post_id:[0-9]+}', \App\Action\GetPost::class);

        $group->delete('/{post_id:[0-9]+}', \App\Action\DeletePost::class);

        $group->put('/{post_id:[0-9]+}', \App\Action\EditPost::class);

        $group->get('/form', \App\Page\ComponentFormPost::class);
    });

    $app->get('/posts[/{page}[/{user_id:[0-9]+}]]', \App\Action\GetPosts::class);


    // Comment(s)
    $app->get('/comment/form', \App\Page\ComponentFormComment::class);

    $app->post('/comment/{id:[0-9]+}', \App\Action\CreateComment::class);


    // User(s)
    $app->get('/user[/{user_id:[0-9]+}]', \App\Action\GetUser::class);

    $app->get('/users', \App\Action\GetUsers::class);


    // Voting
    $app->post('/vote', \App\Action\Vote::class);
};
