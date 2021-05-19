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
        $settings = $container->get('settings')['urlPublic'];
        $this->twig = $twig;
        $environment = $twig->getEnvironment();
        $environment->addGlobal('path', $settings);
    }
}
