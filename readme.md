# Laravel API explorer

[![Latest Version on Packagist][ico-version]][link-packagist]
[![Total Downloads][ico-downloads]][link-downloads]

This is where your description should go. Take a look at [contributing.md](contributing.md) to see a to do list.

## Features

-   Quick install (one-step install, no code change needed);
-   Zero config needed;
-   Store config/parameters to be used anytime;
-   Variables: you can set variables (like id's, tokens, etc. to be used in any place like querystring, header, body, etc.);
-   Global headers: You can set global headers (like tokens, content-type, etc.) to be used in all requests.

## Live Demo

https://laravel-api-explorer-demo.herokuapp.com/api-explorer

## Using variables

You can click on top right icon (wrench) and add your variables. When you will need to set some querystring parameter, header value, body content, etc., you can use `${VARIABLE_NAME}`, and this placeholder will be replaced by your variable.

## Using global headers

If you API needs some header in all request (or almost), you can set global headers instead of create these headers for every request. You can click on top right icon (wrench) and add your global headers.

## Screenshots

### Routes list

![Routes list][screenshot-1]

### Route info

![Route info][screenshot-2]

### Request/response

![Request/response][screenshot-3]

### Response info

![Response info][screenshot-4]

## Installation

Via Composer

```bash
$ composer require netojose/laravel-api-explorer
```

## Usage

You just need access `yourdomain.com/api-explorer`

## Configuration

Optionally you can copy config file to override default package configuration

```bash
php artisan vendor:publish --provider="NetoJose\LaravelApiExplorer\LaravelApiExplorerServiceProvider"
```

Now you have a `config/laravelapiexplorer.php` file inside your project,and you can make your changes. Available configurations:

| Configuration | Description                                                                        | Default      |
| ------------- | ---------------------------------------------------------------------------------- | ------------ |
| enabled       | Determine if the explorer will available                                           | true         |
| route         | The route to access explorer page                                                  | api-explorer |
| match         | Pattern to routes to be available on explorer                                      | api/\*       |
| ignore        | Array of routes to be ignored. You can use a pattern of a route path or route name | [,'/',]      |

## Contributing

Please see [contributing.md](contributing.md) for details and a todolist.

## Security

If you discover any security related issues, please email sputinykster@gmail.com instead of using the issue tracker.

[ico-version]: https://img.shields.io/packagist/v/netojose/laravel-api-explorer.svg?style=flat-square
[ico-downloads]: https://img.shields.io/packagist/dt/netojose/laravel-api-explorer.svg?style=flat-square
[link-packagist]: https://packagist.org/packages/netojose/laravel-api-explorer
[link-downloads]: https://packagist.org/packages/netojose/laravel-api-explorer
[link-author]: https://netojose.github.io
[screenshot-1]: https://i.imgur.com/MA27Djs.png "Routes list"
[screenshot-2]: https://i.imgur.com/lZrCPUz.png "Route info"
[screenshot-3]: https://i.imgur.com/dfXlxiV.png "Request/response"
[screenshot-4]: https://i.imgur.com/ApPO9Au.png "Response info"
