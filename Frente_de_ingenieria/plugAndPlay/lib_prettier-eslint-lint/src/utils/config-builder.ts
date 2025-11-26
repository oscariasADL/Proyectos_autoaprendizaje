import type { ESLintConfig, ConfigOptions, FrameworkType } from '../types/eslint.types';
import type { PrettierConfig, PrettierOptions } from '../types/prettier.types';
import type { StylelintConfig, StylelintOptions } from '../types/stylelint.types';
import { mergeESLintConfigs } from './config-merger';

/**
 * Builder pattern para crear configuraciones ESLint
 */
export class ESLintConfigBuilder {
  private config: Partial<ESLintConfig> = {};
  private framework: FrameworkType = 'base';
  private useTypeScript = false;
  private customRules: ESLintConfig['rules'] = {};
  
  withFramework(framework: FrameworkType): this {
    this.framework = framework;
    return this;
  }
  
  withTypeScript(enabled = true): this {
    this.useTypeScript = enabled;
    return this;
  }
  
  withCustomRules(rules: ESLintConfig['rules']): this {
    this.customRules = { ...this.customRules, ...rules };
    return this;
  }
  
  withEnvironment(env: Record<string, boolean>): this {
    this.config.env = { ...this.config.env, ...env };
    return this;
  }
  
  withPlugins(plugins: string[]): this {
    this.config.plugins = [...(this.config.plugins || []), ...plugins];
    return this;
  }
  
  withExtends(extends_: string[]): this {
    this.config.extends = [...(this.config.extends || []), ...extends_];
    return this;
  }
  
  build(): ESLintConfig {
    const baseConfig = this.getBaseConfig();
    const frameworkConfig = this.getFrameworkConfig();
    const typeScriptConfig = this.useTypeScript ? this.getTypeScriptConfig() : {};
    
    return mergeESLintConfigs(
      baseConfig,
      frameworkConfig,
      typeScriptConfig,
      this.customRules ? { rules: this.customRules } : {},
      this.config
    );
  }
  
  private getBaseConfig(): ESLintConfig {
    return {
      env: {
        browser: true,
        es2021: true,
        node: true
      },
      extends: [
        'eslint:recommended'
      ],
      plugins: ['import'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        'eqeqeq': ['error', 'always', { null: 'ignore' }],
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'error',
        'curly': ['error', 'all'],
        'dot-notation': 'error',
        'prefer-const': ['error', { destructuring: 'all' }],
        'no-var': 'error',
        'object-shorthand': ['error', 'always'],
        'arrow-body-style': ['error', 'as-needed'],
        'no-duplicate-imports': 'error'
      }
    };
  }
  
  private getFrameworkConfig(): ESLintConfig {
    switch (this.framework) {
      case 'react':
        return this.getReactConfig();
      case 'angular':
        return this.getAngularConfig();
      case 'node':
        return this.getNodeConfig();
      default:
        return {};
    }
  }
  
  private getReactConfig(): ESLintConfig {
    return {
      env: {
        browser: true
      },
      plugins: ['react', 'react-hooks', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended'
      ],
      settings: {
        react: {
          version: 'detect'
        }
      },
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'error',
        'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
      }
    };
  }
  
  private getAngularConfig(): ESLintConfig {
    return {
      overrides: [
        {
          files: ['*.ts'],
          extends: [
            'plugin:@angular-eslint/recommended',
            'plugin:@angular-eslint/template/process-inline-templates'
          ],
          rules: {
            '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component'] }],
            '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive'] }],
            '@angular-eslint/no-empty-lifecycle-method': 'warn',
            '@angular-eslint/prefer-on-push-component-change-detection': 'warn'
          }
        },
        {
          files: ['*.html'],
          extends: ['plugin:@angular-eslint/template/recommended'],
          rules: {
            '@angular-eslint/template/click-events-have-key-events': 'warn',
            '@angular-eslint/template/interactive-supports-focus': 'warn'
          }
        }
      ]
    };
  }
  
  private getNodeConfig(): ESLintConfig {
    return {
      env: {
        node: true,
        browser: false
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
      rules: {
        'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
        'node/no-missing-import': 'off'
      }
    };
  }
  
  private getTypeScriptConfig(): ESLintConfig {
    return {
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd()
      },
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn'
      }
    };
  }
}

/**
 * Builder pattern para crear configuraciones Prettier
 */
export class PrettierConfigBuilder {
  private config: PrettierConfig = {};
  
  withPrintWidth(width: number): this {
    this.config.printWidth = width;
    return this;
  }
  
  withTabWidth(width: number): this {
    this.config.tabWidth = width;
    return this;
  }
  
  withSingleQuote(enabled = true): this {
    this.config.singleQuote = enabled;
    return this;
  }
  
  withTrailingComma(option: 'none' | 'es5' | 'all'): this {
    this.config.trailingComma = option;
    return this;
  }
  
  withOverrides(overrides: PrettierConfig['overrides']): this {
    this.config.overrides = [...(this.config.overrides || []), ...(overrides || [])];
    return this;
  }
  
  build(): PrettierConfig {
    return {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      quoteProps: 'as-needed',
      jsxSingleQuote: false,
      trailingComma: 'all',
      bracketSpacing: true,
      bracketSameLine: false,
      arrowParens: 'always',
      proseWrap: 'preserve',
      endOfLine: 'lf',
      ...this.config
    };
  }
}

/**
 * Builder pattern para crear configuraciones Stylelint
 */
export class StylelintConfigBuilder {
  private config: StylelintConfig = {};
  
  withScss(enabled = true): this {
    if (enabled) {
      this.config.extends = [...(this.config.extends || []), 'stylelint-config-standard-scss'];
      this.config.plugins = [...(this.config.plugins || []), 'stylelint-scss'];
    }
    return this;
  }
  
  withCustomRules(rules: StylelintConfig['rules']): this {
    this.config.rules = { ...this.config.rules, ...rules };
    return this;
  }
  
  build(): StylelintConfig {
    return {
      extends: ['stylelint-config-standard'],
      rules: {
        'color-hex-length': 'short',
        'color-no-invalid-hex': true,
        'block-no-empty': true,
        'declaration-block-no-duplicate-properties': true,
        'selector-max-id': 0,
        'selector-class-pattern': [
          '^[a-z0-9\\-]+$',
          {
            message: 'Las clases deben usar kebab-case en minúsculas'
          }
        ],
        'no-descending-specificity': null
      },
      ...this.config
    };
  }
}
