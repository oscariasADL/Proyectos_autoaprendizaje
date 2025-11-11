import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export enum BlockCardTemporarilySlide {
  from = 'from',
  date = 'date',
  confirm = 'confirm'
}

export const BLOCK_CARD_TEMPORARILY_SLIDE = {
  [BlockCardTemporarilySlide.from]: 0,
  [BlockCardTemporarilySlide.date]: 1,
  [BlockCardTemporarilySlide.confirm]: 2
};

export const BLOCK_CARD_TEMPORARILY_STEPS: Step[] = [
  {
    id: BLOCK_CARD_TEMPORARILY_SLIDE[BlockCardTemporarilySlide.from],
    label: ''
  },
  {
    id: BLOCK_CARD_TEMPORARILY_SLIDE[BlockCardTemporarilySlide.date],
    label: ''
  },
  {
    id: BLOCK_CARD_TEMPORARILY_SLIDE[BlockCardTemporarilySlide.confirm],
    label: ''
  }
];

export const BLOCK_CARD_TEMPORARILY_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'qr-pay-confirm-exit-alert',
  title: '¿Estás seguro de salir y cancelar el bloqueo temporal de tu tarjeta?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
