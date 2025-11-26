/**
 * Tipos para configuraciones Stylelint
 */
export interface StylelintRule {
  [ruleName: string]: null | boolean | string | number | Array<string | number> | Record<string, any>;
}

export interface StylelintConfig {
  extends?: string | string[];
  plugins?: string[];
  rules?: StylelintRule;
  ignoreFiles?: string | string[];
  overrides?: Array<{
    files: string | string[];
    rules?: StylelintRule;
    extends?: string | string[];
    plugins?: string[];
  }>;
  customSyntax?: string;
  defaultSeverity?: 'error' | 'warning';
}

export interface StylelintOptions extends StylelintConfig {
  scss?: boolean;
  customRules?: StylelintRule;
}
