const fs = require('fs');
const zlib = require('zlib');
const tar = require('tar');
const { removePrefixedFiles, deleteAllExcept } = require('./utils');

const libs = [
  {
    sourceFile: 'project-config/ios/onespan-utilities-sdk.tar.gz',
    outputDir: 'ios/App/libs/onespan-utilities-sdk'
  },
  {
    sourceFile: 'project-config/ios/digipass-sdk.tar.gz',
    outputDir: 'ios/App/libs/digipass-sdk'
  },
  {
    sourceFile: 'project-config/ios/secure-storage-sdk.tar.gz',
    outputDir: 'ios/App/libs/secure-storage-sdk'
  },
  {
    sourceFile: 'project-config/ios/secure-messaging-sdk.tar.gz',
    outputDir: 'ios/App/libs/secure-messaging-sdk'
  },
  {
    sourceFile: 'project-config/ios/device-binding-sdk.tar.gz',
    outputDir: 'ios/App/libs/device-binding-sdk'
  }
];

const sync_lib_onespan_sdks = (environment) => {
  libs.forEach((element) => {
    if (!fs.existsSync(element.outputDir)) {
      fs.mkdirSync(element.outputDir, { recursive: true });
    }
    const exceptFile = '.gitkeep';
    deleteAllExcept(element.outputDir, exceptFile);

    const fileContents = fs.createReadStream(element.sourceFile);
    const gunzip = zlib.createGunzip();

    fileContents
      .pipe(gunzip)
      .pipe(
        tar.extract({
          cwd: element.outputDir,
          filter: (path) => !path.startsWith('._')
        })
      )
      .on('finish', () => {
        console.log('Extraction complete.');
        removePrefixedFiles(element.outputDir, '._');
      })
      .on('error', (err) => {
        console.error('An error occurred:', err);
      });
  });
};

module.exports = { sync_lib_onespan_sdks };
