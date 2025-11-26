import type { PrettierConfig } from '../../types/prettier.types';

/**
 * Configuración recomendada de Prettier para ADL.
 * Uso: 
 * - CommonJS: module.exports = require('adl-prettier-linter/configs/prettier');
 * - ESM: import prettierConfig from 'adl-prettier-linter/configs/prettier';
 */
const prettierConfig: PrettierConfig = {
  // Configuración básica
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,

  // Overrides específicos por tipo de archivo
  overrides: [
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 80,
        proseWrap: 'always',
        singleQuote: false
      }
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
        singleQuote: false
      }
    },
    {
      files: ['*.json'],
      options: {
        tabWidth: 2,
        singleQuote: false,
        trailingComma: 'none'
      }
    },
    {
      files: ['*.css', '*.scss', '*.sass'],
      options: {
        singleQuote: true,
        tabWidth: 2
      }
    },
    {
      files: ['*.html'],
      options: {
        htmlWhitespaceSensitivity: 'strict',
        singleAttributePerLine: true,
        bracketSameLine: false
      }
    },
    {
      files: ['*.js', '*.jsx'],
      options: {
        singleQuote: true,
        jsxSingleQuote: false
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      options: {
        singleQuote: true,
        jsxSingleQuote: false,
        trailingComma: 'all'
      }
    },
    {
      files: ['*.vue'],
      options: {
        singleQuote: true,
        htmlWhitespaceSensitivity: 'strict'
      }
    },
    {
      files: ['package.json', 'package-lock.json'],
      options: {
        tabWidth: 2,
        singleQuote: false,
        trailingComma: 'none'
      }
    }
  ]
};

export default prettierConfig;
