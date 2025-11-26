import type { ESLintConfig } from '../../types/eslint.types';

/**
 * Configuración ESLint para proyectos TypeScript
 * Uso: extends: ["adl-prettier-linter/configs/eslint/base", "adl-prettier-linter/configs/eslint/typescript"]
 */
const typeScriptConfig: ESLintConfig = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // El proyecto consumidor debe apuntar a su tsconfig.json real
    project: ['./tsconfig.json']
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  },
  rules: {
    // Deshabilitar reglas de JS que TypeScript maneja mejor
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'import/no-unresolved': 'off', // TypeScript lo maneja

    // Ajustes comunes para reducir ruido
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/restrict-template-expressions': ['warn', { 
      allowNumber: true, 
      allowBoolean: true, 
      allowAny: false, 
      allowNullish: true 
    }],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': ['warn', { 
      ignoreConditionalTests: true, 
      ignoreMixedLogicalExpressions: true 
    }],
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    
    // Estilo TypeScript
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/member-delimiter-style': ['warn', {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }]
  },
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['*.test.ts', '*.spec.ts', '**/__tests__/**/*.ts', '**/*.test.*', '**/*.spec.*'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off'
      }
    }
  ]
};

export default typeScriptConfig;
