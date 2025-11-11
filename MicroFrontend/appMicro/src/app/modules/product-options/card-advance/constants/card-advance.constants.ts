import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum CardAdvanceSlide {
  from = 'from',
  toward = 'toward',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const CardAdvanceStep = {
  [CardAdvanceSlide.from]: 0,
  [CardAdvanceSlide.toward]: 1,
  [CardAdvanceSlide.amount]: 2,
  [CardAdvanceSlide.confirmation]: 3
};

export const CARD_ADVANCE_STEPS: Step[] = [
  {
    id: CardAdvanceStep[CardAdvanceSlide.from],
    label: 'Desde'
  },
  {
    id: CardAdvanceStep[CardAdvanceSlide.toward],
    label: 'Hacia'
  },
  {
    id: CardAdvanceStep[CardAdvanceSlide.amount],
    label: 'Valor'
  },
  {
    id: CardAdvanceStep[CardAdvanceSlide.confirmation],
    label: 'Confirma'
  }
];

export const CARD_ADVANCE_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'card-advance-confirm-exit-alert',
  title: '¿Estás seguro salir y cancelar el avance de tarjeta?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const DEFAULT_CARD_ADVANCE_INSTALLMENTS = 12;
export const CARD_ADVANCE_AVAILABLE_FIELD = 'availableAdvanceBalance';
