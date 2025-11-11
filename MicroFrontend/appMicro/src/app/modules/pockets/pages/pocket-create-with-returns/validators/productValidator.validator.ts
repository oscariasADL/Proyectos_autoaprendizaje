import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function valueNotGreaterThanProduct(
  targetField: string,
  sourceField: string,
  validationObject: { [key: string]: boolean } = { exceedsTarget: true }
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent;
    if (!form) return null;

    const sourceValue = form.get(sourceField)?.value;
    const accountBalance = form.get(targetField)?.value.availableBalance;

    if (sourceValue === null || accountBalance === null) return null;

    const sourceNum = Number(String(sourceValue).replace(/\./g, ''));

    return sourceNum > accountBalance ? validationObject : null;
  };
}
