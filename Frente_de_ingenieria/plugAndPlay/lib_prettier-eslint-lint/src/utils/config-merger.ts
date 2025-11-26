import type { ESLintConfig, ESLintRule } from '../types/eslint.types';

/**
 * Fusiona múltiples configuraciones ESLint de forma inteligente
 */
export function mergeESLintConfigs(...configs: Partial<ESLintConfig>[]): ESLintConfig {
  const merged: ESLintConfig = {};
  
  for (const config of configs) {
    if (config.root !== undefined) merged.root = config.root;
    
    if (config.env) {
      merged.env = { ...merged.env, ...config.env };
    }
    
    if (config.extends) {
      merged.extends = [...(merged.extends || []), ...config.extends];
    }
    
    if (config.plugins) {
      merged.plugins = [...(merged.plugins || []), ...config.plugins];
    }
    
    if (config.parser) merged.parser = config.parser;
    
    if (config.parserOptions) {
      merged.parserOptions = { ...merged.parserOptions, ...config.parserOptions };
    }
    
    if (config.settings) {
      merged.settings = { ...merged.settings, ...config.settings };
    }
    
    if (config.rules) {
      merged.rules = { ...merged.rules, ...config.rules };
    }
    
    if (config.overrides) {
      merged.overrides = [...(merged.overrides || []), ...config.overrides];
    }
    
    if (config.ignorePatterns) {
      merged.ignorePatterns = [...(merged.ignorePatterns || []), ...config.ignorePatterns];
    }
  }
  
  return merged;
}



/**
 * Convierte reglas de ESLint a formato normalizado
 */
export function normalizeESLintRules(rules: ESLintRule): ESLintRule {
  const normalized: ESLintRule = {};
  
  for (const [key, value] of Object.entries(rules)) {
    if (typeof value === 'string') {
      normalized[key] = value;
    } else if (Array.isArray(value)) {
      normalized[key] = value;
    } else {
      normalized[key] = value;
    }
  }
  
  return normalized;
}
