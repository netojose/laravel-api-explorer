<?php

$enabled = config('laravelapiexplorer.enabled');

if($enabled){
    $prefix = config('laravelapiexplorer.route');
    Route::namespace('\NetoJose\LaravelApiExplorer')->prefix($prefix)->name('laravelapiexplorer.')->group(function () {
        Route::get('/', 'LaravelApiExplorerController@getView')->name('view');
        Route::get('info', 'LaravelApiExplorerController@getInfo')->name('info');
        Route::get('assets/{file}', 'LaravelApiExplorerController@getAsset')->where('file', '^([a-z0-9_\-\.]+).(js|css|svg)$')->name('asset');
    });
}