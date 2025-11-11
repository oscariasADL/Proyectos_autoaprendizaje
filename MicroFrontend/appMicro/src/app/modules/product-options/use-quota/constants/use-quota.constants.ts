import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum UseQuotaSlide {
  toward = 'toward',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const UseQuotaStep = {
  [UseQuotaSlide.toward]: 0,
  [UseQuotaSlide.amount]: 1,
  [UseQuotaSlide.confirmation]: 2
};

export const USE_QUOTA_STEPS: Step[] = [
  {
    id: UseQuotaStep[UseQuotaSlide.toward],
    label: 'Hacia'
  },
  {
    id: UseQuotaStep[UseQuotaSlide.amount],
    label: 'Valor'
  },
  {
    id: UseQuotaStep[UseQuotaSlide.confirmation],
    label: 'Confirma'
  }
];

export const USE_QUOTA_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'use-quota-confirm-exit-alert',
  title: '¿Estás seguro salir y cancelar el uso del cupo rotativo?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const USE_QUOTA_INSTALLMENTS_TYPE = 'U';
export const DEFAULT_USE_QUOTA_INSTALLMENTS = 36;
export const USE_QUOTA_AVAILABLE_FIELD = 'availableBalance';
