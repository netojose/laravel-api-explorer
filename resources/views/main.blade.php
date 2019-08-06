<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <style>
        body {
            margin: 0;
        }
    </style>
    <script>
        window.api_info_url = "{{route('laravelapiexplorer.info')}}";
    </script>
    <title>API explorer</title>
</head>

<body>
    <div id="app"></div>
    <script src="{{route('laravelapiexplorer.asset', ['file' => 'bundle.js'])}}"></script>
</body>

</html>