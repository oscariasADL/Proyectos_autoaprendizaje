import { FindOtherFeaturesType } from '@commons/components/find-other-features/find-other-features.constants';
import {
  AlertComponentType,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const OTHER_FEATURES_TRANSFERS_ALERT = {
  id: 'alert-other-features-transfers',
  type: AlertSheetType.option,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/navegador-buscar-regular.svg',
  description:
    'Encuentra <b>Avance de tarjeta</b> y <b>Utilización de cupo rotativo</b> en el menú de acciones rápidas de tu Producto '
};

export const OTHER_FEATURES_PAYMENTS_ALERT = {
  id: 'alert-other-features-payments',
  type: AlertSheetType.option,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrationsV2/navegador-buscar-regular.svg',
  description:
    'Encuentra <b>Compra de cartera</b>, <b>Pagos dirigidos</b> y <b>Modificar cuota</b> en el menú de acciones rápidas de tu producto'
};

export const OTHER_FEATURES_ALERT = {
  [FindOtherFeaturesType.transfers]: OTHER_FEATURES_TRANSFERS_ALERT,
  [FindOtherFeaturesType.payments]: OTHER_FEATURES_PAYMENTS_ALERT
};
