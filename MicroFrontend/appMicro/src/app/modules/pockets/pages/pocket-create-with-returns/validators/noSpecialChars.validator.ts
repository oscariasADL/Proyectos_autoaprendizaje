import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function noSpecialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /[^a-zA-Z0-9 ]/.test(control.value);
    return forbidden ? { noSpecialCharsAllowed: true } : null;
  };
}
