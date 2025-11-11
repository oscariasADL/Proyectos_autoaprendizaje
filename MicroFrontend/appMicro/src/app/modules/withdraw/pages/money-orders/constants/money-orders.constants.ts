import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum MoneyOrdersSlide {
  productOrigin = 'productOrigin',
  who = 'who',
  moneyOrderChannel = 'moneyOrderChannel',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const MoneyOrdersStep = {
  [MoneyOrdersSlide.productOrigin]: 0,
  [MoneyOrdersSlide.who]: 1,
  [MoneyOrdersSlide.moneyOrderChannel]: 2,
  [MoneyOrdersSlide.amount]: 3,
  [MoneyOrdersSlide.confirmation]: 4
};

export const MONEY_ORDERS_STEPS: Step[] = [
  {
    id: MoneyOrdersStep[MoneyOrdersSlide.productOrigin],
    label: 'Desde'
  },
  {
    id: MoneyOrdersStep[MoneyOrdersSlide.who],
    label: 'Hacia'
  },
  {
    id: MoneyOrdersStep[MoneyOrdersSlide.moneyOrderChannel],
    label: 'Dónde'
  },
  {
    id: MoneyOrdersStep[MoneyOrdersSlide.amount],
    label: 'Valor'
  },
  {
    id: MoneyOrdersStep[MoneyOrdersSlide.confirmation],
    label: 'Confirma'
  }
];

export const MONEY_ORDERS_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'money-orders-confirm-exit-alert',
  title: '¿Quieres cancelar el giro?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
