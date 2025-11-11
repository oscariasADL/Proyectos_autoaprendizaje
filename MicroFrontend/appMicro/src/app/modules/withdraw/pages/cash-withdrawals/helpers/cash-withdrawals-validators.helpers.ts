import { UntypedFormControl } from '@angular/forms';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function cashWithdrawalsAccountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup)) {
    formGroup.get('amount').updateValueAndValidity();
  }
  return null;
}

export function cashWithdrawalsAmountValidators(control: UntypedFormControl): {
  [key: string]: any;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    const productOrigin: Product = formGroup.controls.productOrigin.value;
    const whereWithdrawal: ChannelType =
      formGroup.controls.cashWithdrawalChannel.value;

    if (
      !isNullOrUndefined(productOrigin) &&
      value > productOrigin.availableBalance
    ) {
      return { cashWithdrawalAmountMaxAvailable: true };
    }

    const amountMinParameterKey =
      whereWithdrawal === ChannelType.ATM
        ? ParameterKey.cashWithdrawalAmountMinAtm
        : ParameterKey.cashWithdrawalAmountMin;
    if (value < this.facade.boundsByKey(amountMinParameterKey)) {
      return {
        cashWithdrawalAmountMin: this.facade.boundsValue(amountMinParameterKey)
      };
    }

    if (value > this.facade.boundsByKey(ParameterKey.cashWithdrawalAmountMax)) {
      return {
        cashWithdrawalAmountMax: this.facade.boundsValue(
          ParameterKey.cashWithdrawalAmountMax
        )
      };
    }

    if (
      value ===
        this.facade.boundsByKey(ParameterKey.cashWithdrawalAmountRestricted) &&
      whereWithdrawal === ChannelType.ATM
    ) {
      return {
        cashWithdrawalAmountRestricted: {
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
      value %
        this.facade.boundsByKey(ParameterKey.cashWithdrawalAmountMultiple) !==
      0
    ) {
      return {
        cashWithdrawalAmountMultiple: this.facade.boundsValue(
          ParameterKey.cashWithdrawalAmountMultiple
        )
      };
    }
  }
  return null;
}
