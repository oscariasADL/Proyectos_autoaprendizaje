import { UntypedFormControl } from '@angular/forms';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { ChannelType } from '@modules/withdraw/entities/withdraw.interface';

export function transferFavoriteAvvAccountAmountValidator(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  if (!isNullOrUndefined(control)) {
    const value: number = control.currencyValue();

    this.notice = null;

    if (!isNullOrUndefined(value)) {
      if (
        value < this.facade.boundsByKey(ParameterKey.transferValueToSendMin)
      ) {
        return {
          transferValueToSendMin: this.facade.boundsValue(
            ParameterKey.transferValueToSendMin
          )
        };
      }

      if (
        value > this.facade.boundsByKey(ParameterKey.transferToOtherAccountsMax)
      ) {
        this.notice = 'TRANSFERS.AVV_ACCOUNT.AMOUNT.MESSAGE';
        return { transferValueToSendMax: true };
      }
    }
  }
  return null;
}

export function transfersFavoriteTransfiyaAmountValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  if (!isNullOrUndefined(control)) {
    const value: number = control.currencyValue();

    if (!isNullOrUndefined(value)) {
      if (value < this.facade.boundsByKey(ParameterKey.transfiyaAmountMin)) {
        return {
          transferTransfiyaValueToSendMin: this.facade.boundsValue(
            ParameterKey.transfiyaAmountMin
          )
        };
      }

      if (value > this.facade.boundsByKey(ParameterKey.transfiyaAmountMax)) {
        return {
          transferValueToSendMaxTransfiya: this.facade.boundsValue(
            ParameterKey.transfiyaAmountMax
          )
        };
      }
    }
  }
  return null;
}

export function rechargesFavoriteAmountValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  if (!isNullOrUndefined(value)) {
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

export function moneyOrdersFavoriteAmountValidators(channel?: ChannelType) {
  return function (control: UntypedFormControl): {
    [key: string]: any;
  } {
    const value: number = control.currencyValue();
    if (!isNullOrUndefined(value)) {
      const amountMinParameterKey =
        channel === ChannelType.ATM
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
        channel === ChannelType.ATM
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
        value %
          this.facade.boundsByKey(ParameterKey.moneyOrderAmountMultiple) !==
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
  };
}

export function servicePayAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  if (!isNullOrUndefined(value)) {
    if (value <= this.facade.boundsByKey(ParameterKey.servicePayAmountMin)) {
      return {
        paymentServicesValueToPayMin: this.facade.boundsValue(
          ParameterKey.servicePayAmountMin
        )
      };
    }

    if (
      value >
      this.facade.boundsByKey(ParameterKey.paymentRegisteredServiceAmountMax)
    ) {
      return {
        paymentRegisteredServiceToPayMax: this.facade.boundsValue(
          ParameterKey.paymentRegisteredServiceAmountMax
        )
      };
    }
  }
  return null;
}
