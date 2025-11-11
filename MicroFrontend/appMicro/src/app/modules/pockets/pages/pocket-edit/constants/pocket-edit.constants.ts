import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum PocketEditSlide {
  update = 'update',
  confirmation = 'confirmation'
}

export const PocketEditStep = {
  [PocketEditSlide.update]: 0,
  [PocketEditSlide.confirmation]: 1
};

export const POCKET_EDIT_STEPS: Step[] = [
  {
    id: PocketEditStep[PocketEditSlide.update],
    label: 'POCKETS.EDIT.STEPS.MODIFY'
  },
  {
    id: PocketEditStep[PocketEditSlide.confirmation],
    label: 'POCKETS.EDIT.STEPS.CONFIRM'
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
