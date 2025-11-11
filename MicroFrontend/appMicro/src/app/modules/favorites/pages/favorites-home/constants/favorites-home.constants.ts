import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const FAVORITES_DELETE_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.question,
  id: 'favorites-delete',
  icon: 'eliminar.svg',
  title: 'FAVORITES.DELETE.TITLE',
  description: 'FAVORITES.DELETE.DESCRIPTION',
  buttons: ['FAVORITES.DELETE.BUTTON', 'ACTIONS.NOT_CANCEL']
};
