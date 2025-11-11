import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { Pocket } from '@modules/pockets/entities/pockets.interface';

export function pocketPayAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const pocket: Pocket = formGroup.get('pocket').value;
    const product: Product = formGroup.get('product').value;

    if (
      !isNullOrUndefined(pocket) &&
      !isNullOrUndefined(product) &&
      (product.availableBalance === 0 || value > product.availableBalance)
    ) {
      return { pocketsPayValueToPayInsufficientFunds: true };
    }

    if (value < this.facade.boundsByKey(ParameterKey.pocketPayMin)) {
      return {
        pocketsPayValueToPayMin: this.facade.boundsValue(
          ParameterKey.pocketPayMin
        )
      };
    }

    if (
      !isNullOrUndefined(pocket) &&
      value > pocket.goal - pocket.amountSaved
    ) {
      return { pocketsPayValueToPayMax: true };
    }
  }
  return null;
}
