const WebpackObfuscator = require('webpack-obfuscator');
module.exports = {
  plugins: [
    new WebpackObfuscator(
      {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false, // Set true to production
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        //log: false,
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
        /*stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',*/
        stringArrayThreshold: 0.75,
        //transformObjectKeys: true,
        unicodeEscapeSequence: false
      },
      []
    )
  ]
};
