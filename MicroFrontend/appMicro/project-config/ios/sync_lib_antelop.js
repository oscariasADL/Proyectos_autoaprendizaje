const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const tar = require('tar');
const { removePrefixedFiles, deleteAllExcept } = require('./utils');

const sync_lib_antelop_sdk = (environment) => {
  const sourceFilePath = `project-config/ios/antelop-sdk-${environment}.tar.gz`;
  const outputDir = 'ios/App/libs/antelop-sdk';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const exceptFile = 'AntelopRelease.plist';
  deleteAllExcept(outputDir, exceptFile);

  const fileContents = fs.createReadStream(sourceFilePath);
  const gunzip = zlib.createGunzip();

  fileContents
    .pipe(gunzip)
    .pipe(
      tar.extract({ cwd: outputDir, filter: (path) => !path.startsWith('._') })
    )
    .on('finish', () => {
      console.log('Extraction complete.');
      removePrefixedFiles(outputDir, '._');
    })
    .on('error', (err) => {
      console.error('An error occurred:', err);
    });
};

module.exports = { sync_lib_antelop_sdk };
