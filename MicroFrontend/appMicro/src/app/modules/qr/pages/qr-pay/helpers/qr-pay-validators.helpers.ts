import { UntypedFormControl } from '@angular/forms';
import { ParameterKey } from '@commons/entities/parameters/parameter.entities';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { QrData } from '@modules/qr/pages/qr-pay/entities/qr-data.interface';
import {
  FILLER_CHARACTER_FOR_SPI_KEY,
  FIRST_CHARACTERS_SPI_KEY,
  FIRST_POSITION_MERCHANT_CODE,
  LENGTH_MERCHANT_CODE,
  LENGTH_MERCHANT_CODE_SPI_KEY
} from '@modules/qr/pages/qr-pay/constants/qr-pay.constants';

export function qrPayInstallmentsFieldValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.value;
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    if (
      value > this.facade.boundsByKey(ParameterKey.qrPayInstallmentsFieldMax)
    ) {
      return {
        updateInstallmentsFieldMax: true
      };
    }
    if (
      value < this.facade.boundsByKey(ParameterKey.qrPayInstallmentsFieldMin)
    ) {
      return {
        updateInstallmentsFieldMin: true
      };
    }
  }
  return null;
}

export function qrPayDaleAmountsFieldValidators(control: UntypedFormControl): {
  [key: string]: boolean;
} {
  const value: number = control.currencyValue();
  const formGroup = this.form;
  if (!isNullOrUndefined(formGroup) && !isNullOrUndefined(value)) {
    if (value > this.facade.boundsByKey(ParameterKey.qrPayDaleAmountMax)) {
      return {
        qrPayDaleAmountMax: this.facade.boundsValue(
          ParameterKey.qrPayDaleAmountMax
        )
      };
    }
    if (value < this.facade.boundsByKey(ParameterKey.qrPayDaleAmountMin)) {
      return {
        qrPayDaleAmountMin: this.facade.boundsValue(
          ParameterKey.qrPayDaleAmountMin
        )
      };
    }
  }
  return null;
}

export function merchantCodeValidator(qrData: QrData): boolean {
  const { merchantCode } = qrData;
  const firstPosition = merchantCode.charAt(0).toString();
  const length = merchantCode.length;

  return (
    firstPosition === FIRST_POSITION_MERCHANT_CODE &&
    length === LENGTH_MERCHANT_CODE
  );
}

export function merchantCodeValidatorSpiKey(qrData: QrData): boolean {
  const { merchantCode } = qrData;
  const firstCharacters = merchantCode.substring(0, 2);
  const length = merchantCode.length;
  return (
    firstCharacters === FIRST_CHARACTERS_SPI_KEY &&
    length === LENGTH_MERCHANT_CODE_SPI_KEY
  );
}

export function transformMerchantIdIntoValidSpiKey(merchantId: string): string {
  // Validation 1: starts with '00' and has a length of 10
  if (
    merchantId.startsWith(FIRST_CHARACTERS_SPI_KEY) &&
    merchantId.length === LENGTH_MERCHANT_CODE_SPI_KEY
  ) {
    return merchantId;
  }

  // Validación 2: starts with '9' and has a length of 9
  if (
    merchantId.startsWith(FIRST_POSITION_MERCHANT_CODE) &&
    merchantId.length === LENGTH_MERCHANT_CODE
  ) {
    return FIRST_CHARACTERS_SPI_KEY + merchantId.slice(1);
  }

  // Validación 3: length is less than 10
  if (merchantId.length < LENGTH_MERCHANT_CODE_SPI_KEY) {
    return merchantId.padStart(
      LENGTH_MERCHANT_CODE_SPI_KEY,
      FILLER_CHARACTER_FOR_SPI_KEY
    );
  }

  // If none of the conditions are met, return the original string
  return merchantId;
}
