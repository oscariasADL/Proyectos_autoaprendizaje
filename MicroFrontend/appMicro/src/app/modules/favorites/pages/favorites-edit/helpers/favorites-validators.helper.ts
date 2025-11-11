import { UntypedFormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';

export function favoriteEditAccountNumberValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const value: number = control.value;
  if (!isNullOrUndefined(value)) {
    if (+value === 0) {
      return { transferAccountNumberNotValid: true };
    }

    if (
      value.toString().length >
      this.facade.boundsByKey(ParameterKey.transferOthersAccountMaxLength)
    ) {
      return {
        transferAccountNumberOtherNumberMax: this.facade.boundsValue(
          ParameterKey.transferOthersAccountMaxLength
        )
      };
    } else if (
      value.toString().length !==
      this.facade.boundsByKey(ParameterKey.transferVillasAccountMaxLength)
    ) {
      return {
        transferAccountNumberVillasNumberMax: this.facade.boundsValue(
          ParameterKey.transferVillasAccountMaxLength
        )
      };
    }
  }
  return null;
}
