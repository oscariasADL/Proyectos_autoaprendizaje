import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const COMPLEMENTARY_SERVICE_DEACTIVATE_CONFIRM = {
  id: 'alert-complementary-service-deactivate-confirm',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'billete.svg',
  title: '¿Quieres desactivar tus servicios complemetarios?',
  description:
    'Para activarlos necesitarás pedir una clave  de registro en oficina o cajero.',
  buttons: ['Sí, desactivar', 'No, volver']
};

export const COMPLEMENTARY_SERVICE_ERROR_MESSAGE =
  'No fue posible cambiar tus servicios complementarios';
