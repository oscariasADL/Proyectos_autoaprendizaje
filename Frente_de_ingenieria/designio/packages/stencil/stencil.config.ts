import { Config } from '@stencil/core';
import { resolve } from 'path';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'designio',
  globalStyle: 'src/styles/styles.scss',
  globalScript: 'src/index.ts',
  outputTargets: [
    {
      type: 'dist',
      dir: '../../dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: 'assets',
          dest: 'assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bavv-designio/dist/assets'
          ),
          dest: '../assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio/dist/assets'
          ),
          dest: '../assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/assets'
          ),
          dest: '../assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@npm-bbta/bbog-dig-dt-sherpa-lib/dist/bbog-dig-dt-sherpa-lib/assets'
          ),
          dest: '../assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bavv-designio'
          ),
          dest: '../bavv-designio'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio'
          ),
          dest: '../bocc-designio'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio'
          ),
          dest: '../bpop-designio'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@npm-bbta/bbog-dig-dt-sherpa-lib'
          ),
          dest: '../sherpa'
        }
      ]
    },
    {
      type: 'dist-custom-elements',
      dir: '../../dist/custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false
    },
    {
      type: 'www',
      dir: 'www',
      serviceWorker: null,
      copy: [
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bavv-designio/dist/bavv-designio'
          ),
          dest: 'build/bavv-designio'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bavv-designio/dist/assets'
          ),
          dest: 'assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio/dist/bocc-designio'
          ),
          dest: 'build/bocc-designio'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio/dist/assets'
          ),
          dest: 'assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/bpop-designio'
          ),
          dest: 'build/bpop-designio'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/assets'
          ),
          dest: 'assets'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@npm-bbta/bbog-dig-dt-sherpa-lib/dist/bbog-dig-dt-sherpa-lib'
          ),
          dest: 'build/sherpa'
        },
        {
          src: resolve(
            __dirname,
            '../../node_modules/@npm-bbta/bbog-dig-dt-sherpa-lib/dist/bbog-dig-dt-sherpa-lib/assets'
          ),
          dest: 'assets'
        }
      ]
    },
    {
      type: 'docs-readme'
    }
  ],
  plugins: [sass({})],
  testing: {
    browserHeadless: 'shell',
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/src/components/mocks/svg/mock-svg.mock.ts',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
    }
  },
  extras: {
    enableImportInjection: true
  },
  buildEs5: 'prod',
  sourceMap: process.env.NODE_ENV !== 'production'
};
