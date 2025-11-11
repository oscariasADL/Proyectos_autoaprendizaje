import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isLessThan(
  VSNumber: number,
  validate: { [key: string]: boolean }
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const val = control.value.toString();
      const value = val.replace(/\./g, '');
      const number = Number(value);
      return !isNaN(number) && number < VSNumber ? validate : null;
    }
  };
}
