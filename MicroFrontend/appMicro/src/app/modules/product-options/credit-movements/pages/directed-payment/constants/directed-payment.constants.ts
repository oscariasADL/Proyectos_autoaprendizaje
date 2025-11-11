import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetIcon,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum DirectedPaymentSlide {
  movement,
  amount,
  //from,
  confirmation
}

export const DIRECTED_PAYMENT_STEPS: Step[] = [
  {
    id: DirectedPaymentSlide.movement,
    label: 'DIRECTED_PAYMENTS.STEPS.MOVEMENT'
  },
  {
    id: DirectedPaymentSlide.amount,
    label: 'DIRECTED_PAYMENTS.STEPS.VALUE'
  },
  /*{
    id: DirectedPaymentSlide.from,
    label: 'DIRECTED_PAYMENTS.STEPS.FROM'
  },*/
  {
    id: DirectedPaymentSlide.confirmation,
    label: 'DIRECTED_PAYMENTS.STEPS.CONFIRM'
  }
];

export const CREDIT_MOVEMENTS_RESTRICTED_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'alert-credit-movements-restricted-error',
  componentType: AlertComponentType.alertSheet,
  icon: AlertSheetIcon.error,
  title: 'UPDATE_INSTALLMENTS.RESTRICTED_EMPTY_MOVEMENTS',
  buttons: ['ACTIONS.COPY_THAT']
};

export const DIRECTED_PAYMENT_RESTRICTED_ERROR: AlertSheetProperties = {
  type: AlertSheetType.error,
  id: 'alert-update-installments-restricted-error',
  componentType: AlertComponentType.alertSheet,
  icon: AlertSheetIcon.error,
  title: 'UPDATE_INSTALLMENTS.RESTRICTED_ERROR',
  buttons: ['ACTIONS.COPY_THAT']
};

export const DIRECTED_PAYMENT_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'directed-payment-confirm-exit-alert',
  title: 'DIRECTED_PAYMENTS.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const DIRECTED_PAYMENT_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenDirectedPaymentInfo,
  id: 'directed-payments-alert-info',
  title: 'DIRECTED_PAYMENTS.INFO_ALERT.TITLE',
  icon: 'pagos-dirigidos.svg',
  description: 'DIRECTED_PAYMENTS.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const DIRECTED_PAYMENT_AVAILABLE_FIELD = 'availableBalance';
