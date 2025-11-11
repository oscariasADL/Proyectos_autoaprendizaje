import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum PocketPaySlide {
  pay = 'pay',
  confirmation = 'confirmation'
}

export const PocketPayStep = {
  [PocketPaySlide.pay]: 0,
  [PocketPaySlide.confirmation]: 1
};

export const POCKET_PAY_STEPS: Step[] = [
  {
    id: PocketPayStep[PocketPaySlide.pay],
    label: 'POCKETS.PAY.STEPS.PAY'
  },
  {
    id: PocketPayStep[PocketPaySlide.confirmation],
    label: 'POCKETS.PAY.STEPS.CONFIRM'
  }
];

export const POCKET_PAY_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'pocket-pay-confirm-exit-alert',
  title: 'POCKETS.PAY.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
