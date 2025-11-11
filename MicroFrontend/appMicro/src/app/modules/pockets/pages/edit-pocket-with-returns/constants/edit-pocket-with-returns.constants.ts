import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum EditPocketWithReturnsSlide {
  update = 'update',
  confirmation = 'confirmation'
}

export const EditPocketWithReturnsStep = {
  [EditPocketWithReturnsSlide.update]: 0,
  [EditPocketWithReturnsSlide.confirmation]: 1
};

export const POCKET_EDIT_STEPS: Step[] = [
  {
    id: EditPocketWithReturnsStep[EditPocketWithReturnsSlide.update],
    label: 'POCKETS.EDIT.STEPS.MODIFY'
  },
  {
    id: EditPocketWithReturnsStep[EditPocketWithReturnsSlide.confirmation],
    label: 'VIRTUAL_CREDIT_CARD.ACTIVATE.STEPS.INFO'
  }
];

export const POCKET_EDIT_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'pocket-update-confirm-exit-alert',
  title: 'POCKETS.EDIT.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
