import type { StylelintConfig } from '../../types/stylelint.types';

/**
 * Configuración Stylelint para proyectos SCSS
 * Requiere: stylelint-config-standard-scss y stylelint-scss
 * Uso: extends: ["adl-prettier-linter/configs/stylelint/base", "adl-prettier-linter/configs/stylelint/scss"]
 */
const stylelintScssConfig: StylelintConfig = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    // SCSS Variables
    'scss/dollar-variable-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Variables SCSS deben usar kebab-case en minúsculas'
      }
    ],
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'after-dollar-variable'],
        ignore: ['after-comment']
      }
    ],
    
    // SCSS Functions
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/no-global-function-names': true,
    
    // SCSS Mixins
    'scss/at-mixin-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Los nombres de mixins deben usar kebab-case en minúsculas'
      }
    ],
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-parentheses-space-before': 'never',
    
    // SCSS Imports
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-import-partial-extension-blacklist': ['scss'],
    
    // SCSS Operators
    'scss/operator-no-unspaced': true,
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    
    // SCSS Selectors
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-duplicate-dollar-variables': true,
    
    // SCSS Comments
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['between-comments', 'stylelint-commands']
      }
    ],
    
    // SCSS At-rules
    'scss/at-rule-no-unknown': true,
    'scss/at-function-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Los nombres de funciones SCSS deben usar kebab-case en minúsculas'
      }
    ],
    'scss/percent-placeholder-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Los placeholders SCSS deben usar kebab-case en minúsculas'
      }
    ],
    
    // SCSS Map
    'scss/map-keys-quotes': 'always',
    
    // Override algunas reglas que pueden generar ruido en SCSS
    'no-empty-source': null,
    'color-function-notation': null, // SCSS tiene sus propias funciones de color
    'alpha-value-notation': null, // SCSS maneja transparencia diferente
    
    // Media queries en SCSS
    'scss/media-feature-value-dollar-variable': 'always',
    
    // Deprecation warnings
    'scss/no-deprecated-features': true
  },
  
  overrides: [
    {
      files: ['**/_*.scss'],
      rules: {
        // Partials SCSS pueden tener menos restricciones
        'no-empty-source': null
      }
    },
    {
      files: ['**/variables.scss', '**/_variables.scss'],
      rules: {
        // Archivos de variables pueden no tener reglas CSS
        'no-empty-source': null,
        'scss/dollar-variable-empty-line-before': null
      }
    },
    {
      files: ['**/mixins.scss', '**/_mixins.scss'],
      rules: {
        // Archivos de mixins
        'no-empty-source': null
      }
    }
  ]
};

export default stylelintScssConfig;
