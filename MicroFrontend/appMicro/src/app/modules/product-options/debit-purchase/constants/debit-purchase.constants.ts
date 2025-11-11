import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum DebitPurchaseSlide {
  from = 'from',
  toward = 'toward',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const DebitPurchaseStep = {
  [DebitPurchaseSlide.from]: 0,
  [DebitPurchaseSlide.toward]: 1,
  [DebitPurchaseSlide.amount]: 2,
  [DebitPurchaseSlide.confirmation]: 3
};

export const DEBIT_PURCHASE_STEPS: Step[] = [
  {
    id: DebitPurchaseStep[DebitPurchaseSlide.from],
    label: 'Desde'
  },
  {
    id: DebitPurchaseStep[DebitPurchaseSlide.toward],
    label: 'Hacia'
  },
  {
    id: DebitPurchaseStep[DebitPurchaseSlide.amount],
    label: 'Valor'
  },
  {
    id: DebitPurchaseStep[DebitPurchaseSlide.confirmation],
    label: 'Confirma'
  }
];

export const DebitPurchaseRotatingStep = {
  [DebitPurchaseSlide.toward]: 0,
  [DebitPurchaseSlide.amount]: 1,
  [DebitPurchaseSlide.confirmation]: 2
};

export const DEBIT_PURCHASE_ROTATING_STEPS: Step[] = [
  {
    id: DebitPurchaseRotatingStep[DebitPurchaseSlide.toward],
    label: 'Hacia'
  },
  {
    id: DebitPurchaseRotatingStep[DebitPurchaseSlide.amount],
    label: 'Valor'
  },
  {
    id: DebitPurchaseRotatingStep[DebitPurchaseSlide.confirmation],
    label: 'Confirma'
  }
];

export const DEBIT_PURCHASE_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'debit-purchase-confirm-exit-alert',
  title: '¿Estás seguro salir y cancelar la compra de cartera?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const DEBIT_PURCHASE_INSTALLMENTS_TYPE = 'C';
export const DEBIT_PURCHASE_AVAILABLE_FIELD = 'availablePurchasesBalance';
export const DEBIT_PURCHASE_ROTATING_AVAILABLE_FIELD = 'availableBalance';
export const DEFAULT_DEBIT_PURCHASE_INSTALLMENTS = 60;
export const MIN_LOC_INSTALLMENTS = 4;
