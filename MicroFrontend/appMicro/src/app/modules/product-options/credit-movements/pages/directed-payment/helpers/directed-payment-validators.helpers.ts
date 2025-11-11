import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { DIRECTED_PAYMENT_AVAILABLE_FIELD } from '@modules/product-options/credit-movements/pages/directed-payment/constants/directed-payment.constants';

export function directedPaymentAmountValidators(
  balance: number
): (control: UntypedFormControl) => { [p: string]: boolean } {
  return function (control: UntypedFormControl): { [key: string]: boolean } {
    const value: number = control.currencyValue();
    const formGroup = this.form;
    if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
      if (!isNullOrUndefined(balance) && value > balance) {
        return { directedPaymentAmountInvalid: true };
      }
      if (
        value < this.facade.boundsByKey(ParameterKey.directedPaymentAmountMin)
      ) {
        return {
          directedPaymentAmountMin: this.facade.boundsValue(
            ParameterKey.directedPaymentAmountMin
          )
        };
      }
    }
    return null;
  };
}
