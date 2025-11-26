import type { ESLintConfig } from '../types/eslint.types';
import type { PrettierConfig } from '../types/prettier.types';
import type { StylelintConfig } from '../types/stylelint.types';

/**
 * Valida una configuración ESLint
 */
export function validateESLintConfig(config: ESLintConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar extends
  if (config.extends && Array.isArray(config.extends)) {
    if (config.extends.length === 0) {
      warnings.push('extends array is empty');
    }
    
    // Verificar configuraciones que requieren TypeScript
    const tsConfigs = config.extends.filter(ext => ext.includes('@typescript-eslint'));
    if (tsConfigs.length > 0 && !config.parser?.includes('@typescript-eslint')) {
      errors.push('TypeScript ESLint configs require @typescript-eslint/parser');
    }
  }

  // Validar parser options para TypeScript
  if (config.parserOptions?.project && !config.parser?.includes('@typescript-eslint')) {
    errors.push('parserOptions.project requires @typescript-eslint/parser');
  }

  // Validar plugins
  if (config.plugins) {
    const duplicatePlugins = findDuplicates(config.plugins);
    if (duplicatePlugins.length > 0) {
      warnings.push(`Duplicate plugins found: ${duplicatePlugins.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Valida una configuración Prettier
 */
export function validatePrettierConfig(config: PrettierConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar printWidth
  if (config.printWidth !== undefined) {
    if (config.printWidth < 40 || config.printWidth > 200) {
      warnings.push('printWidth should be between 40 and 200');
    }
  }

  // Validar tabWidth
  if (config.tabWidth !== undefined) {
    if (config.tabWidth < 1 || config.tabWidth > 8) {
      warnings.push('tabWidth should be between 1 and 8');
    }
  }

  // Validar overrides
  if (config.overrides) {
    for (const override of config.overrides) {
      if (!override.files || (Array.isArray(override.files) && override.files.length === 0)) {
        errors.push('Override must have files pattern');
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Valida una configuración Stylelint
 */
export function validateStylelintConfig(config: StylelintConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validar extends
  if (config.extends && Array.isArray(config.extends)) {
    const duplicateExtends = findDuplicates(config.extends);
    if (duplicateExtends.length > 0) {
      warnings.push(`Duplicate extends found: ${duplicateExtends.join(', ')}`);
    }
  }

  // Validar plugins
  if (config.plugins) {
    const duplicatePlugins = findDuplicates(config.plugins);
    if (duplicatePlugins.length > 0) {
      warnings.push(`Duplicate plugins found: ${duplicatePlugins.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Resultado de validación
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Encuentra elementos duplicados en un array
 */
function findDuplicates<T>(arr: T[]): T[] {
  const seen = new Set<T>();
  const duplicates = new Set<T>();
  
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  
  return Array.from(duplicates);
}

/**
 * Valida si una regla ESLint es válida
 */
export function validateESLintRule(ruleName: string, ruleValue: any): boolean {
  // Validaciones básicas
  if (typeof ruleName !== 'string' || ruleName.length === 0) {
    return false;
  }

  // Valores permitidos para reglas
  const validValues = ['off', 'warn', 'error', 0, 1, 2];
  
  if (validValues.includes(ruleValue)) {
    return true;
  }

  if (Array.isArray(ruleValue) && ruleValue.length > 0) {
    return validValues.includes(ruleValue[0]);
  }

  return false;
}
