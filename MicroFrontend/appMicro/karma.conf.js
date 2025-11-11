// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    concurrency: 1,
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-timing-reporter')
    ],
    parallelOptions: {
      executors: 4,
      shardStrategy: 'round-robin'
    },
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    client: {
      clearContext: false,

      jasmine: {
        random: false // Enable random order
      }
    },
    jasmineHtmlReporter: {
      suppressAll: true, // Desactiva el reporte resumido
      suppressFailed: false // Muestra detalles de las pruebas fallidas
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'text-summary' }
      ],
      check: {
        global: {
          statements: 88,
          branches: 73,
          functions: 87,
          lines: 88
        }
      },
      fixWebpackSourcePaths: true
    },
    /*coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },*/
    reporters: ['kjhtml', 'timing', 'mocha'],
    timingReporter: {
      outputFile: 'test-timing-results.json',
      slowTestThreshold: 300,
      topSlowestTests: 30,
      createReport: false
    },
    port: 9876,
    colors: true,
    browserSocketTimeout: 60000,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    captureTimeout: 300000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 300000,
    browserNoActivityTimeout: 300000,
    singleRun: false,
    autoWatch: true,
    restartOnFileChange: true,
    proxies: {
      '/assets/': '/base/src/assets/'
    },
    files: [
      {
        pattern: './src/assets/**',
        watched: false,
        included: false,
        nocache: false,
        served: true
      },
      {
        pattern: 'src/app/modules/product/**/*.spec.ts',
        watched: false
      },
      {
        pattern: 'src/app/modules/security/**/*.spec.ts',
        watched: false
      },
      {
        pattern: 'src/app/modules/notifications/**/*.spec.ts',
        watched: false
      },
      {
        pattern: 'src/app/modules/transfiya-management/**/*.spec.ts',
        watched: false
      },
      {
        pattern: 'src/app/modules/home/**/*.spec.ts',
        watched: false
      }
    ]
  });
};
