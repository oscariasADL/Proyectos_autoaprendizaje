import type { ESLintConfig } from '../../types/eslint.types';

/**
 * Configuración ESLint para proyectos React
 * Uso: extends: ["adl-prettier-linter/configs/eslint/base", "adl-prettier-linter/configs/eslint/react"]
 */
const reactConfig: ESLintConfig = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // React
    'react/prop-types': 'off', // Normalmente se usa TS o JSDoc
    'react/react-in-jsx-scope': 'off', // Desde React 17 no es necesario importar React
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    'react/jsx-key': ['error', { 
      checkFragmentShorthand: true,
      checkKeyMustBeforeSpread: true,
      warnOnDuplicates: true
    }],
    'react/no-array-index-key': 'warn',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    
    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', { 
      additionalHooks: '^(useMemoOne|useDeepCompareEffect|useAsyncEffect)$' 
    }],
    
    // Accesibilidad
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': ['warn', { 
      components: ['Link'], 
      specialLink: ['to', 'href'], 
      aspects: ['noHref', 'invalidHref', 'preferButton'] 
    }],
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    
    // Estilo / buenas prácticas
    'react/jsx-curly-spacing': ['warn', { when: 'never', children: { when: 'always' } }],
    'react/jsx-sort-props': 'off', // Opcional, puede ser muy opinionado
    'react/self-closing-comp': 'error',
    'react/jsx-boolean-value': ['error', 'never']
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        // Reglas específicas para archivos TypeScript + React
        'react/prop-types': 'off' // TypeScript ya valida props
      }
    },
    {
      files: ['**/*.test.jsx', '**/*.test.tsx', '**/*.spec.jsx', '**/*.spec.tsx'],
      rules: {
        // Reglas más relajadas para tests
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off'
      }
    }
  ]
};

export default reactConfig;
