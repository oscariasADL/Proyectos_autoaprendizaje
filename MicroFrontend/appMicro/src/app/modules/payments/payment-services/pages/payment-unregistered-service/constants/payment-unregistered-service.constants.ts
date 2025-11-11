import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum PaymentUnregisteredServiceSlide {
  from,
  service,
  reference,
  confirmation
}

export const PAYMENT_UNREGISTERED_SERVICE_STEPS: Step[] = [
  {
    id: PaymentUnregisteredServiceSlide.from,
    label: 'PAYMENTS.SERVICES.STEPS.FROM'
  },
  {
    id: PaymentUnregisteredServiceSlide.service,
    label: 'PAYMENTS.SERVICES.STEPS.SERVICE'
  },
  {
    id: PaymentUnregisteredServiceSlide.reference,
    label: 'PAYMENTS.SERVICES.STEPS.REFERENCE'
  },
  {
    id: PaymentUnregisteredServiceSlide.confirmation,
    label: 'PAYMENTS.SERVICES.STEPS.CONFIRM'
  }
];

export const PAYMENT_UNREGISTERED_SERVICE_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'debit-purchase-confirm-exit-alert',
  title: 'PAYMENTS.SERVICES.EXIT_ALERT.TITLE_UNREGISTERED',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const PAYMENT_UNREGISTERED_SERVICE_AVAILABLE_FIELD = 'availableBalance';
