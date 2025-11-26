import type { ESLintConfig } from '../types/eslint.types';
import type { PrettierConfig } from '../types/prettier.types';
import type { StylelintConfig } from '../types/stylelint.types';
import { ESLintConfigBuilder, PrettierConfigBuilder, StylelintConfigBuilder } from '../utils/config-builder';

/**
 * Preset completo para proyectos React con TypeScript
 */
export function createReactPreset(options?: {
  typescript?: boolean;
  strict?: boolean;
  scss?: boolean;
}): {
  eslint: ESLintConfig;
  prettier: PrettierConfig;
  stylelint: StylelintConfig;
} {
  const { typescript = true, strict = false, scss = false } = options || {};

  // ESLint configuration
  let eslintBuilder = new ESLintConfigBuilder()
    .withFramework('react')
    .withEnvironment({ browser: true, es2021: true });

  if (typescript) {
    eslintBuilder = eslintBuilder.withTypeScript(true);
  }

  if (strict) {
    eslintBuilder = eslintBuilder.withCustomRules({
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      '@typescript-eslint/strict-boolean-expressions': typescript ? 'error' : 'off'
    });
  }

  // Prettier configuration
  const prettierBuilder = new PrettierConfigBuilder()
    .withSingleQuote(true)
    .withTrailingComma('all')
    .withOverrides([
      {
        files: ['*.tsx', '*.jsx'],
        options: {
          jsxSingleQuote: false,
          bracketSameLine: false
        }
      }
    ]);

  // Stylelint configuration
  let stylelintBuilder = new StylelintConfigBuilder();
  if (scss) {
    stylelintBuilder = stylelintBuilder.withScss(true);
  }

  return {
    eslint: eslintBuilder.build(),
    prettier: prettierBuilder.build(),
    stylelint: stylelintBuilder.build()
  };
}

/**
 * Preset completo para proyectos Angular con TypeScript
 */
export function createAngularPreset(options?: {
  strict?: boolean;
  scss?: boolean;
}): {
  eslint: ESLintConfig;
  prettier: PrettierConfig;
  stylelint: StylelintConfig;
} {
  const { strict = false, scss = true } = options || {};

  // ESLint configuration
  let eslintBuilder = new ESLintConfigBuilder()
    .withFramework('angular')
    .withTypeScript(true)
    .withEnvironment({ browser: true, es2021: true });

  if (strict) {
    eslintBuilder = eslintBuilder.withCustomRules({
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': 'warn'
    });
  }

  // Prettier configuration
  const prettierBuilder = new PrettierConfigBuilder()
    .withSingleQuote(true)
    .withTrailingComma('all')
    .withOverrides([
      {
        files: ['*.component.html', '*.template.html'],
        options: {
          singleAttributePerLine: true,
          htmlWhitespaceSensitivity: 'strict'
        }
      },
      {
        files: ['*.component.ts'],
        options: {
          printWidth: 120 // Angular components pueden ser más largos
        }
      }
    ]);

  // Stylelint configuration
  let stylelintBuilder = new StylelintConfigBuilder();
  if (scss) {
    stylelintBuilder = stylelintBuilder.withScss(true);
  }

  stylelintBuilder = stylelintBuilder.withCustomRules({
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep'] // Angular specific
      }
    ]
  });

  return {
    eslint: eslintBuilder.build(),
    prettier: prettierBuilder.build(),
    stylelint: stylelintBuilder.build()
  };
}

/**
 * Preset completo para proyectos Node.js
 */
export function createNodePreset(options?: {
  typescript?: boolean;
  strict?: boolean;
}): {
  eslint: ESLintConfig;
  prettier: PrettierConfig;
} {
  const { typescript = true, strict = false } = options || {};

  // ESLint configuration
  let eslintBuilder = new ESLintConfigBuilder()
    .withFramework('node')
    .withEnvironment({ node: true, browser: false });

  if (typescript) {
    eslintBuilder = eslintBuilder.withTypeScript(true);
  }

  if (strict) {
    eslintBuilder = eslintBuilder.withCustomRules({
      'no-process-exit': 'error',
      'no-sync': 'error',
      '@typescript-eslint/strict-boolean-expressions': typescript ? 'error' : 'off'
    });
  }

  // Prettier configuration
  const prettierBuilder = new PrettierConfigBuilder()
    .withSingleQuote(true)
    .withTrailingComma('all');

  return {
    eslint: eslintBuilder.build(),
    prettier: prettierBuilder.build()
  };
}

/**
 * Preset completo para bibliotecas/librerías
 */
export function createLibraryPreset(options?: {
  typescript?: boolean;
  framework?: 'react' | 'angular' | 'vue' | null;
  strict?: boolean;
}): {
  eslint: ESLintConfig;
  prettier: PrettierConfig;
} {
  const { typescript = true, framework = null, strict = true } = options || {};

  // ESLint configuration for libraries (más estricto por defecto)
  let eslintBuilder = new ESLintConfigBuilder()
    .withEnvironment({ browser: true, node: true })
    .withCustomRules({
      'no-console': 'error', // Libraries shouldn't have console.log
      '@typescript-eslint/explicit-function-return-type': typescript ? 'warn' : 'off',
      '@typescript-eslint/explicit-module-boundary-types': typescript ? 'warn' : 'off'
    });

  if (framework) {
    eslintBuilder = eslintBuilder.withFramework(framework);
  }

  if (typescript) {
    eslintBuilder = eslintBuilder.withTypeScript(true);
  }

  if (strict) {
    eslintBuilder = eslintBuilder.withCustomRules({
      '@typescript-eslint/strict-boolean-expressions': typescript ? 'error' : 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': typescript ? 'warn' : 'off',
      'prefer-const': 'error',
      'no-var': 'error'
    });
  }

  // Prettier configuration for libraries
  const prettierBuilder = new PrettierConfigBuilder()
    .withSingleQuote(true)
    .withTrailingComma('all')
    .withPrintWidth(100);

  return {
    eslint: eslintBuilder.build(),
    prettier: prettierBuilder.build()
  };
}
