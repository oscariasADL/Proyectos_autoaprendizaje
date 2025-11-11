import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const TRANSFERS_DEFAULT_ACCOUNT_REMOVE: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.question,
  id: 'transfers-trust-relation-remove',
  icon: 'icons/eliminar.svg',
  title:
    'TRANSFERS.TRANSFIYA.MANAGEMENT.ACCOUNT_DEFAULT.REMOVE_ACCOUNT.REMOVE_ALERT.TITLE',
  buttons: [
    'TRANSFERS.TRANSFIYA.MANAGEMENT.ACCOUNT_DEFAULT.REMOVE_ACCOUNT.REMOVE_ALERT.BUTTON_ACTION',
    'ACTIONS.BACK'
  ]
};
