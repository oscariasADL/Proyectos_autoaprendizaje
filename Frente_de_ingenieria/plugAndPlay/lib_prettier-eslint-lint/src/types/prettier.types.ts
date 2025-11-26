/**
 * Tipos para configuraciones Prettier
 */
export interface PrettierConfig {
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
  semi?: boolean;
  singleQuote?: boolean;
  quoteProps?: 'as-needed' | 'consistent' | 'preserve';
  jsxSingleQuote?: boolean;
  trailingComma?: 'none' | 'es5' | 'all';
  bracketSpacing?: boolean;
  bracketSameLine?: boolean;
  arrowParens?: 'always' | 'avoid';
  proseWrap?: 'always' | 'never' | 'preserve';
  htmlWhitespaceSensitivity?: 'css' | 'strict' | 'ignore';
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';
  embeddedLanguageFormatting?: 'auto' | 'off';
  singleAttributePerLine?: boolean;
  overrides?: Array<{
    files: string | string[];
    excludeFiles?: string | string[];
    options?: Omit<PrettierConfig, 'overrides'>;
  }>;
}

export interface PrettierOptions extends PrettierConfig {
  customOverrides?: PrettierConfig['overrides'];
}
