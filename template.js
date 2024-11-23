const marked = require( 'marked' );
const { readFileSync, writeFileSync } = require( 'fs' );

const markdown = readFileSync( './README.md' ).toString();
const html = marked.parse( markdown );

writeFileSync( './dist/index.html', `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="manifest.json" />
    <link rel="apple-touch-icon" href="/assets/icons/mask_192.png">
    <meta name="description" content="A small presentation about web bluetooth. 31. Jan 2022" />
    <meta name="theme-color" content="#10bb79" />
    <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta property="og:image" content="/assets/screenshots/screen.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico">
    <title>Webmontag - Webbluetooth</title>
    </head>
<body>
    ${ html }
    <script src="/htsd.min.js"></script>
    <wm-workbox></wm-workbox>
    <script type="module" src="/main.js"></script>
    <script>
      navigator.serviceWorker.register("/sw.js");
    </script>
    <link rel="stylesheet" href="main.css">
</body>


</html>
` );
