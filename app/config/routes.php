<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    $app->get('/', function (ServerRequestInterface $request, ResponseInterface $response) {
        $response->getBody()->write('Hello World!');
        return $response;
    });

   

    $app->get('/connexion', \App\Action\Connexion::class);

    $app->post('/googleAuth', \App\Action\UserGoogleAuth::class);

    $pays=array(
        array('name'=>'USA'),
        array('name'=>'France'),
        array('name'=>'Algerie'),
        array('name'=>'Maroc'),
        array('name'=>'Angleterre'),
        
    );
   

    // $app->get('/pays',function( ServerRequestInterface $request , ResponseInterface $response,$args) use ($pays){
    //     $response->getBody()->write($pays);
    //     return $response->withJson($pays);
    // });
};

$pays=array(
    array('name'=>'USA'),
    array('name'=>'France'),
    array('name'=>'Algerie'),
    array('name'=>'Maroc'),
    array('name'=>'Angleterre'),
    
);

$name="Ok many";


$app->get('/pays', function (ServerRequestInterface $request, ResponseInterface $response) use ($name) {
    $response->getBody()->write($name);
    return $response;
});

$app->run();
