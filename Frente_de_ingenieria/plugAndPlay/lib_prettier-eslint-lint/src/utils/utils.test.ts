import { describe, it, expect } from 'vitest';
import { mergeESLintConfigs } from './config-merger';
import { validateESLintConfig } from './validators';
import { ESLintConfigBuilder, PrettierConfigBuilder, StylelintConfigBuilder } from './config-builder';
import type { ESLintConfig } from '../types/eslint.types';

describe('Config Merger', () => {
  describe('mergeESLintConfigs', () => {
    it('should merge multiple configs correctly', () => {
      const config1: Partial<ESLintConfig> = {
        env: { browser: true },
        extends: ['eslint:recommended'],
        rules: { 'no-console': 'warn' }
      };

      const config2: Partial<ESLintConfig> = {
        env: { node: true },
        extends: ['@typescript-eslint/recommended'],
        rules: { 'no-unused-vars': 'error' }
      };

      const merged = mergeESLintConfigs(config1, config2);

      expect(merged.env).toEqual({ browser: true, node: true });
      expect(merged.extends).toEqual(['eslint:recommended', '@typescript-eslint/recommended']);
      expect(merged.rules).toEqual({
        'no-console': 'warn',
        'no-unused-vars': 'error'
      });
    });

    it('should handle empty configs', () => {
      const result = mergeESLintConfigs({}, {});
      expect(result).toEqual({});
    });
  });

  describe('validateESLintConfig', () => {
    it('should validate a correct config', () => {
      const config: ESLintConfig = {
        extends: ['eslint:recommended'],
        rules: { 'no-console': 'warn' }
      };

      const errors = validateESLintConfig(config);
      expect(errors).toEqual([]);
    });

    it('should detect TypeScript parser requirement', () => {
      const config: ESLintConfig = {
        parserOptions: {
          project: ['./tsconfig.json']
        }
      };

      const errors = validateESLintConfig(config);
      expect(errors).toContain('project option requires @typescript-eslint/parser');
    });
  });
});

describe('Config Builders', () => {
  describe('ESLintConfigBuilder', () => {
    it('should build a basic config', () => {
      const config = new ESLintConfigBuilder()
        .withFramework('base')
        .build();

      expect(config.env?.browser).toBe(true);
      expect(config.extends).toContain('eslint:recommended');
      expect(config.plugins).toContain('import');
    });

    it('should build React config', () => {
      const config = new ESLintConfigBuilder()
        .withFramework('react')
        .build();

      expect(config.plugins).toContain('react');
      expect(config.plugins).toContain('react-hooks');
      expect(config.settings?.react?.version).toBe('detect');
    });

    it('should build TypeScript config', () => {
      const config = new ESLintConfigBuilder()
        .withTypeScript(true)
        .build();

      expect(config.parser).toBe('@typescript-eslint/parser');
      expect(config.plugins).toContain('@typescript-eslint');
    });

    it('should handle custom rules', () => {
      const customRules = { 'no-console': 'error' as const };
      const config = new ESLintConfigBuilder()
        .withCustomRules(customRules)
        .build();

      expect(config.rules?.['no-console']).toBe('error');
    });
  });

  describe('PrettierConfigBuilder', () => {
    it('should build with defaults', () => {
      const config = new PrettierConfigBuilder().build();

      expect(config.printWidth).toBe(100);
      expect(config.singleQuote).toBe(true);
      expect(config.trailingComma).toBe('all');
    });

    it('should handle custom options', () => {
      const config = new PrettierConfigBuilder()
        .withPrintWidth(120)
        .withSingleQuote(false)
        .build();

      expect(config.printWidth).toBe(120);
      expect(config.singleQuote).toBe(false);
    });
  });

  describe('StylelintConfigBuilder', () => {
    it('should build base config', () => {
      const config = new StylelintConfigBuilder().build();

      expect(config.extends).toContain('stylelint-config-standard');
      expect(config.rules?.['color-hex-length']).toBe('short');
    });

    it('should build SCSS config', () => {
      const config = new StylelintConfigBuilder()
        .withScss(true)
        .build();

      expect(config.extends).toContain('stylelint-config-standard-scss');
      expect(config.plugins).toContain('stylelint-scss');
    });
  });
});
