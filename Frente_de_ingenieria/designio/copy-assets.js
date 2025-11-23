const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const libraries = [
  'adl-commons-design-system-frontend-bavv-designio',
  'adl-commons-design-system-frontend-bocc-designio',
  'adl-commons-design-system-frontend-bpop-designio',
];

const extraAssets = [
  'node_modules/@npm-bbta/bbog-dig-dt-sherpa-lib/dist/bbog-dig-dt-sherpa-lib/assets'
];

const targetDir = path.resolve(__dirname, 'packages/stencil/src/assets');

// Copiar assets de las librerías principales
libraries.forEach(lib => {
  const sourceAssetsPath = path.resolve(__dirname, 'node_modules/@avaldigitallabs', lib, 'dist/assets');

  if (fs.existsSync(sourceAssetsPath)) {
    fse.copySync(sourceAssetsPath, targetDir, { overwrite: true });
    console.log(`✅ Assets de ${lib} copiados a ${targetDir}`);
  } else {
    console.warn(`⚠️ No se encontraron assets en ${sourceAssetsPath}`);
  }
});

// Copiar assets adicionales
extraAssets.forEach(assetPath => {
  const sourceAssetsPath = path.resolve(__dirname, assetPath);

  if (fs.existsSync(sourceAssetsPath)) {
    fse.copySync(sourceAssetsPath, targetDir, { overwrite: true });
    console.log(`✅ Assets adicionales copiados desde ${sourceAssetsPath} a ${targetDir}`);
  } else {
    console.warn(`⚠️ No se encontraron assets en ${sourceAssetsPath}`);
  }
});
