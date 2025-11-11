import { UntypedFormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';

export function digitalDebitCardAmountValidator(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  if (!isNullOrUndefined(value)) {
    const minAmount = Number(
      this.facade.boundsByKey(ParameterKey.tddMinAmount)
    );
    const maxAmount = Number(
      this.facade.boundsByKey(ParameterKey.tddMaxAmount)
    );

    if (value < minAmount) {
      return {
        digitalDebitCardAmountMin: this.facade.boundsValue(
          ParameterKey.tddMinAmount
        )
      };
    }
    if (value > maxAmount) {
      return {
        digitalDebitCardAmountMax: this.facade.boundsValue(
          ParameterKey.tddMaxAmount
        )
      };
    }
  }
  return null;
}
