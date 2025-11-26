/**
 * Índice de exportaciones de utilidades
 */
export { mergeESLintConfigs, normalizeESLintRules } from './config-merger';
export { ESLintConfigBuilder, PrettierConfigBuilder, StylelintConfigBuilder } from './config-builder';
export { validateESLintConfig, validatePrettierConfig, validateStylelintConfig, type ValidationResult, validateESLintRule } from './validators';
