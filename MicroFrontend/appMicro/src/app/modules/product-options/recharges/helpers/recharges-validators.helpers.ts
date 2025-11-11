import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { RECHARGES_AVAILABLE_FIELD } from '@modules/product-options/recharges/constants/recharges.constants';

export function rechargesPhoneValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: string = control.normalize();
  if (!isNullOrUndefined(value)) {
    if (
      value.length > 0 &&
      value.length !== this.facade.boundsByKey(ParameterKey.rechargePhoneLength)
    ) {
      return { rechargesPhoneInvalid: true };
    }
    if (
      value.length > 0 &&
      value[0] !==
        this.facade
          .boundsByKey(ParameterKey.rechargePhoneFirstCharacter)
          .toString()
    ) {
      return {
        rechargesPhoneNumberValid: this.facade.boundsValue(
          ParameterKey.rechargePhoneFirstCharacter
        )
      };
    }
  }
  return null;
}

export function rechargesAccountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup)) {
    formGroup.get('amount').updateValueAndValidity();
  }
  return null;
}

export function rechargesAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const productOrigin: Product = formGroup.controls.productOrigin.value;

    if (
      !isNullOrUndefined(productOrigin) &&
      value > productOrigin[RECHARGES_AVAILABLE_FIELD]
    ) {
      return { rechargesAmountMaxAvailable: true };
    }
    if (value < this.facade.boundsByKey(ParameterKey.rechargeAmountMin)) {
      return {
        rechargesAmountMin: this.facade.boundsValue(
          ParameterKey.rechargeAmountMin
        )
      };
    }
    if (value > this.facade.boundsByKey(ParameterKey.rechargeAmountMax)) {
      return {
        rechargesAmountMax: this.facade.boundsValue(
          ParameterKey.rechargeAmountMax
        )
      };
    }
    if (
      value % this.facade.boundsByKey(ParameterKey.rechargeAmountMultiple) !==
      0
    ) {
      return {
        rechargesAmountMultiple: this.facade.boundsValue(
          ParameterKey.rechargeAmountMultiple
        )
      };
    }
  }
  return null;
}
