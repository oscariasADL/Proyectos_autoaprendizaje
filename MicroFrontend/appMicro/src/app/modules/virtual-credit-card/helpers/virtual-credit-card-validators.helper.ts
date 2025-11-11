import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { valueToNumberFormat } from '@commons/helpers/text.helpers';

export function virtualCreditCardAmountValidator(
  tcvMaxAmount: number
): ValidatorFn {
  return function (control: AbstractControl<string>): ValidationErrors {
    if (!control || !control.value) return null;
    const value: number = control.currencyValue();
    const minAmount = Number(
      this.facade.boundsByKey(ParameterKey.tcvMinAmount)
    );
    if (value < minAmount) {
      return {
        virtualCreditCardAmountMin: this.facade.boundsValue(
          ParameterKey.tcvMinAmount
        )
      };
    }
    if (value > tcvMaxAmount) {
      return {
        virtualCreditCardAmountMax: { value: valueToNumberFormat(tcvMaxAmount) }
      };
    }
    return null;
  };
}
