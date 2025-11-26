/**
 * Tipos base para configuraciones ESLint
 */
export interface ESLintRule {
  [ruleName: string]: 'off' | 'warn' | 'error' | [string, any] | [string, any, any];
}

export interface ESLintConfig {
  root?: boolean;
  env?: Record<string, boolean>;
  extends?: string[];
  plugins?: string[];
  parser?: string;
  parserOptions?: {
    ecmaVersion?: string | number;
    sourceType?: 'script' | 'module';
    ecmaFeatures?: {
      jsx?: boolean;
      globalReturn?: boolean;
      impliedStrict?: boolean;
    };
    project?: string | string[];
    tsconfigRootDir?: string;
  };
  settings?: Record<string, any>;
  rules?: ESLintRule;
  overrides?: Array<{
    files: string | string[];
    excludedFiles?: string | string[];
    rules?: ESLintRule;
    env?: Record<string, boolean>;
    extends?: string[];
    plugins?: string[];
    parser?: string;
    parserOptions?: ESLintConfig['parserOptions'];
  }>;
  ignorePatterns?: string[];
}

/**
 * Opciones para configuraciones personalizables
 */
export interface ConfigOptions {
  strict?: boolean;
  framework?: 'react' | 'angular' | 'vue' | 'node';
  typescript?: boolean;
  customRules?: ESLintRule;
  projectPath?: string;
}

/**
 * Framework específicos
 */
export type FrameworkType = 'react' | 'angular' | 'vue' | 'node' | 'base';

export interface ReactConfigOptions extends ConfigOptions {
  framework: 'react';
  reactVersion?: string;
  jsxRuntime?: 'classic' | 'automatic';
}

export interface AngularConfigOptions extends ConfigOptions {
  framework: 'angular';
  angularVersion?: string;
}

export interface NodeConfigOptions extends ConfigOptions {
  framework: 'node';
  nodeVersion?: string;
}
