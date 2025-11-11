import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum PocketCreateSlide {
  data = 'data',
  settings = 'settings',
  confirmation = 'confirmation'
}

export const PocketCreateStep = {
  [PocketCreateSlide.data]: 0,
  [PocketCreateSlide.settings]: 1,
  [PocketCreateSlide.confirmation]: 2
};

export const POCKET_CREATE_STEPS: Step[] = [
  {
    id: PocketCreateStep[PocketCreateSlide.data],
    label: 'POCKETS.CREATE.STEPS.DATA'
  },
  {
    id: PocketCreateStep[PocketCreateSlide.settings],
    label: 'POCKETS.CREATE.STEPS.SETTINGS'
  },
  {
    id: PocketCreateStep[PocketCreateSlide.confirmation],
    label: 'POCKETS.CREATE.STEPS.CONFIRM'
  }
];

export const POCKET_CREATE_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'pocket-create-confirm-exit-alert',
  title: 'POCKETS.CREATE.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const POCKET_CREATE_AVAILABLE_FIELD = 'availableBalance';
