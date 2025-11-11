import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { GenericResponse } from '@commons/entities/response/response.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { HttpErrorResponse } from '@angular/common/http';
import { mapError } from '@commons/helpers/http.helpers';

export function mapPaymentServiceCreateSchedulingResponse(
  response: GenericResponse,
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    componentType: AlertComponentType.alertSheet,
    id: 'services-scheduling-success-alert',
    title: 'PAYMENTS.SERVICES.SCHEDULING.CREATE.ALERTS.SUCCESS.TITLE',
    description: 'PAYMENTS.SERVICES.SCHEDULING.APPROVAL',
    icon: AlertSheetIcon.success,
    reference: response.approvalId,
    items,
    denyDownload: true,
    buttons: ['ACTIONS.COPY_THAT']
  };
}

export function mapPaymentServiceCreateSchedulingError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'services-scheduling-error-alert',
    title: 'PAYMENTS.SERVICES.SCHEDULING.CREATE.ALERTS.ERROR.TITLE',
    description: mapError(error)
  };
}

export function mapPaymentServiceEditSchedulingResponse(
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'services-scheduling-success-alert',
    title: 'PAYMENTS.SERVICES.SCHEDULING.EDIT.ALERTS.SUCCESS.TITLE',
    items,
    denyDownload: true,
    buttons: ['ACTIONS.COPY_THAT']
  };
}

export function mapPaymentServiceEditSchedulingError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'services-scheduling-error-alert',
    title: 'PAYMENTS.SERVICES.SCHEDULING.EDIT.ALERTS.ERROR.TITLE',
    description: mapError(error)
  };
}

export function mapPaymentServiceDeleteSchedulingResponse(
  items: VoucherItem[]
): AlertSheetProperties {
  return {
    type: AlertSheetType.success,
    id: 'services-scheduling-success-alert',
    title: 'PAYMENTS.SERVICES.SCHEDULING.DELETE.ALERTS.SUCCESS.TITLE',
    items,
    denyDownload: true,
    buttons: ['ACTIONS.COPY_THAT'],
    message: 'PAYMENTS.SERVICES.SCHEDULING.DELETE.ALERTS.SUCCESS.NOTE'
  };
}

export function mapPaymentServiceDeleteSchedulingError(
  error: HttpErrorResponse
): AlertSheetProperties {
  return {
    type: AlertSheetType.error,
    id: 'services-scheduling-error-alert',
    title: 'PAYMENTS.SERVICES.SCHEDULING.DELETE.ALERTS.ERROR.TITLE',
    description: mapError(error)
  };
}
