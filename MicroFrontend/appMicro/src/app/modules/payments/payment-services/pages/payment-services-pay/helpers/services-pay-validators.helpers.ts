import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { SERVICES_PAY_AVAILABLE_FIELD } from '@modules/payments/payment-services/pages/payment-services-pay/constants/services-pay.constants';

export function servicePayAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const fromProduct: Product = formGroup.controls.fromProduct.value;
    if (
      !isNullOrUndefined(fromProduct) &&
      value > fromProduct[SERVICES_PAY_AVAILABLE_FIELD]
    ) {
      return { paymentServicesValueToPayMax: true };
    }
    if (value <= this.facade.boundsByKey(ParameterKey.servicePayAmountMin)) {
      return {
        paymentServicesValueToPayMin: this.facade.boundsValue(
          ParameterKey.servicePayAmountMin
        )
      };
    }
  }
  return null;
}
