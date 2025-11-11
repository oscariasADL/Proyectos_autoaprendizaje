import { UntypedFormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { addYears, getYear } from 'date-fns';

const { minYear, maxYear } = expirationYears();

export function expirationValidations(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  const value: string = control.value;
  if (
    !isNullOrUndefined(formGroup) &&
    !isNullOrUndefined(value) &&
    value.length > 4
  ) {
    const year = parseInt(value.toString().substr(3, 2), 10);

    if (!isNullOrUndefined(year) && (year < minYear || year > maxYear)) {
      return { creditCardExpirationInvalidYear: true };
    }
  }

  return null;
}

export function cvcValidations(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  const value: number = control.value;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const length = value.toString().length;
    if (length > 1 && length < 3) {
      return { creditCardInvalidCvc: true };
    }
  }

  return null;
}

export function expirationYears(): { minYear: number; maxYear: number } {
  const today = new Date();
  return {
    minYear: parseInt(getYear(today).toString().substr(2, 2), 10),
    maxYear: parseInt(getYear(addYears(today, 7)).toString().substr(2, 2), 10)
  };
}
