export enum SIZE_BUTTON {
  REGULAR = 'regular',
  SMALL = 'small',
  LARGE = 'large',
  X_SMALL = 'x-small'
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
  TEXT_PRIMARY = 'text-primary',
  TEXT_SECONDARY = 'text-secondary',
  TEXT_HYPERLINK = 'text-hiperlink'
}

export enum DirectionButtons {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}
export type VariantButton = `${VARIANT_BUTTON}`;

export enum WIDTH_MODE {
  DEFAULT = 'default',
  FULL = 'full'
}
export type WidthMode = `${WIDTH_MODE}`;
