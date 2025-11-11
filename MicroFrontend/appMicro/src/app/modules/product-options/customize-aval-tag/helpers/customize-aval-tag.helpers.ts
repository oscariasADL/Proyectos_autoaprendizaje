import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  AVAL_KEY_PATTERN_CUSTOM_ACCENTS,
  AVAL_KEY_PATTERN_CUSTOM_CHARS,
  AVAL_KEY_PATTERN_CUSTOM_LENGTH
} from '@commons/constants/regex.constants';

export function customizeAvalTagAccentCharactersPattern(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors => {
    if (!control) return null;
    const value = control.value?.toUpperCase();
    if (AVAL_KEY_PATTERN_CUSTOM_ACCENTS.test(value)) {
      return {
        customizeAvalTagAccentCharacters: true
      };
    }
  };
}

export function customizeAvalTagSpecialCharactersPattern(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors => {
    if (!control) return null;
    const value = control.value?.toUpperCase();
    if (!AVAL_KEY_PATTERN_CUSTOM_CHARS.test(value)) {
      return {
        customizeAvalTagSpecialCharacters: true
      };
    }
  };
}

export function customizeAvalTagLengthPattern(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors => {
    if (!control) return null;
    const value = control.value?.toUpperCase();
    if (!AVAL_KEY_PATTERN_CUSTOM_LENGTH.test(value)) {
      return {
        customizeAvalTagLength: true
      };
    }
  };
}
