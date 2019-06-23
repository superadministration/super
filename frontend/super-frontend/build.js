const Bundler = require('parcel-bundler');
const fs = require('fs');
const path = require('path');

const entryFiles = [
  'src/stylesheets/super/application.css',
  'src/javascripts/super/application.js',
];

const options = {
  outDir: '../../app/assets',
  watch: process.argv.includes('--watch'),
  cacheDir: 'tmp/parcel/cache',
  global: 'Super',
  contentHash: false,
  minify: false,
  sourceMaps: false,
  hmr: false,
};

const bundler = new Bundler(entryFiles, options);

bundler.on('bundled', function (bundle) {
  bundle.childBundles.forEach(function (childBundle) {
    var basename = path.basename(childBundle.name);
    var destDir = path.join(__dirname, 'dist');
    var destPath = path.join(destDir, basename);

    console.log(destPath);
    fs.copyFileSync(childBundle.name, destPath);
  });
});

bundler.bundle();
