import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export const resetForm = (
  formGroup: UntypedFormGroup,
  onlyControls?: string[],
  force: boolean = false
) => {
  const keys = !!!onlyControls ? Object.keys(formGroup.controls) : onlyControls;
  keys.forEach((key) => {
    const control = formGroup.controls[key];
    if (control.touched || force) {
      control.reset();
      control.setValue(null);
      control.setErrors(null);
      control.markAsUntouched();
    }
  });
  if (!!!onlyControls) {
    formGroup.reset();
  }
  formGroup.updateValueAndValidity();
};

export const resetControl = (
  control: UntypedFormControl,
  force: boolean = false
) => {
  if (!isNullOrUndefined(control) && (control.touched || force)) {
    control.reset();
    control.setValue(null);
    control.setErrors(null);
    control.markAsUntouched();
  }
};
