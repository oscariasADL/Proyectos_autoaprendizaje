import type { ESLintConfig } from '../../types/eslint.types';

/**
 * Configuración ESLint para proyectos Angular
 * Requiere instalar: @angular-eslint/eslint-plugin, @angular-eslint/eslint-plugin-template, @angular-eslint/template-parser
 * Uso: extends: ["adl-prettier-linter/configs/eslint/base", "adl-prettier-linter/configs/eslint/typescript", "adl-prettier-linter/configs/eslint/angular"]
 */
const angularConfig: ESLintConfig = {
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'prettier'
      ],
      rules: {
        // Ajustes Angular - Naming conventions
        '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component'] }],
        '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
        '@angular-eslint/pipe-prefix': ['error', { prefixesToCheck: ['app', 'adl'] }],
        '@angular-eslint/component-selector': ['error', { 
          type: 'element', 
          prefix: ['app', 'adl'], 
          style: 'kebab-case' 
        }],
        '@angular-eslint/directive-selector': ['error', { 
          type: 'attribute', 
          prefix: ['app', 'adl'], 
          style: 'camelCase' 
        }],

        // Lifecycle y buenas prácticas
        '@angular-eslint/no-empty-lifecycle-method': 'warn',
        '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-host-metadata-property': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',

        // Performance y seguridad
        '@angular-eslint/no-pipe-impure': 'warn',
        '@angular-eslint/prefer-output-readonly': 'error',
        '@angular-eslint/relative-url-prefix': 'error',

        // Estilo TypeScript adicional para Angular
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/member-ordering': ['warn', {
          default: [
            'static-field',
            'instance-field',
            'static-method',
            'instance-method'
          ]
        }]
      }
    },
    {
      files: ['*.html'],
      parser: '@angular-eslint/template-parser',
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        // Template accessibility
        '@angular-eslint/template/click-events-have-key-events': 'warn',
        '@angular-eslint/template/interactive-supports-focus': 'warn',
        '@angular-eslint/template/alt-text': 'warn',
        '@angular-eslint/template/elements-content': 'warn',
        '@angular-eslint/template/label-has-associated-control': 'warn',
        '@angular-eslint/template/table-scope': 'warn',
        '@angular-eslint/template/valid-aria': 'warn',

        // Template buenas prácticas
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/no-any': 'warn',
        '@angular-eslint/template/no-duplicate-attributes': 'error',
        '@angular-eslint/template/conditional-complexity': ['warn', { maxComplexity: 3 }],
        '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 5 }],
        '@angular-eslint/template/use-track-by-function': 'warn',

        // Template estilo
        '@angular-eslint/template/banana-in-box': 'error',
        '@angular-eslint/template/eqeqeq': 'error'
      }
    },
    {
      files: ['*.component.ts'],
      rules: {
        // Reglas específicas para componentes
        '@angular-eslint/prefer-on-push-component-change-detection': 'error'
      }
    },
    {
      files: ['*.service.ts'],
      rules: {
        // Reglas específicas para servicios
        '@angular-eslint/component-class-suffix': 'off'
      }
    },
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {
        // Reglas más relajadas para tests
        '@angular-eslint/no-empty-lifecycle-method': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    }
  ]
};

export default angularConfig;
