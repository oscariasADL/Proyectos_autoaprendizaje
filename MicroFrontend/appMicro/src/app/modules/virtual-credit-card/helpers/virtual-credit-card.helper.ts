import { UntypedFormControl } from '@angular/forms';
import {
  isNullOrUndefined,
  valueToNumberFormat
} from '@commons/helpers/text.helpers';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { VIRTUAL_CREDIT_CARD_QUOTA_FIELD } from '@modules/virtual-credit-card/constants/virtual-credit-card.constants';

export function virtualCreditCardAmountValidator(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;

  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const fromProduct: Product = formGroup.controls.fromProduct.value;
    if (
      !isNullOrUndefined(fromProduct) &&
      value > fromProduct[VIRTUAL_CREDIT_CARD_QUOTA_FIELD]
    ) {
      return {
        virtualCreditCardAmountMax: {
          value: valueToNumberFormat(
            fromProduct[VIRTUAL_CREDIT_CARD_QUOTA_FIELD]
          )
        } as any
      };
    }

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
  }
  return null;
}
