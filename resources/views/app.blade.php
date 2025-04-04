<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    {{--loading cool fonts--}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />


    @vite(['resources/js/app.ts'])
    @inertiaHead
    @routes
  </head>
  <body class="font-sans antialiased">
    @inertia
  </body>
</html>
