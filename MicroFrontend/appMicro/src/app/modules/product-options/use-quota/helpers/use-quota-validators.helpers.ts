import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { USE_QUOTA_AVAILABLE_FIELD } from '@modules/product-options/use-quota/constants/use-quota.constants';

export function useQuotaAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const fromProduct: Product = formGroup.controls.fromProduct.value;
    if (
      !isNullOrUndefined(fromProduct) &&
      value > fromProduct[USE_QUOTA_AVAILABLE_FIELD]
    ) {
      return { useQuotaAmountMaxAvailableCreditCard: true };
    }
    if (value < this.facade.boundsByKey(ParameterKey.useQuotaAmountMin)) {
      return {
        useQuotaAmountMin: this.facade.boundsValue(
          ParameterKey.useQuotaAmountMin
        )
      };
    }
  }
  return null;
}
