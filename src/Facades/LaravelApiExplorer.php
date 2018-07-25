<?php

namespace NetoJose\LaravelApiExplorer\Facades;

use Illuminate\Support\Facades\Facade;

class LaravelApiExplorer extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'laravelapiexplorer';
    }
}
