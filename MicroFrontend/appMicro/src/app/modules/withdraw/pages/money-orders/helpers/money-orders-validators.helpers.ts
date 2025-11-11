import { UntypedFormControl } from '@angular/forms';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import {
  hasDifferentNumbers,
  isAscOrder,
  isNullOrUndefined,
  sanitizeDocument
} from '@commons/helpers/text.helpers';

export function moneyOrdersAccountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup)) {
    formGroup.get('amount').updateValueAndValidity();
  }
  return null;
}

export function moneyOrdersWhoValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: string = sanitizeDocument(control.value);
  if (!isNullOrUndefined(value)) {
    if (
      value.length > 0 &&
      value.length <
        this.facade.boundsByKey(ParameterKey.moneyOrderDocumentMinLength)
    ) {
      return {
        moneyOrderDocumentMin: this.facade.boundsValue(
          ParameterKey.moneyOrderDocumentMinLength
        )
      };
    }
    if (
      value.length > 0 &&
      value.length >
        this.facade.boundsByKey(ParameterKey.moneyOrderDocumentMaxLength)
    ) {
      return {
        moneyOrderDocumentMax: this.facade.boundsValue(
          ParameterKey.moneyOrderDocumentMaxLength
        )
      };
    }

    if (
      isAscOrder(value) ||
      !hasDifferentNumbers(value) ||
      (value.length > 0 && value[0].toString() === '0')
    ) {
      return { moneyOrderDocumentNotValid: true };
    }
  }
  return null;
}

export function moneyOrdersAmountValidators(control: UntypedFormControl): {
  [key: string]: any;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const productOrigin: Product = formGroup.controls.productOrigin.value;
    const whereWithdrawal: ChannelType =
      formGroup.controls.moneyOrderChannel.value;

    if (
      !isNullOrUndefined(productOrigin) &&
      value > productOrigin.availableBalance
    ) {
      return { moneyOrderAmountMaxAvailable: true };
    }

    if (
      !isNullOrUndefined(productOrigin) &&
      value > productOrigin.availableBalance
    ) {
      return { cashWithdrawalAmountMaxAvailable: true };
    }

    const amountMinParameterKey =
      whereWithdrawal === ChannelType.ATM
        ? ParameterKey.moneyOrderAmountMinAtm
        : ParameterKey.moneyOrderAmountMin;
    if (value < this.facade.boundsByKey(amountMinParameterKey)) {
      return {
        moneyOrderAmountMin: this.facade.boundsValue(amountMinParameterKey)
      };
    }

    if (value > this.facade.boundsByKey(ParameterKey.moneyOrderAmountMax)) {
      return {
        moneyOrderAmountMax: this.facade.boundsValue(
          ParameterKey.moneyOrderAmountMax
        )
      };
    }

    if (
      value ===
        this.facade.boundsByKey(ParameterKey.moneyOrderAmountRestricted) &&
      whereWithdrawal === ChannelType.ATM
    ) {
      return {
        moneyOrderAmountRestricted: {
          billTwentyThousand: this.facade.boundsValue(
            ParameterKey.billTwentyThousand
          ).value,
          billFiftyThousand: this.facade.boundsValue(
            ParameterKey.billFiftyThousand
          ).value,
          billOneHundredThousand: this.facade.boundsValue(
            ParameterKey.billOneHundredThousand
          ).value
        }
      };
    }

    if (
      value % this.facade.boundsByKey(ParameterKey.moneyOrderAmountMultiple) !==
      0
    ) {
      return {
        moneyOrderAmountMultiple: this.facade.boundsValue(
          ParameterKey.moneyOrderAmountMultiple
        )
      };
    }
  }
  return null;
}
