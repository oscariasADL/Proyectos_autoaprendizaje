import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum RechargesSlide {
  productOrigin = 'productOrigin',
  operator = 'operator',
  phoneNumber = 'phoneNumber',
  amount = 'amount',
  confirmation = 'confirmation'
}

export const RechargesStep = {
  [RechargesSlide.productOrigin]: 0,
  [RechargesSlide.operator]: 1,
  [RechargesSlide.phoneNumber]: 2,
  [RechargesSlide.amount]: 3,
  [RechargesSlide.confirmation]: 4
};

export const RECHARGES_STEPS: Step[] = [
  {
    id: RechargesStep[RechargesSlide.productOrigin],
    label: 'RECHARGES.STEPS.FROM'
  },
  {
    id: RechargesStep[RechargesSlide.operator],
    label: 'RECHARGES.STEPS.OPERATOR'
  },
  {
    id: RechargesStep[RechargesSlide.phoneNumber],
    label: 'RECHARGES.STEPS.PHONE_NUMBER'
  },
  {
    id: RechargesStep[RechargesSlide.amount],
    label: 'RECHARGES.STEPS.VALUE'
  },
  {
    id: RechargesStep[RechargesSlide.confirmation],
    label: 'RECHARGES.STEPS.CONFIRM'
  }
];

export const RECHARGES_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'recharges-confirm-exit-alert',
  title: 'RECHARGES.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
export const RECHARGES_AVAILABLE_FIELD = 'availableBalance';
