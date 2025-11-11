import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function minCurrencyValue(reference: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    if (control === null) return null;
    const controlNumber = control.currencyValue();
    return controlNumber < reference ? { isLessThanCurrencyValue: true } : null;
  };
}
