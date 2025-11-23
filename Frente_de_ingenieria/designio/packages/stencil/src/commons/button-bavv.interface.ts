/**
 * BAVV
 */
export enum SIZE_BUTTON {
  REGULAR = 'regular',
  SMALL = 'small'
}
export type SizeButton = `${SIZE_BUTTON}`;

export enum TYPE_BUTTON {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset'
}
export type TypeButton = `${TYPE_BUTTON}`;

export enum VARIANT_BUTTON {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  BORDERLESS = 'borderless'
}
export type VariantButton = `${VARIANT_BUTTON}`;

export enum WIDTH_MODE {
  DEFAULT = 'default',
  AUTO = 'auto',
  FULL = 'full'
}
export type WidthMode = `${WIDTH_MODE}`;
