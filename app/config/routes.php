<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    $app->get('/', function (
        ServerRequestInterface $request,
        ResponseInterface $response
    ) {
        $response->getBody()->write('Hello World!');
        return $response;
    });

    $app->get('/hello', \App\Action\HomeAction::class)->setName('home');
    $app->get('/json', \App\Action\HomeJson::class)->setName('json');
    $app->post('/users', \App\Action\UserCreateAction::class);
    $app->get('/inscription', \App\Action\ShowUserSignup::class);
};
