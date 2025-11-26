/**
 * ADL Prettier Linter - Configuraciones centralizadas para ESLint, Prettier y Stylelint
 * @version 2.0.0
 * @author ADL Digital Labs
 */

export * from './types';
export * from './configs';
export * from './presets';
export * from './utils';

// Export para compatibilidad hacia atrás
export { default as eslintBase } from './configs/eslint/base';
export { default as eslintReact } from './configs/eslint/react';
export { default as eslintAngular } from './configs/eslint/angular';
export { default as eslintTypeScript } from './configs/eslint/typescript';
export { default as eslintNode } from './configs/eslint/node';
export { default as prettierConfig } from './configs/prettier';
export { default as stylelintBase } from './configs/stylelint/base';
export { default as stylelintCss } from './configs/stylelint/css';
export { default as stylelintScss } from './configs/stylelint/scss';
