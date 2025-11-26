import { describe, it, expect } from 'vitest';
import { createReactPreset, createAngularPreset, createNodePreset, createLibraryPreset } from './index';

describe('Configuration Presets', () => {
  describe('createReactPreset', () => {
    it('should create React preset with TypeScript by default', () => {
      const preset = createReactPreset();

      expect(preset.eslint.parser).toBe('@typescript-eslint/parser');
      expect(preset.eslint.plugins).toContain('react');
      expect(preset.eslint.plugins).toContain('@typescript-eslint');
      expect(preset.prettier.singleQuote).toBe(true);
      expect(preset.stylelint.extends).toContain('stylelint-config-standard');
    });

    it('should create React preset without TypeScript', () => {
      const preset = createReactPreset({ typescript: false });

      expect(preset.eslint.parser).not.toBe('@typescript-eslint/parser');
      expect(preset.eslint.plugins).toContain('react');
      expect(preset.eslint.plugins).not.toContain('@typescript-eslint');
    });

    it('should create React preset with SCSS', () => {
      const preset = createReactPreset({ scss: true });

      expect(preset.stylelint.extends).toContain('stylelint-config-standard-scss');
      expect(preset.stylelint.plugins).toContain('stylelint-scss');
    });

    it('should create strict React preset', () => {
      const preset = createReactPreset({ strict: true });

      expect(preset.eslint.rules?.['react/jsx-no-leaked-render']).toBe('error');
      expect(preset.eslint.rules?.['@typescript-eslint/strict-boolean-expressions']).toBe('error');
    });
  });

  describe('createAngularPreset', () => {
    it('should create Angular preset with TypeScript and SCSS by default', () => {
      const preset = createAngularPreset();

      expect(preset.eslint.parser).toBe('@typescript-eslint/parser');
      expect(preset.stylelint.extends).toContain('stylelint-config-standard-scss');
      expect(preset.prettier.singleQuote).toBe(true);
    });

    it('should create Angular preset without SCSS', () => {
      const preset = createAngularPreset({ scss: false });

      expect(preset.stylelint.extends).not.toContain('stylelint-config-standard-scss');
      expect(preset.stylelint.plugins).not.toContain('stylelint-scss');
    });

    it('should have Angular-specific Stylelint rules', () => {
      const preset = createAngularPreset();

      expect(preset.stylelint.rules?.['selector-pseudo-element-no-unknown']).toBeDefined();
    });
  });

  describe('createNodePreset', () => {
    it('should create Node preset with TypeScript by default', () => {
      const preset = createNodePreset();

      expect(preset.eslint.env?.node).toBe(true);
      expect(preset.eslint.env?.browser).toBe(false);
      expect(preset.eslint.plugins).toContain('node');
      expect(preset.prettier.singleQuote).toBe(true);
    });

    it('should create Node preset without TypeScript', () => {
      const preset = createNodePreset({ typescript: false });

      expect(preset.eslint.parser).not.toBe('@typescript-eslint/parser');
      expect(preset.eslint.plugins).not.toContain('@typescript-eslint');
    });

    it('should create strict Node preset', () => {
      const preset = createNodePreset({ strict: true });

      expect(preset.eslint.rules?.['no-process-exit']).toBe('error');
      expect(preset.eslint.rules?.['no-sync']).toBe('error');
    });
  });

  describe('createLibraryPreset', () => {
    it('should create library preset with strict rules by default', () => {
      const preset = createLibraryPreset();

      expect(preset.eslint.rules?.['no-console']).toBe('error');
      expect(preset.eslint.rules?.['@typescript-eslint/explicit-function-return-type']).toBe('warn');
      expect(preset.prettier.printWidth).toBe(100);
    });

    it('should create library preset for React', () => {
      const preset = createLibraryPreset({ framework: 'react' });

      expect(preset.eslint.plugins).toContain('react');
    });

    it('should create library preset for Angular', () => {
      const preset = createLibraryPreset({ framework: 'angular' });

      const hasAngularOverrides = preset.eslint.overrides?.some(
        override => override.files?.includes('*.ts')
      );
      expect(hasAngularOverrides).toBe(true);
    });

    it('should create non-strict library preset', () => {
      const preset = createLibraryPreset({ strict: false });

      expect(preset.eslint.rules?.['@typescript-eslint/strict-boolean-expressions']).toBe('off');
    });
  });
});
