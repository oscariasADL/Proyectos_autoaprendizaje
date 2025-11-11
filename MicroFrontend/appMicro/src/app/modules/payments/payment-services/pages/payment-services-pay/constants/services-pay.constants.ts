import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum ServicesPaySlide {
  from = 'from',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const ServicesPayStep = {
  [ServicesPaySlide.from]: 0,
  [ServicesPaySlide.amount]: 1,
  [ServicesPaySlide.confirmation]: 2
};

export const SERVICES_PAY_STEPS: Step[] = [
  {
    id: ServicesPayStep[ServicesPaySlide.from],
    label: 'PAYMENTS.SERVICES.STEPS.FROM'
  },
  {
    id: ServicesPayStep[ServicesPaySlide.amount],
    label: 'PAYMENTS.SERVICES.STEPS.VALUE'
  },
  {
    id: ServicesPayStep[ServicesPaySlide.confirmation],
    label: 'PAYMENTS.SERVICES.STEPS.CONFIRM'
  }
];

export const SERVICES_PAY_BILL_STEPS: Step[] = [
  {
    id: ServicesPayStep[ServicesPaySlide.from],
    label: 'PAYMENTS.SERVICES.STEPS.FROM'
  },
  {
    id: ServicesPayStep[ServicesPaySlide.confirmation] - 1,
    label: 'PAYMENTS.SERVICES.STEPS.CONFIRM'
  }
];

export const SERVICES_PAY_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'services-pay-confirm-exit-alert',
  title: 'PAYMENTS.SERVICES.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const SERVICES_PAY_AVAILABLE_FIELD = 'availableBalance';
