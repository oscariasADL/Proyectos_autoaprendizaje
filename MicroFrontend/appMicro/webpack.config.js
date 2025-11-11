const {
  share,
  withModuleFederationPlugin
} = require('@angular-architects/module-federation/webpack');

const moduleFederationConfig = withModuleFederationPlugin({
  shared: share({
    '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    '@angular/common/http': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    '@angular/router': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    }
  }),
  sharedMappings: [
    '@app',
    '@store',
    '@commons',
    '@modules',
    '@testing'
  ]
});

moduleFederationConfig.output.publicPath = '';

module.exports = moduleFederationConfig;
