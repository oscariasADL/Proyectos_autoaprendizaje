import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import { PocketTransferItemType } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';

export enum PocketTransferType {
  parentAccount = 'parentAccount',
  otherPocket = 'otherPocket'
}

export const POCKET_TRANSFER_TYPES: PocketTransferItemType[] = [
  {
    label: 'POCKETS.TRANSFER.TYPES.OWN_ACCOUNT',
    value: PocketTransferType.parentAccount
  },
  {
    label: 'POCKETS.TRANSFER.TYPES.POCKETS',
    value: PocketTransferType.otherPocket
  }
];

export enum PocketTransferSlide {
  transfer = 'transfer',
  confirmation = 'confirmation'
}

export const PocketTransferStep = {
  [PocketTransferSlide.transfer]: 0,
  [PocketTransferSlide.confirmation]: 1
};

export const POCKET_TRANSFER_STEPS: Step[] = [
  {
    id: PocketTransferStep[PocketTransferSlide.transfer],
    label: 'POCKETS.TRANSFER.STEPS.TRANSFER'
  },
  {
    id: PocketTransferStep[PocketTransferSlide.confirmation],
    label: 'POCKETS.TRANSFER.STEPS.CONFIRM'
  }
];

export const POCKET_TRANSFER_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'pocket-transfer-confirm-exit-alert',
  title: 'POCKETS.TRANSFER.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const POCKET_TRANSFER_CONFIRM_ALERT: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'illustrations/transfer-money.svg',
  id: 'pocket-transfer-confirm-alert',
  title: 'POCKETS.TRANSFER.CONFIRM_ALERT.TITLE',
  description: 'POCKETS.TRANSFER.CONFIRM_ALERT.DESCRIPTION',
  buttons: [
    'POCKETS.TRANSFER.CONFIRM_ALERT.CANCEL_ACTION',
    'POCKETS.TRANSFER.CONFIRM_ALERT.CONFIRM_ACTION'
  ]
};
