import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@app/commons/entities/parameters/parameter.entities';

export function isMoreThan(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  if (control.value) {
    const value = control.value.toString().replace(/\./g, '');
    const number = Number(value);

    return !isNaN(number) &&
      number > this.facade.boundsByKey(ParameterKey.pocketGoalMax)
      ? {
          pocketsCreateGoalMax: this.facade.boundsValue(
            ParameterKey.pocketGoalMin
          )
        }
      : null;
  }
}
