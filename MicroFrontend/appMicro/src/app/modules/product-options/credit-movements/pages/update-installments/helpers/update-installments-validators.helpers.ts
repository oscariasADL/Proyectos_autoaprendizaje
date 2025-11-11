import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function updateInstallmentsFieldValidators(isDebitPurchase: boolean) {
  return (
    control: UntypedFormControl
  ): {
    [key: string]: boolean;
  } => {
    const value: number = control.value;
    const formGroup = this.form;
    const updateInstallmentsFieldMax = isDebitPurchase
      ? this.facade.boundsByKey(ParameterKey.debitPurchaseInstallmentsMax)
      : this.facade.boundsByKey(ParameterKey.updateInstallmentsFieldMax);

    if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
      if (value > updateInstallmentsFieldMax) {
        return {
          updateInstallmentsFieldMax: true
        };
      }
      if (
        value < this.facade.boundsByKey(ParameterKey.updateInstallmentsFieldMin)
      ) {
        return {
          updateInstallmentsFieldMin: true
        };
      }
    }
    return null;
  };
}
