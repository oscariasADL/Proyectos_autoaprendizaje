import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const CANCEL_PRODUCT_BALANCE_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'cancel-product-balance-error-alert',
  title: 'CANCEL_ACCOUNT.ALERT_BALANCE_ERROR.TITLE',
  description: 'CANCEL_ACCOUNT.ALERT_BALANCE_ERROR.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const NO_AVAILABLE_ADVANCE_BALANCE_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'no-available-advance-balance-error-alert',
  title: 'No es posible realizar avances.',
  description: 'No tienes cupo disponible para avances.',
  buttons: ['ACTIONS.COPY_THAT']
};
