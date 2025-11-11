import { UntypedFormControl } from '@angular/forms';
import { FRANCHISE_TYPE } from '@commons/constants/card.constants';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

const VALID_NUMBER_FOR_DEBT_PURCHASE = [
  FRANCHISE_TYPE.VISA,
  FRANCHISE_TYPE.MASTERCARD
];

export function debitPurchaseAccountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: string = control.normalize();
  if (!isNullOrUndefined(value)) {
    const _value = value.charAt(0).toString();

    if (
      !isNullOrUndefined(_value) &&
      !VALID_NUMBER_FOR_DEBT_PURCHASE.includes(_value)
    ) {
      return { debtPurchaseAccountInvalid: true };
    }

    if (
      value.toString().length !==
      this.facade.boundsByKey(ParameterKey.debitPurchaseCreditCardLength)
    ) {
      return {
        debtPurchaseAccountLength: this.facade.boundsValue(
          ParameterKey.debitPurchaseCreditCardLength
        )
      };
    }
  }
  return null;
}

export function debitPurchaseAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  if (!isNullOrUndefined(value)) {
    if (
      !isNullOrUndefined(this.productSelected()) &&
      value > this.productSelected().availablePurchasesBalance
    ) {
      return { debtPurchaseAmountMaxAvailableCreditCard: true };
    }
    if (
      !isNullOrUndefined(this.productSelected()) &&
      value > this.productSelected().availableBalance
    ) {
      return { debtPurchaseAmountMaxAvailableRotatingCredit: true };
    }
    if (value < this.facade.boundsByKey(ParameterKey.debitPurchaseAmountMin)) {
      return {
        debtPurchaseAmountMin: this.facade.boundsValue(
          ParameterKey.debitPurchaseAmountMin
        )
      };
    }
  }
  return null;
}

export function debtPurchaseInstallmentsValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const value: number = control.value;
  if (!isNullOrUndefined(value)) {
    if (
      value < this.facade.boundsByKey(ParameterKey.debitPurchaseInstallmentsMin)
    ) {
      return { debtPurchaseInstallmentsMin: true };
    }
    if (
      value > this.facade.boundsByKey(ParameterKey.debitPurchaseInstallmentsMax)
    ) {
      return { debtPurchaseInstallmentsMax: true };
    }
  }
  return null;
}
