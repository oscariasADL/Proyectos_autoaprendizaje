import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransferRequestMoneySlide {
  from = 'from',
  amount = 'amount',
  toward = 'toward',
  confirmation = 'confirmation'
}

export const TransferRequestMoneyStep = {
  [TransferRequestMoneySlide.from]: 0,
  [TransferRequestMoneySlide.amount]: 1,
  [TransferRequestMoneySlide.toward]: 2,
  [TransferRequestMoneySlide.confirmation]: 3
};

export const TRANSFER_STEPS_REQUEST_MONEY: Step[] = [
  {
    id: TransferRequestMoneyStep[TransferRequestMoneySlide.from],
    label: 'TRANSFERS.STEPS.TARGET'
  },
  {
    id: TransferRequestMoneyStep[TransferRequestMoneySlide.amount],
    label: 'TRANSFERS.STEPS.VALUE'
  },
  {
    id: TransferRequestMoneyStep[TransferRequestMoneySlide.toward],
    label: 'TRANSFERS.STEPS.TO'
  },
  {
    id: TransferRequestMoneyStep[TransferRequestMoneySlide.confirmation],
    label: 'TRANSFERS.STEPS.CONFIRM'
  }
];

export const TRANSFERS_REQUEST_MONEY_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersRequestMoneyInfo,
  id: 'transfers-request-money-alert-info',
  title: 'TRANSFERS.REQUEST_MONEY.INFO_ALERT.TITLE',
  icon: 'illustrationsV2/transferencia-terceros-regular.svg',
  description: 'TRANSFERS.REQUEST_MONEY.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};

export const REQUEST_MONEY_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'transfer-confirm-request-transfiya',
  title: 'TRANSFERS.EXIT_ALERT.TITLE_REQUEST_TRANSFIYA',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
