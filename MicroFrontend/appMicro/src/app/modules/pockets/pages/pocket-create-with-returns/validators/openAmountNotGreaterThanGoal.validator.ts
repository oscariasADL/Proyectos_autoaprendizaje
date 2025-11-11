import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function valueNotGreaterThan(
  targetField: string,
  sourceField: string,
  validationObject: { [key: string]: boolean } = { exceedsTarget: true }
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent;

    if (!form) return null;

    const sourceValue = form.get(sourceField)?.value;
    const targetValue = form.get(targetField)?.value;

    if (sourceValue === null || targetValue === null) return null;

    const sourceNum = Number(String(sourceValue).replace(/\./g, ''));
    const targetNum = Number(String(targetValue).replace(/\./g, ''));

    return sourceNum > targetNum ? validationObject : null;
  };
}
