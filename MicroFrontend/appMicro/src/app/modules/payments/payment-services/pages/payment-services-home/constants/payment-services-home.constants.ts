import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const PAYMENT_SERVICES_SCHEDULING_DELETE_ALERT: AlertSheetProperties = {
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  id: 'payment-services-scheduling-delete-alert',
  icon: 'icons/eliminar.svg',
  title: 'PAYMENTS.SERVICES.SCHEDULING.DELETE.TITLE',
  buttons: [
    'PAYMENTS.SERVICES.SCHEDULING.DELETE.ACTIONS.DELETE',
    'PAYMENTS.SERVICES.SCHEDULING.DELETE.ACTIONS.CANCEL'
  ]
};
