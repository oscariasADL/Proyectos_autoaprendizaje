import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import { TransfiyaManagementTooltip } from '@modules/transfiya-management/entities/transfiya-management.interface';

export enum TransfiyaManagementSlide {
  management,
  confirmation
}

export const TRANSFIYA_MANAGEMENT_STEPS: Step[] = [
  {
    id: TransfiyaManagementSlide.management,
    label: 'Desde'
  },
  {
    id: TransfiyaManagementSlide.confirmation,
    label: 'Confirma'
  }
];

export const TRANSFIYA_ACCOUNT_DEFAULT_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  id: 'transfiya-management-account-default-alert-info',
  icon: 'iconsV2/heart-hand.svg',
  title: 'TRANSFERS.TRANSFIYA.MANAGEMENT.ACCOUNT_DEFAULT.ALERT_INFO.TITLE',
  description:
    'TRANSFERS.TRANSFIYA.MANAGEMENT.ACCOUNT_DEFAULT.ALERT_INFO.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const TRANSFIYA_MANAGEMENT_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'transfiya-management-confirm-exit-alert',
  title:
    '¿Estás seguro de rechazar esta transferencia? si lo haces se perdera esta transacción',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const TRANSFIYA_MANAGEMENT_REFUSE_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'errorde-carga.svg',
  id: 'transfiya-management-confirm-refuse-alert',
  buttons: ['Sí, rechazar', 'No, volver']
};

export const TRANSFIYA_MANAGEMENT_AVAILABLE_FIELD = 'availableBalance';

export const TRANSFIYA_MANAGEMENT_TOOLTIP_DEFAULT_ACCOUNT: TransfiyaManagementTooltip =
  {
    id: 'default-account-info-popover',
    title: 'Marcar cuenta favorita',
    text: 'Selecciona una Cuenta para recibir las transferencias de todos los que te envíen dinero sin tener que autorizarlas.'
  };

export const TRANSFIYA_MANAGEMENT_TOOLTIP_TRUST_RELATION: TransfiyaManagementTooltip =
  {
    id: 'trust-relation-info-popover',
    title: 'Relación de confianza',
    text: 'Marcando este contacto como Relación de confianza, siempre que te envíe plata la recibirás automáticamente en tu cuenta AV Villas.'
  };
