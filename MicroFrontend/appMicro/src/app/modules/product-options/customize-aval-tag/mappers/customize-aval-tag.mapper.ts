import {
  CustomizeAvalTagFormValue,
  CustomizeAvalTagPayload
} from '@modules/product-options/customize-aval-tag/entities/customize-aval-tag.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { HttpErrorResponse } from '@angular/common/http';
import { mapError } from '@commons/helpers/http.helpers';

export function mapCustomizeAvalTagPayload(
  formValue: Partial<CustomizeAvalTagFormValue>
): CustomizeAvalTagPayload {
  const currentSpiUserKey = formValue.currentSpiUserKey;
  const newKeyId = `@${formValue.newKeyId}`;
  return {
    currentKeyId: currentSpiUserKey.keyId,
    newKeyId: newKeyId.toUpperCase(),
    accountId: currentSpiUserKey.accountId,
    accountType: currentSpiUserKey.accountType,
    preferredIndicator: currentSpiUserKey.preferredIndicator,
    statusDesc: currentSpiUserKey.statusDesc,
    effDt: currentSpiUserKey.effDt
  };
}

export function mapCustomizeAvalTagError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'customize-aval-tag-alert-error',
    title: 'CUSTOMIZE_AVAL_TAG.RESPONSE.ERROR.TITLE',
    description: mapError(error)
  };
}
