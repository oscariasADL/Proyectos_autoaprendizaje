/**
 * Índice de exportaciones de tipos
 */
export * from './eslint.types';
export * from './prettier.types';
export * from './stylelint.types';

/**
 * Tipos generales de la biblioteca
 */
export interface LibraryConfig {
  eslint?: import('./eslint.types').ConfigOptions;
  prettier?: import('./prettier.types').PrettierOptions;
  stylelint?: import('./stylelint.types').StylelintOptions;
}

export type ConfigType = 'eslint' | 'prettier' | 'stylelint';
export type Environment = 'development' | 'production' | 'test';
