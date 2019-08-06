<?php

namespace NetoJose\LaravelApiExplorer;

use Route;
use ReflectionParameter;
use ReflectionMethod;

class LaravelApiExplorer
{
    public function loadRoutesInfo()
    {
        $items = [];
        $routes = $this->getRoutes();

        foreach ($routes as $route) {
            $items[] = $this->formatRoute($route);
        }

        return $items;
    }

    public function getConfig()
    {
        return [];
    }

    private function getRoutes()
    {
        $routeCollection = Route::getRoutes();

        $laravelRoutes = $routeCollection->getRoutes();
        $dingoRoutes = $this->getDingoRoutes();

        $allRoutes = array_merge($laravelRoutes, $dingoRoutes);

        return $this->filterRoutes($allRoutes);
    }

    private function getDingoRoutes()
    {

        if (!class_exists(\Dingo\Api\Routing\Router::class)) {
            return [];
        }

        $dingoRouter = app('Dingo\Api\Routing\Router');
        $versions = $dingoRouter->getRoutes();
        $routes = [];
        foreach ($versions as $version) {
            $routes[] = $version->getRoutes();
        }

        $routes = collect($routes)->flatten()->toArray();

        return $routes;
    }

    private function filterRoutes($routes)
    {
        $filtered = [];

        $match = trim(config('laravelapiexplorer.match'), '/');
        $ignoreList = collect(config('laravelapiexplorer.ignore'));
        $ignoreList->push('laravelapiexplorer.view');
        $ignoreList->push('laravelapiexplorer.info');
        $ignoreList->push('laravelapiexplorer.asset');

        foreach ($routes as $route) {
            $name = $route->getName();
            $uri = trim($route->uri(), '/');

            if (
                !str_is($match, $name) &&
                !str_is($match, $uri)
            ) {
                continue;
            }

            $ignore = $ignoreList->contains(function ($value) use ($name, $uri) {
                return $value == $name || $value == $uri;
            });

            if ($ignore) {
                continue;
            }

            $filtered[] = $route;
        }

        return $filtered;
    }

    private function formatRoute($route)
    {
        $action = $route->getAction();

        $method = null;
        $exists = true;
        $description = '';
        $rules = new \stdClass();
        $controller = $action['controller'] ?? null;
        if ($controller) {

            if (strpos($controller, '@') !== false) {
                list($controller, $method) = explode('@', $action['controller'], 2);
            } else {
                $method = '__invoke';
            }

            $exists = class_exists($controller) && method_exists($controller, $method);

            if ($exists) {
                $rules = $this->getRules($controller, $method);
                $description = $this->getMethodDescription($controller, $method);
            }
        }

        $uri = $route->uri();

        $httpVerb = collect($route->methods())->filter(function ($value) {
            return $value != 'HEAD';
        })->first();

        return [
            'name' => $route->getName(),
            'description' => $description,
            'url' => url($uri),
            'uri' => trim($uri, '/'),
            'exists' => $exists,
            'http_verb' => $httpVerb,
            'controller' => $controller,
            'action' => $method,
            'middlewares' => $route->middleware(),
            'parameters' => $route->parameterNames(),
            'wheres' => $route->wheres ? $route->wheres : new \stdClass(),
            'rules' => $rules
        ];
    }

    private function getMethodDescription($controller, $method)
    {
        $reflectionMethod = new ReflectionMethod($controller, $method);
        $comment = $reflectionMethod->getDocComment();

        $pattern = "#([a-zA-Z]+\s*[a-zA-Z0-9, ()_].*)#";
        preg_match_all($pattern, $comment, $matches, PREG_PATTERN_ORDER);
        $found = $matches[0];

        return (isset($found[0]) && substr($found[0], 0, 1) != '@') ? $found[0] : '';
    }

    private function getRules($controller, $method)
    {
        $rules = new \stdClass();

        $requestClass = null;
        $reflectionMethod = new ReflectionMethod($controller, $method);
        $params = $reflectionMethod->getParameters();

        if (count($params)) {
            $parameter = new ReflectionParameter([$controller, $method], 0);
            $requestClass = $parameter->getClass();
        }

        if ($requestClass && $requestClass->hasMethod('rules')) {
            $className = $requestClass->name;
            $reflectionMethod = new ReflectionMethod($className, 'rules');
            $allRules = $reflectionMethod->invoke(new $className());

            foreach ($allRules as $field => $rule) {
                $rules->$field =  $this->formatRule($rule);
            }
        }

        return $rules;
    }

    private function formatRule($ruleset)
    {
        if (is_string($ruleset)) {
            $ruleset = explode('|', $ruleset);
        }

        $rules = [];

        foreach ($ruleset as $ruleItem) {
            $rule = $ruleItem;

            if (is_object($rule)) {
                $rule = get_class($ruleItem);
            }

            $rules[] = $rule;
        }

        return $rules;
    }
}
