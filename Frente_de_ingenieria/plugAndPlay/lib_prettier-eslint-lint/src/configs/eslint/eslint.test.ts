import { describe, it, expect } from 'vitest';
import baseConfig from './base';
import typeScriptConfig from './typescript';
import reactConfig from './react';
import angularConfig from './angular';
import nodeConfig from './node';

describe('ESLint Configurations', () => {
  describe('Base Configuration', () => {
    it('should have required properties', () => {
      expect(baseConfig).toBeDefined();
      expect(baseConfig.env).toBeDefined();
      expect(baseConfig.extends).toContain('eslint:recommended');
      expect(baseConfig.plugins).toContain('import');
      expect(baseConfig.rules).toBeDefined();
    });

    it('should have proper environment settings', () => {
      expect(baseConfig.env?.browser).toBe(true);
      expect(baseConfig.env?.es2021).toBe(true);
      expect(baseConfig.env?.node).toBe(true);
    });

    it('should have import plugin configuration', () => {
      expect(baseConfig.rules?.['import/no-unresolved']).toBe('error');
      expect(baseConfig.rules?.['import/no-duplicates']).toBe('error');
    });
  });

  describe('TypeScript Configuration', () => {
    it('should have TypeScript parser and plugin', () => {
      expect(typeScriptConfig.parser).toBe('@typescript-eslint/parser');
      expect(typeScriptConfig.plugins).toContain('@typescript-eslint');
    });

    it('should extend TypeScript recommended configs', () => {
      expect(typeScriptConfig.extends).toContain('plugin:@typescript-eslint/recommended');
      expect(typeScriptConfig.extends).toContain('plugin:@typescript-eslint/recommended-requiring-type-checking');
    });

    it('should have proper TypeScript rules', () => {
      expect(typeScriptConfig.rules?.['@typescript-eslint/no-explicit-any']).toEqual(['warn', { ignoreRestArgs: true }]);
      expect(typeScriptConfig.rules?.['@typescript-eslint/consistent-type-imports']).toEqual(['warn', { prefer: 'type-imports' }]);
    });

    it('should have test file overrides', () => {
      const testOverride = typeScriptConfig.overrides?.find(
        override => override.files.includes('*.test.ts') || override.files.includes('*.spec.ts')
      );
      expect(testOverride).toBeDefined();
      expect(testOverride?.rules?.['@typescript-eslint/no-explicit-any']).toBe('off');
    });
  });

  describe('React Configuration', () => {
    it('should have React plugins', () => {
      expect(reactConfig.plugins).toContain('react');
      expect(reactConfig.plugins).toContain('react-hooks');
      expect(reactConfig.plugins).toContain('jsx-a11y');
    });

    it('should have proper React settings', () => {
      expect(reactConfig.settings?.react?.version).toBe('detect');
    });

    it('should have JSX parser options', () => {
      expect(reactConfig.parserOptions?.ecmaFeatures?.jsx).toBe(true);
    });

    it('should have proper React rules', () => {
      expect(reactConfig.rules?.['react/react-in-jsx-scope']).toBe('off');
      expect(reactConfig.rules?.['react-hooks/rules-of-hooks']).toBe('error');
    });
  });

  describe('Angular Configuration', () => {
    it('should have Angular overrides for TS files', () => {
      const tsOverride = angularConfig.overrides?.find(
        override => override.files?.includes('*.ts')
      );
      expect(tsOverride).toBeDefined();
      expect(tsOverride?.extends).toContain('plugin:@angular-eslint/recommended');
    });

    it('should have Angular overrides for HTML files', () => {
      const htmlOverride = angularConfig.overrides?.find(
        override => override.files?.includes('*.html')
      );
      expect(htmlOverride).toBeDefined();
      expect(htmlOverride?.parser).toBe('@angular-eslint/template-parser');
    });
  });

  describe('Node Configuration', () => {
    it('should have Node environment', () => {
      expect(nodeConfig.env?.node).toBe(true);
      expect(nodeConfig.env?.browser).toBe(false);
    });

    it('should have Node plugin', () => {
      expect(nodeConfig.plugins).toContain('node');
    });

    it('should extend Node recommended config', () => {
      expect(nodeConfig.extends).toContain('plugin:node/recommended');
    });
  });
});
