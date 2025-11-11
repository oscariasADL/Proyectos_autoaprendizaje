import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum CashWithdrawalsSlide {
  productOrigin = 'productOrigin',
  cashWithdrawalChannel = 'cashWithdrawalChannel',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const CashWithdrawalsStep = {
  [CashWithdrawalsSlide.productOrigin]: 0,
  [CashWithdrawalsSlide.cashWithdrawalChannel]: 1,
  [CashWithdrawalsSlide.amount]: 2,
  [CashWithdrawalsSlide.confirmation]: 3
};

export const CASH_WITHDRAWALS_STEPS: Step[] = [
  {
    id: CashWithdrawalsStep[CashWithdrawalsSlide.productOrigin],
    label: 'Desde'
  },
  {
    id: CashWithdrawalsStep[CashWithdrawalsSlide.cashWithdrawalChannel],
    label: 'Dónde'
  },
  {
    id: CashWithdrawalsStep[CashWithdrawalsSlide.amount],
    label: 'Valor'
  },
  {
    id: CashWithdrawalsStep[CashWithdrawalsSlide.confirmation],
    label: 'Confirma'
  }
];

export const CASH_WITHDRAWALS_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'cash-withdrawals-confirm-exit-alert',
  title: '¿Quieres cancelar el retiro?',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
