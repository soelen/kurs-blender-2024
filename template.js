const marked = require( 'marked' );
const { readFileSync, writeFileSync } = require( 'fs' );

const markdown = readFileSync( './src/presentation.md' ).toString();
const html = marked.parse( markdown );

writeFileSync( './dist/index.html', `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="manifest.json" />
    <meta name="description" content="This is a PWA Starter app" />
    <meta name="theme-color" content="#E1477E" />
    <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" /> <title>Webmontag</title> </head>
<body>
    ${ html }
</body>
    <script>
    var process = { env: { NODE_ENV: 'production' }}
    </script>
    <script src="/htsd.min.js"></script>
    <!--
    -->
    <script type="module" src="/main.js"></script>
    <script>
      navigator.serviceWorker.register("/sw.js");
    </script>
    <link rel="stylesheet" href="main.css">


</html>
` );

/*

    */