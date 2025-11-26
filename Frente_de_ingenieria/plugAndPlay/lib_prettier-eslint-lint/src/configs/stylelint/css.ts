import type { StylelintConfig } from '../../types/stylelint.types';

/**
 * Configuración Stylelint específica para CSS
 * Uso: extends: ["adl-prettier-linter/configs/stylelint/base", "adl-prettier-linter/configs/stylelint/css"]
 */
const stylelintCssConfig: StylelintConfig = {
  rules: {
    // CSS específicas - Valores shorthand
    'shorthand-property-no-redundant-values': true,
    
    // CSS Grid
    'named-grid-areas-no-invalid': true,
    
    // CSS Custom Properties (Variables CSS)
    'custom-property-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Las custom properties deben usar kebab-case en minúsculas'
      }
    ],
    
    // Keyframes
    'keyframes-name-pattern': [
      '^[a-z]([a-z0-9-]+)?$',
      {
        message: 'Los nombres de keyframes deben usar kebab-case en minúsculas'
      }
    ],
    
    // Valores de tiempo
    'time-min-milliseconds': 100,
    
    // Orden de propiedades (opcional - requiere stylelint-order plugin)
    // Descomenta e instala stylelint-order si quieres orden automático de propiedades
    /*
    'order/properties-order': [
      // Posicionamiento
      'position', 'top', 'right', 'bottom', 'left', 'z-index',
      // Display y Box Model  
      'display', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content', 'gap',
      'grid-template-columns', 'grid-template-rows', 'grid-template-areas', 'grid-column', 'grid-row',
      'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      // Border
      'border', 'border-width', 'border-style', 'border-color', 'border-radius',
      // Background
      'background', 'background-color', 'background-image', 'background-position', 'background-size', 'background-repeat',
      // Typography
      'color', 'font-family', 'font-size', 'font-weight', 'line-height', 'text-align', 'text-decoration', 'text-transform',
      // Visual
      'opacity', 'visibility', 'overflow', 'transform', 'transition', 'animation'
    ]
    */
  }
};

export default stylelintCssConfig;
