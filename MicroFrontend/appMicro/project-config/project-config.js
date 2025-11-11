const fs = require('fs');
const { sync_lib_antelop_sdk } = require('./ios/sync_lib_antelop');
const { sync_lib_onespan_sdks } = require('./ios/sync_libs_onespan');

function syncProjectConfig() {
  const platform = process.argv[2] === 'android' ? 'android' : 'ios';
  const environment = process.argv[3] === 'pro' ? 'pro' : 'pre';

  const capacitorConfig = `capacitor.config.json`;
  const capacitorBundleId = 'com.grupoavalav.bancamovil';
  const capacitorClearTextTraffic = 'android:usesCleartextTraffic="true"';

  const iosConfig = `project-config/ios/${platform}-${environment}.config.json`;
  const iosGoogleServicesSource = `project-config/ios/GoogleService-Info-${environment}.plist`;
  const iosGoogleServicesDest = `ios/App/App/GoogleService-Info.plist`;
  const iosAntelopSdkSource = `project-config/ios/AntelopRelease-${environment}.plist`;
  const iosAntelopSdkDest = `ios/App/libs/antelop-sdk/AntelopRelease.plist`;

  const androidConfig = `project-config/android/${platform}-${environment}.config.json`;
  const androidBundleId = `com.grupoavalav1.bancamovil`;
  const androidGradle = `android/app/build.gradle`;
  const androidManifest = `android/app/src/main/AndroidManifest.xml`;
  const androidManifestClearTextTraffic =
    'android:usesCleartextTraffic="false"';
  const androidQuickActions = `android/app/src/main/java/plugins/QuickActions.java`;
  const androidGoogleServicesSource = `project-config/android/google-services-${environment}.json`;
  const androidGoogleServicesDest = `android/app/google-services.json`;

  const deeplinkForStgEnv = `android:host="mb-stg-avvillas.avaldigitallabs.com"`;
  const deeplinkForProdEnv = `android:host="mb-pro-avvillas.avaldigitallabs.com"`;

  const throwError = (error) => {
    if (error) throw new Error('Error found:', error);
  };

  const copyFile = (sourceFile, destFile) => {
    fs.copyFile(sourceFile, destFile, (error) => throwError(error));
  };

  const replaceTextInFile = (path, oldText, newText) => {
    const bufferText = fs.readFileSync(path, 'utf8');
    const result = bufferText.replace(new RegExp(oldText, 'g'), newText);
    fs.writeFileSync(path, result, 'utf8');
    /*fs.readFileSync(path, 'utf8', (error, data) => {
      throwError(error);
      const result = data.replace(new RegExp(oldText, 'g'), newText);
      fs.writeFileSync(path, result, 'utf8');
    });*/
  };

  const syncProjectiOSConfig = () => {
    fs.readFile(iosConfig, (error, data) => {
      throwError(error);
      const config = JSON.parse(data);
      copyFile(iosGoogleServicesSource, iosGoogleServicesDest);
      copyFile(iosAntelopSdkSource, iosAntelopSdkDest);
      sync_lib_antelop_sdk(environment);
      sync_lib_onespan_sdks();
    });
  };

  const syncProjectAndroidConfig = () => {
    fs.readFile(androidConfig, (error, data) => {
      throwError(error);
      const config = JSON.parse(data);
      replaceTextInFile(androidManifest, androidBundleId, config.appId);
      replaceTextInFile(androidGradle, androidBundleId, config.appId);
      replaceTextInFile(androidQuickActions, androidBundleId, config.appId);
      replaceTextInFile(capacitorConfig, capacitorBundleId, config.appId);
      replaceTextInFile(
        androidManifest,
        capacitorClearTextTraffic,
        androidManifestClearTextTraffic
      );
      environment === 'pro' &&
        replaceTextInFile(
          androidManifest,
          deeplinkForStgEnv,
          deeplinkForProdEnv
        );
      copyFile(androidGoogleServicesSource, androidGoogleServicesDest);
    });
  };

  switch (platform) {
    case 'android':
      syncProjectAndroidConfig();
      break;
    case 'ios':
      syncProjectiOSConfig();
      break;
  }
}

syncProjectConfig();
