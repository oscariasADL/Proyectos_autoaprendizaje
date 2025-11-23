/**
 * BOCC
 */
export const INPUT_MODE = {
  NONE: 'none',
  TEXT: 'text',
  DECIMAL: 'decimal',
  NUMERIC: 'numeric',
  TEL: 'tel',
  EMAIL: 'email',
  NUMERICDATE: 'numericdate',
  MONTHYEAR: 'monthyear'
} as const;

export const INPUT_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  PASSWORD: 'password',
  EMAIL: 'email',
  PERCENT: 'percent',
  CURRENCY: 'currency',
  TEL: 'tel',
  CHIP: 'chip',
  NUMERICDATE: 'numericdate',
  MONTHYEAR: 'monthyear',
  DOCUMENT: 'document'
} as const;

export interface Globals {
  class?: string;
  id?: string;
  hidden?: boolean;
  style?: {
    [key: string]: string | undefined;
  };
  tabindex?: number;
  title?: string;
  inputmode?: (typeof INPUT_MODE)[keyof typeof INPUT_MODE];
}

export interface Generic extends Globals {
  autofocus?: string;
  disabled?: boolean;
  form?: string;
  name?: string;
}

export interface Option extends Globals {
  disabled?: string;
  selected?: string;
  value?: string;
}

export interface Query {
  value?: string;
  by?: string;
}
export interface Button extends Generic {
  type?: string;
  value?: string;
}
interface BdoButton {
  id?: string;
  ngClass?: Array<BdoButtonStandardType>;
  disabled?: boolean | (() => boolean);
  hidden?: boolean | (() => boolean);
  typeButton?: BdoButtonType;
  onClick: () => void;
}

export interface BdoButtonStandard
  extends Omit<Button, 'disabled' | 'hidden'>,
    Omit<BdoButton, 'disabled' | 'hidden'> {
  prefixIcon: string;
  suffixIcon: string;
  disabled?: boolean;
  hidden?: boolean;
  label?: string;
  icon?: string;
  loader?: boolean | (() => boolean);
}

export type ButtonType = 'flat' | 'raised' | 'outline';

export type BdoButtonType =
  | 'primary'
  | 'primaryWhite'
  | 'secondary'
  | 'secondaryWhite'
  | 'tertiary'
  | 'tertiaryWhithe'
  | 'tertiaryVariable'
  | 'link'
  | 'primaryDanger'
  | 'secondaryDanger'
  | 'tertiaryDanger'
  | 'tertiaryDangerVariable'
  | 'raised'
  | 'flat'
  | 'outline';

type BdoButtonStandardType =
  | 'bdo-button--raised'
  | 'bdo-button--flat'
  | 'bdo-button--outline';
