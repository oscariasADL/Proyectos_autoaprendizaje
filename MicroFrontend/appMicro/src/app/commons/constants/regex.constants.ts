export const ALPHABETIC_PATTERN = /^[A-Za-z\s]+$/;

export const ALPHANUMERIC_PATTERN = /^[A-Za-z0-9\s]+$/;

export const HEXADECIMAL_PATTERN = /^[0-9A-Fa-f]+$/;

export const AVAL_KEY_PATTERN = /^@[A-Z\d]{4,14}$/;
export const AVAL_KEY_PATTERN_LIGHT = /^@?[A-Z\d]{4,14}$/;

export const AVAL_KEY_PATTERN_CUSTOM_ACCENTS = /.*[ÁÉÍÓÚÜÑ\s].*/;
export const AVAL_KEY_PATTERN_CUSTOM_CHARS = /^[A-Z\d]+$/;
export const AVAL_KEY_PATTERN_CUSTOM_LENGTH = /^.{5,15}$/;
