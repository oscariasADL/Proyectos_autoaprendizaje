import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const LOGOUT_ALERT = {
  id: 'alert-logout-confirm',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'icons/alert-error.svg',
  title: '¿Estás seguro que quieres salir de la aplicación?',
  buttons: ['Sí, salir', 'Volver']
};
