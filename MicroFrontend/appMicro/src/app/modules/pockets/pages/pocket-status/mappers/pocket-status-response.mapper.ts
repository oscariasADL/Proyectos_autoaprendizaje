import { HttpErrorResponse } from '@angular/common/http';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import {
  ToastProperties,
  ToastType
} from '@commons/entities/toast/toast.entities';
import { mapError } from '@commons/helpers/http.helpers';
import { UpdatePocketPayload } from '@modules/pockets/entities/pocket-update.interface';
import { PocketStatus } from '@modules/pockets/entities/pockets.interface';

export function mapPocketStatusResponse(
  payload: UpdatePocketPayload
): ToastProperties {
  return {
    type: ToastType.success,
    title:
      payload.status === PocketStatus.ACTIVE
        ? 'POCKETS.STATUS.RESPONSE.SUCCESS.ACTIVATED'
        : 'POCKETS.STATUS.RESPONSE.SUCCESS.PAUSED'
  };
}

export function mapPocketStatusError(
  error: HttpErrorResponse,
  payload: UpdatePocketPayload
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'pocket-status-error-alert',
    title:
      payload.status === PocketStatus.ACTIVE
        ? 'POCKETS.STATUS.RESPONSE.ERROR.ACTIVATED'
        : 'POCKETS.STATUS.RESPONSE.ERROR.PAUSED',
    description: mapError(error)
  };
}
