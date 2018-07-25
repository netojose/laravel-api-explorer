<?php

namespace NetoJose\LaravelApiExplorer;

use Illuminate\Support\ServiceProvider;

class LaravelApiExplorerServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'netojose');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'netojose');
        // $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        $this->loadRoutesFrom(__DIR__.'/routes.php');

        // Publishing is only necessary when using the CLI.
        if ($this->app->runningInConsole()) {

            // Publishing the configuration file.
            $this->publishes([
                __DIR__.'/../config/laravelapiexplorer.php' => config_path('laravelapiexplorer.php'),
            ], 'laravelapiexplorer.config');

            // Publishing the views.
            /*$this->publishes([
                __DIR__.'/../resources/views' => base_path('resources/views/vendor/netojose'),
            ], 'apiexplorer.views');*/

            // Publishing assets.
            /*$this->publishes([
                __DIR__.'/../resources/assets' => public_path('vendor/netojose'),
            ], 'apiexplorer.views');*/

            // Publishing the translation files.
            /*$this->publishes([
                __DIR__.'/../resources/lang' => resource_path('lang/vendor/netojose'),
            ], 'apiexplorer.views');*/

            // Registering package commands.
            // $this->commands([]);
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/laravelapiexplorer.php', 'laravelapiexplorer');

        // Register the service the package provides.
        $this->app->singleton('laravelapiexplorer', function ($app) {
            return new LaravelApiExplorer;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['laravelapiexplorer'];
    }
}