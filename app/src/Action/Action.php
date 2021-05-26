<?php

namespace App\Action;

use Psr\Container\ContainerInterface;
use DI\ContainerBuilder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Views\Twig;

class Action
{
    protected $twig;

    public function __construct(Twig $twig, ContainerInterface $container)
    {
        $urlPublic = $container->get('settings')['urlPublic'];
        $urlMain = $container->get('settings')['urlMain'];
        $CLIENT_ID = $container->get('settings')['CLIENT_ID'];

        $this->twig = $twig;
        $environment = $twig->getEnvironment();
        $environment->addGlobal('pathPublic', $urlPublic);
        $environment->addGlobal('pathMain', $urlMain);
        $environment->addGlobal('CLIENT_ID', $CLIENT_ID);
    }
}
