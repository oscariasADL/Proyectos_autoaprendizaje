import type { ESLintConfig } from '../../types/eslint.types';

/**
 * Configuración ESLint para proyectos Node.js
 * Uso: extends: ["adl-prettier-linter/configs/eslint/base", "adl-prettier-linter/configs/eslint/node"]
 */
const nodeConfig: ESLintConfig = {
  env: {
    node: true,
    browser: false,
    es2021: true
  },
  plugins: ['node'],
  extends: [
    'plugin:node/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    node: {
      tryExtensions: ['.js', '.json', '.ts', '.d.ts'],
      resolvePaths: ['node_modules/@types']
    }
  },
  rules: {
    // Node.js específicas
    'node/no-unsupported-features/es-syntax': ['error', { 
      ignores: ['modules', 'dynamicImport'] 
    }],
    'node/no-missing-import': 'off', // Manejado por TypeScript resolver
    'node/no-missing-require': 'off', // Manejado por TypeScript resolver
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-extraneous-import': 'error',
    'node/no-extraneous-require': 'error',
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',

    // Seguridad en Node.js
    'node/no-deprecated-api': 'error',
    'node/no-process-exit': 'error',

    // Buenas prácticas Node.js
    'no-process-env': 'off', // Común en Node.js
    'no-sync': 'warn', // Evitar métodos síncronos cuando sea posible
    'handle-callback-err': 'error',
    'no-new-require': 'error',
    'no-path-concat': 'error',
    'no-mixed-requires': 'error'
  },
  overrides: [
    {
      files: ['*.config.js', '*.config.ts', 'webpack.*.js', 'rollup.*.js'],
      env: {
        node: true
      },
      rules: {
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'no-process-env': 'off'
      }
    },
    {
      files: ['scripts/**', 'bin/**'],
      rules: {
        'no-process-exit': 'off',
        'no-console': 'off'
      }
    },
    {
      files: ['**/*.test.js', '**/*.test.ts', '**/*.spec.js', '**/*.spec.ts'],
      env: {
        jest: true,
        mocha: true
      },
      rules: {
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        'no-process-env': 'off'
      }
    }
  ]
};

export default nodeConfig;
