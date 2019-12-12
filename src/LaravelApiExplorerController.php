<?php

namespace NetoJose\LaravelApiExplorer;

use Illuminate\Routing\Controller;

class LaravelApiExplorerController extends Controller {

    /**
     * @var LaravelApiExplorer
     */
    private $laravelApiExplorer;

    public function __construct(LaravelApiExplorer $laravelApiExplorer) {
        $this->laravelApiExplorer = $laravelApiExplorer;
    }

    public function getView() {
        return view('netojose::main');
    }

    public function getInfo() {
        $routes = $this->laravelApiExplorer->loadRoutesInfo();
        $config = $this->laravelApiExplorer->getConfig();
        return [
            'routes' => $routes,
            'config' => $config
        ];
    }

    public function getAsset($file) {
        $root = __DIR__ . '/../resources/assets/build';
        
        if(strpos($file, '..') !== false){
            abort(403, 'Unauthorized action.');
        }

        $filePath = $root . '/' . $file;

        $headers = [
            'Content-Type' => $this->getFileContentType($file)
        ];

        if(!file_exists($filePath)){
            abort(404);
        }
        
        return response()->file($filePath, $headers);
    }

    private function getFileContentType($file)
    {
        $array = explode('.', $file);
        $ext = end($array);
        $contentTypes = [
            'css'   => 'text/css',
            'js'    => 'text/javascript'
        ];

        return $contentTypes[$ext];
    }

}