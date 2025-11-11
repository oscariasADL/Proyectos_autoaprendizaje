/* eslint-disable max-lines */
import { UntypedFormControl, FormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { Product } from '@commons/entities/product/product.interface';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { TransferAvvAccountSlide } from '@modules/transfers/pages/transfers-avv-account/constants/transfers-avv-account.constants';
import { TransferAvvPhoneSlide } from '@modules/transfers/pages/transfers-avv-phone/constants/transfers-avv-phone.constants';
import { TransferSendMoneySlide } from '@modules/transfers/pages/transfers-send-money/constants/transfers-send-money.constants';
import { TRANSFERS_AVAILABLE_FIELD } from '../constants/transfers.constants';

export function transfersContactsAmountValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(control) && !isNullOrUndefined(formGroup)) {
    const value: number = control.currencyValue();
    const fromProduct: Product = formGroup.controls.fromProduct.value;

    if (!isNullOrUndefined(value)) {
      if (fromProduct[TRANSFERS_AVAILABLE_FIELD] < value) {
        return { transferValueToSendNotFunds: true };
      }

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
        value > this.facade.boundsByKey(ParameterKey.transferContactsAmountMax)
      ) {
        return { transferValueToSendMax: true };
      }
    }
  }
  return null;
}

export function transfersTransfiyaAmountValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(control) && !isNullOrUndefined(formGroup)) {
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

export function transferUnregisteredAccountsAmountValidators(
  control: UntypedFormControl
): { [key: string]: boolean } {
  const formGroup = this.form;
  if (!isNullOrUndefined(control) && !isNullOrUndefined(formGroup)) {
    const value: number = control.currencyValue();
    const fromProduct: Product = formGroup.controls.fromProduct.value;

    if (!isNullOrUndefined(value)) {
      if (fromProduct[TRANSFERS_AVAILABLE_FIELD] < value) {
        return { transferValueToSendNotFunds: true };
      }

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
        return { transferValueToSendMax: true };
      }
    }
  }
  return null;
}

export function transferAvvAccountAmountValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(control) && !isNullOrUndefined(formGroup)) {
    const value: number = control.currencyValue();
    const fromProduct: Product = formGroup.controls.fromProduct.value;

    this.data[TransferAvvAccountSlide.amount].data.noticeInfo = null;

    if (!isNullOrUndefined(value)) {
      if (fromProduct[TRANSFERS_AVAILABLE_FIELD] < value) {
        return { transferValueToSendNotFunds: true };
      }

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
        this.data[TransferAvvAccountSlide.amount].data.noticeInfo =
          'TRANSFERS.AVV_ACCOUNT.AMOUNT.MESSAGE';
        return { transferValueToSendMax: true };
      }
    }
  }
  return null;
}

export function transferAvvPhoneAmountValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(control) && !isNullOrUndefined(formGroup)) {
    const value: number = control.currencyValue();
    const fromProduct: Product = formGroup.controls.fromProduct.value;

    this.data[TransferAvvPhoneSlide.amount].data.noticeInfo = null;

    if (!isNullOrUndefined(value)) {
      if (fromProduct[TRANSFERS_AVAILABLE_FIELD] < value) {
        return { transferValueToSendNotFunds: true };
      }

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
        this.data[TransferAvvPhoneSlide.amount].data.noticeInfo =
          'TRANSFERS.AVV_PHONE.AMOUNT.MESSAGE';
        return { transferValueToSendMax: true };
      }
    }
  }
  return null;
}

export function transferSendMoneyAmountValidators(
  control: UntypedFormControl
): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(control) && !isNullOrUndefined(formGroup)) {
    const value: number = control.currencyValue();
    const fromProduct: Product = formGroup.controls.fromProduct.value;

    this.data[TransferSendMoneySlide.amount].data.noticeInfo = null;

    if (!isNullOrUndefined(value)) {
      if (fromProduct[TRANSFERS_AVAILABLE_FIELD] < value) {
        return { transferValueToSendNotFunds: true };
      }

      if (value < this.facade.boundsByKey(ParameterKey.transfiyaAmountMin)) {
        return {
          transferValueToSendMin: this.facade.boundsValue(
            ParameterKey.transfiyaAmountMin
          )
        };
      }

      if (value > this.facade.boundsByKey(ParameterKey.transfiyaAmountMax)) {
        this.data[TransferSendMoneySlide.amount].data.noticeInfo =
          'TRANSFERS.SEND_MONEY.AMOUNT.MESSAGE';
        return { transferValueToSendMax: true };
      }
    }
  }
  return null;
}

export function transferNoteValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  if (!isNullOrUndefined(control)) {
    const value: string = control.value;

    if (
      !isNullOrUndefined(value) &&
      value.length > this.facade.boundsByKey(ParameterKey.transferNoteMaxLength)
    ) {
      return {
        transferNoteMax: this.facade.boundsValue(
          ParameterKey.transferNoteMaxLength
        )
      };
    }
  }
  return null;
}

export function transferInvoiceValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  if (!isNullOrUndefined(control)) {
    const value: string = control.value;

    if (
      !isNullOrUndefined(value) &&
      value.length >
        this.facade.boundsByKey(ParameterKey.transferInvoiceMaxLength)
    ) {
      return {
        transferInvoiceMax: this.facade.boundsValue(
          ParameterKey.transferInvoiceMaxLength
        )
      };
    }
  }
  return null;
}

export function transferPhoneNumberValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: string = control.normalize();
  if (!isNullOrUndefined(value)) {
    if (
      value.length > 0 &&
      value[0] !==
        this.facade
          .boundsByKey(ParameterKey.transferPhoneNumberFirstCharacter)
          .toString()
    ) {
      return {
        transferPhoneNumberFirstInvalid: this.facade.boundsValue(
          ParameterKey.transferPhoneNumberFirstCharacter
        )
      };
    }

    if (
      value.length > 0 &&
      value.length !==
        this.facade.boundsByKey(ParameterKey.transferPhoneNumberLength)
    ) {
      return { transferPhoneNumberInvalid: true };
    }
  }
  return null;
}

export function accountNumberValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.value;
  const formGroup = this.form;
  if (!isNullOrUndefined(value) && !isNullOrUndefined(formGroup)) {
    const isVillasAccount = true;

    if (+value === 0) {
      return { transferAccountNumberNotValid: true };
    }

    if (
      !isVillasAccount &&
      value.toString().length >
        this.facade.boundsByKey(ParameterKey.transferOthersAccountMaxLength)
    ) {
      return {
        transferAccountNumberOtherNumberMax: this.facade.boundsValue(
          ParameterKey.transferOthersAccountMaxLength
        )
      };
    } else if (
      isVillasAccount &&
      value.toString().length !==
        this.facade.boundsByKey(ParameterKey.transferVillasAccountMaxLength)
    ) {
      return {
        transferAccountNumberVillasNumberMax: this.facade.boundsValue(
          ParameterKey.transferVillasAccountMaxLength
        )
      };
    }
  }
  return null;
}

export function bankValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup)) {
    formGroup.get('accountNumber').updateValueAndValidity();
  }
  return null;
}

function createTransferAmountValidator(maxAmountKey: ParameterKey) {
  return function (control: FormControl): { [key: string]: boolean } | null {
    const formGroup = this.form;

    if (!isNullOrUndefined(control) && !isNullOrUndefined(formGroup)) {
      const value: number = control.currencyValue();
      const fromProduct: Product = formGroup.controls.fromProduct.value;

      if (!isNullOrUndefined(value)) {
        if (fromProduct[TRANSFERS_AVAILABLE_FIELD] < value) {
          return { transferValueToSendNotFunds: true };
        }

        if (value < this.facade.boundsByKey(ParameterKey.cel2celAmountMin)) {
          return {
            transferCel2celValueToSendMin: this.facade.boundsValue(
              ParameterKey.cel2celAmountMin
            )
          };
        }

        if (value > this.facade.boundsByKey(maxAmountKey)) {
          return {
            transferCel2celValueToSendMax: this.facade.boundsValue(maxAmountKey)
          };
        }
      }
    }

    return null;
  };
}

export const transfersCel2celAmountValidators = createTransferAmountValidator(
  ParameterKey.cel2celAmountMax
);

export const transfersBreBAmountValidators = createTransferAmountValidator(
  ParameterKey.brebAmountMax
);
