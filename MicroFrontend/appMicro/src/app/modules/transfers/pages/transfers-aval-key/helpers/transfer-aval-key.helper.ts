import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { AVAL_KEY_PATTERN_LIGHT } from '@commons/constants/regex.constants';

export function transfersAvalKeyPatternValidator(): ValidatorFn {
  return (control: FormControl<string>): ValidationErrors => {
    if (control) {
      const value = control.value;

      if (value && !AVAL_KEY_PATTERN_LIGHT.test(value)) {
        return {
          transferAvalKeyValuePattern: false
        };
      }
    }
    return null;
  };
}

export function transfersAvalKeyValidator(): ValidatorFn {
  return (control: FormControl<string>): ValidationErrors | null => {
    if (!control?.value) {
      return null;
    }
    const value = control.value.trim();
    if (!value) {
      return null;
    }
    if (value.startsWith('3') && value.length === 10) {
      return validatePattern(/^3[0-9]{9}$/, value);
    }
    if (value.startsWith('@')) {
      return validatePattern(/^@[A-Za-z0-9]{1,20}$/, value, true);
    }

    if (value.includes('@') && !value.startsWith('@')) {
      return validatePattern(/^[^@]{1,30}@[^\s@]{1,61}$/, value, true);
    }

    return validatePattern(/^[A-Za-z0-9]{1,18}$/, value);
  };
}
function hasSingleAtSymbol(value: string): boolean {
  return value.split('@').length - 1 === 1;
}
function validatePattern(
  pattern: RegExp,
  value: string,
  checkAtSymbol: boolean = false
): ValidationErrors | null {
  if (checkAtSymbol && !hasSingleAtSymbol(value)) {
    return { transferAvalKeyValuePattern: true };
  }
  return pattern.test(value) ? null : { transferAvalKeyValuePattern: true };
}
