<?php

namespace App\Page;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Views\Twig;

final class ComponentFormPost extends PageTwig
{
    protected $twig;

    public function __construct(Twig $twig, ContainerInterface $container)
    {
        parent::__construct($twig, $container);
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {

        return $this->twig->render($response, 'component.post-form.twig');
    }
}
