const moduleFederationConfig = require('./webpack.config');
const WebpackObfuscator = require('webpack-obfuscator');

moduleFederationConfig.plugins = [
  new WebpackObfuscator(
    {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false, // Set true to production
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      numbersToExpressions: false, // Optional
      renameGlobals: false,
      selfDefending: true, // it's great!
      simplify: false, //optional
      splitStrings: false, // Optional
      stringArray: true,
      stringArrayCallsTransform: false,
      stringArrayEncoding: [], // (base64) This option can slow down your script.
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false
    },
    []
  )
];

module.exports = moduleFederationConfig;
