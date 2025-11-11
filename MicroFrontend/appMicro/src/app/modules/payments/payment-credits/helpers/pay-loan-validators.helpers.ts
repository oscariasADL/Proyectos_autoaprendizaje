import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { PAY_LOAN_AVAILABLE_FIELD } from '@modules/payments/payment-credits/constants/pay-loan.constants';

export function payLoanAccountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup)) {
    formGroup.get('amount').updateValueAndValidity();
  }
  return null;
}

export function payLoanAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const fromProduct: Product = formGroup.controls.fromProduct.value;
    if (
      !isNullOrUndefined(fromProduct) &&
      value > fromProduct[PAY_LOAN_AVAILABLE_FIELD]
    ) {
      return { transferValueToSendNotFunds: true };
    }
    if (value < this.facade.boundsByKey(ParameterKey.payLoanAmountMin)) {
      return {
        paymentsPayValueToSendMinLength: this.facade.boundsValue(
          ParameterKey.payLoanAmountMin
        )
      };
    }
    if (value > this.facade.boundsByKey(ParameterKey.payLoanAmountMax)) {
      return { paymentsPayValueToSendMaxLength: true };
    }
  }
  return null;
}
