import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { CARD_ADVANCE_AVAILABLE_FIELD } from '@modules/product-options/card-advance/constants/card-advance.constants';

export function cardAdvanceAccountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup)) {
    formGroup.get('amount').updateValueAndValidity();
  }
  return null;
}

export function cardAdvanceAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const fromProduct: Product = formGroup.controls.fromProduct.value;
    if (
      !isNullOrUndefined(fromProduct) &&
      value > fromProduct[CARD_ADVANCE_AVAILABLE_FIELD]
    ) {
      return { cardAdvanceAmountMaxAvailableCreditCard: true };
    }
    if (value < this.facade.boundsByKey(ParameterKey.cardAdvanceAmountMin)) {
      return {
        cardAdvanceAmountMin: this.facade.boundsValue(
          ParameterKey.cardAdvanceAmountMin
        )
      };
    }
  }
  return null;
}
