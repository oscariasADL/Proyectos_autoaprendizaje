import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export enum ActivateDigitalDebitCardSlide {
  info = 'info',
  config = 'config'
}

export const MIN_PRODUCTS_QUANTITY_TO_GROUP = 3;

export const ACTIVATE_DIGITAL_DEBIT_CARD_STEP = {
  [ActivateDigitalDebitCardSlide.info]: 0,
  [ActivateDigitalDebitCardSlide.config]: 1
};

export const ACTIVATE_DIGITAL_DEBIT_CARD_STEPS: Step[] = [
  {
    id: ACTIVATE_DIGITAL_DEBIT_CARD_STEP[ActivateDigitalDebitCardSlide.info],
    label: 'DIGITAL_DEBIT_CARD.ACTIVATE.STEPS.INFO'
  },
  {
    id: ACTIVATE_DIGITAL_DEBIT_CARD_STEP[ActivateDigitalDebitCardSlide.config],
    label: 'DIGITAL_DEBIT_CARD.ACTIVATE.STEPS.CONFIG'
  }
];

export const ACTIVATE_DIGITAL_DEBIT_CARD_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'qr-pay-confirm-exit-alert',
  title:
    '¿Estás seguro de salir y cancelar la activación tu tarjeta débito digital?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
