import pkg from 'workbox-build';
const { injectManifest } = pkg;

injectManifest({
  globDirectory: 'dist/',
  globIgnores: ['polyfills/*.js', 'legacy-*.js', 'nomodule-*.js'],
  // navigateFallback: '/index.html',
  // skipWaiting: true,
  // clientsClaim: true,
  globPatterns: [
    '**/*.{html,js,json,css,woff2}',
    'assets/icons/*.{png,webp,jpg}',
    'assets/screenshots/*.{png,webp,jpg}',
  ],
  swSrc: 'sw.js',
  swDest: 'dist/sw.js',
});

  // userOptions.workbox,
  //   {
  //     // Keep 'legacy-*.js' just for retro compatibility
  //     // where to output the generated sw
  //     swDest: path.join(outputDir, 'sw.js'),
  //     globDirectory: path.join(outputDir),
  //     // directory to match patterns against to be precached
  //     // cache any html js and css by default
  //     globPatterns: ['**/*.{html,js,css,webmanifest}'],
  //     runtimeCaching: [
  //       {
  //         urlPattern: 'polyfills/*.js',
  //         handler: 'CacheFirst',
  //       },
  //     ],
  //   },
