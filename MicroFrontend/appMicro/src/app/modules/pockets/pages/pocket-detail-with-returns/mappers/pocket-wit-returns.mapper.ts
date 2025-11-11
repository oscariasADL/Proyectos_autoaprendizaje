import {
  AlertSheetProperties,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';
import {
  PocketStatus,
  PocketWithReturns
} from '@app/modules/pockets/entities/pockets.interface';
import { UpdatePocketWithReturnsPayload } from '../entities/pocket-detail.interface';
import {
  ToastProperties,
  ToastType
} from '@app/commons/entities/toast/toast.entities';
import {
  mapPocketStatusError,
  mapPocketStatusResponse
} from '../../pocket-status/mappers/pocket-status-response.mapper';
import { mapError } from '@commons/helpers/http.helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { DELETE_R_POCKET_TAG } from '@app/modules/pockets/constants/delete.constants';

export function mapPocketWithReturnsStatusAlert(
  pocket: PocketWithReturns
): AlertSheetProperties {
  const data = {
    [PocketStatus.PAUSED]: {
      title: 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.PAUSE.TITLE',
      description:
        'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.PAUSE.DESCRIPTION',
      buttons: [
        'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.PAUSE.BUTTON',
        'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.PAUSE.BUTTON_CANCEL'
      ]
    },
    [PocketStatus.ACTIVE]: {
      title: 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.ACTIVATE.TITLE',
      description:
        'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.ACTIVATE.DESCRIPTION',
      buttons: [
        'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.ACTIVATE.BUTTON',
        'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.STATUS.ACTIVATE.BUTTON_CANCEL'
      ]
    }
  };

  return {
    type: AlertSheetType.question,
    icon: 'illustrations/small-money-pocket.svg',
    id: 'pocket-status-alert',
    ...data[pocket.status]
  };
}

export function mapAutoRenewCapital(
  pocket: PocketWithReturns
): AlertSheetProperties {
  const data = pocket.renewAutomatically
    ? {
        description:
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RENEW.ACTIVATE.DESCRIPTION',
        buttons: [
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RENEW.ACTIVATE.BUTTON'
        ]
      }
    : {
        description:
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RENEW.PAUSE.DESCRIPTION',
        buttons: [
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RENEW.PAUSE.BUTTON'
        ]
      };

  return {
    type: AlertSheetType.question,
    icon: 'illustrations/hand-with-money-bag.svg',
    id: 'pocket-auto-renew-alert',
    ...data
  };
}

export function mapAutoRates(pocket: PocketWithReturns): AlertSheetProperties {
  const data = pocket.renewProfits
    ? {
        description:
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RATES.ACTIVATE.DESCRIPTION',
        buttons: [
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RATES.ACTIVATE.BUTTON'
        ]
      }
    : {
        description:
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RATES.PAUSE.DESCRIPTION',
        buttons: [
          'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.AUTO_RATES.PAUSE.BUTTON'
        ]
      };

  return {
    type: AlertSheetType.question,
    icon: 'illustrations/small-money-pocket.svg',
    id: 'pocket-auto-renew-alert',
    ...data
  };
}

export function mapDeletePocketAlert(): AlertSheetProperties {
  return {
    type: AlertSheetType.question,
    icon: 'illustrations/trash.svg',
    id: 'delete-pocket-with-returns-alert',
    title: 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.DELETE.TITLE',
    description: 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.DELETE.DESCRIPTION',
    buttons: [
      'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.DELETE.BUTTON',
      'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.DELETE.BUTTON_CANCEL'
    ],
    utag: DELETE_R_POCKET_TAG.event_label,
    utagCategory: DELETE_R_POCKET_TAG.event_category
  };
}
export enum PocketModificationType {
  AutoRenewal = 'AutoRenewal',
  AutoRates = 'AutoRates',
  Status = 'Status'
}

const modificationTypeMap = {
  [PocketModificationType.AutoRates]: mapRenewProfitsResponse,
  [PocketModificationType.AutoRenewal]: mapRenewAutomaticallyResponse,
  default: mapPocketStatusResponse
};

export function getMappedResponse(
  modificationType: PocketModificationType,
  payload: any
) {
  return (modificationTypeMap[modificationType] || modificationTypeMap.default)(
    payload
  );
}

export function mapRenewAutomaticallyResponse(
  payload: UpdatePocketWithReturnsPayload
): ToastProperties {
  return {
    type: ToastType.success,
    title: payload.renewAutomatically
      ? 'POCKET_WITH_RETURNS.POCKET_DETAIL.TOAST.RENEW_AUTOMATICALLY.ACTIVE'
      : 'POCKET_WITH_RETURNS.POCKET_DETAIL.TOAST.RENEW_AUTOMATICALLY.PAUSED'
  };
}

export function mapRenewProfitsResponse(
  payload: UpdatePocketWithReturnsPayload
): ToastProperties {
  return {
    type: ToastType.success,
    title: payload.renewProfits
      ? 'POCKET_WITH_RETURNS.POCKET_DETAIL.TOAST.RENEW_PROFIT.ACTIVE'
      : 'POCKET_WITH_RETURNS.POCKET_DETAIL.TOAST.RENEW_PROFIT.PAUSED'
  };
}

export function getMappedError(
  modificationType: PocketModificationType,
  payload: any,
  error: HttpErrorResponse
) {
  return (
    modificationErrorsMap[modificationType] || modificationErrorsMap.default
  )(payload, error);
}

const modificationErrorsMap = {
  [PocketModificationType.AutoRates]: mapRenewProfitsError,
  [PocketModificationType.AutoRenewal]: mapRenewAutomaticallyError,
  default: mapPocketStatusError
};

export function mapRenewAutomaticallyError(
  payload: UpdatePocketWithReturnsPayload,
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'pocket-status-error-alert',
    title: payload.renewAutomatically
      ? 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.ERROR.RENEW_AUTOMATICALLY.ACTIVATE'
      : 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.ERROR.RENEW_AUTOMATICALLY.PAUSED',
    description: mapError(error)
  };
}

export function mapRenewProfitsError(
  payload: UpdatePocketWithReturnsPayload,
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'pocket-status-error-alert',
    title: payload.renewProfits
      ? 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.ERROR.RENEW_PROFIT.ACTIVATE'
      : 'POCKET_WITH_RETURNS.POCKET_DETAIL.ALERTS.ERROR.RENEW_PROFIT.PAUSED',
    description: mapError(error)
  };
}
