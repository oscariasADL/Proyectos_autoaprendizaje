import type { StylelintConfig } from '../../types/stylelint.types';

/**
 * Configuración base Stylelint
 * Uso: extends: ["adl-prettier-linter/configs/stylelint/base"]
 */
const stylelintBaseConfig: StylelintConfig = {
  extends: ['stylelint-config-standard'],
  plugins: [],
  rules: {
    // Color rules
    'color-hex-length': 'short',
    'color-hex-case': 'lower',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    
    // Font rules
    'font-family-name-quotes': 'always-where-recommended',
    'font-weight-notation': 'numeric',
    
    // Function rules
    'function-calc-no-invalid': true,
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-name-case': 'lower',
    'function-parentheses-space-inside': 'never',
    'function-whitespace-after': 'always',
    
    // Number rules
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    
    // String rules
    'string-no-newline': true,
    'string-quotes': 'single',
    
    // Length rules
    'length-zero-no-unit': true,
    
    // Unit rules
    'unit-case': 'lower',
    'unit-no-unknown': true,
    
    // Value rules
    'value-keyword-case': 'lower',
    'value-no-vendor-prefix': true,
    
    // Property rules
    'property-case': 'lower',
    'property-no-unknown': true,
    'property-no-vendor-prefix': true,
    
    // Declaration rules
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-trailing-semicolon': 'always',
    
    // Block rules
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',
    
    // Selector rules
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-type-case': 'lower',
    'selector-max-id': 0,
    'selector-max-universal': 1,
    'selector-class-pattern': [
      '^[a-z0-9\\-]+$',
      {
        message: 'Las clases deben usar kebab-case en minúsculas'
      }
    ],
    
    // Media feature rules
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    
    // At-rule rules
    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always-single-line',
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // CSS Modules
          'value',
          // PostCSS
          'define-mixin',
          'mixin',
          // Tailwind CSS
          'tailwind',
          'apply',
          'layer',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ],
    
    // Comment rules
    'comment-whitespace-inside': 'always',
    
    // General / Sheet rules
    'indentation': 2,
    'max-empty-lines': 1,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'no-empty-source': null, // Permitir archivos vacíos
    'no-descending-specificity': null, // Puede ser muy restrictivo
    
    // Evitar duplicados
    'no-duplicate-selectors': true
  }
};

export default stylelintBaseConfig;
