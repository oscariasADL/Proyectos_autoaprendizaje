import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum SocialSecuritySlide {
  from,
  contributor,
  workSheet,
  value,
  confirmation
}

export const SOCIAL_SECURITY_STEPS: Step[] = [
  {
    id: SocialSecuritySlide.from,
    label: 'Desde'
  },
  {
    id: SocialSecuritySlide.contributor,
    label: 'Aportante'
  },
  {
    id: SocialSecuritySlide.workSheet,
    label: 'Planilla'
  },
  {
    id: SocialSecuritySlide.value,
    label: 'Valor'
  },
  {
    id: SocialSecuritySlide.confirmation,
    label: 'Confirma'
  }
];

export const SOCIAL_SECURITY_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'recharges-confirm-exit-alert',
  title: '¿Estás seguro salir y cancelar el pago PILA?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const SOCIAL_SECURITY_AVAILABLE_FIELD = 'availableBalance';
export const SOCIAL_SECURITY_PIN_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'alert-fill-current-password-error',
  componentType: AlertComponentType.alertSheet,
  title:
    'No fue posible encontrar una planilla vigente con los datos que ingresaste',
  buttons: ['Intentar de nuevo ']
};
