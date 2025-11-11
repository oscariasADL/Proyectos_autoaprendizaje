import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransferSendMoneySlide {
  from = 'from',
  amount = 'amount',
  towardCellPhone = 'towardCellPhone',
  confirmation = 'confirmation'
}

export const TransferSendMoneyStep = {
  [TransferSendMoneySlide.from]: 0,
  [TransferSendMoneySlide.amount]: 1,
  [TransferSendMoneySlide.towardCellPhone]: 2,
  [TransferSendMoneySlide.confirmation]: 3
};

export const TRANSFER_SEND_MONEY_STEPS: Step[] = [
  {
    id: TransferSendMoneyStep[TransferSendMoneySlide.from],
    label: 'TRANSFERS.SEND_MONEY.STEPS.FROM'
  },
  {
    id: TransferSendMoneyStep[TransferSendMoneySlide.amount],
    label: 'TRANSFERS.SEND_MONEY.STEPS.VALUE'
  },
  {
    id: TransferSendMoneyStep[TransferSendMoneySlide.towardCellPhone],
    label: 'TRANSFERS.SEND_MONEY.STEPS.TOWARD'
  },
  {
    id: TransferSendMoneyStep[TransferSendMoneySlide.confirmation],
    label: 'TRANSFERS.SEND_MONEY.STEPS.CONFIRM'
  }
];

export const TRANSFERS_SEND_MONEY_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.question,
  panelKey: SecureKeys.hiddenTransfersSendMoneyInfo,
  id: 'transfers-send-money-alert-info',
  title: 'TRANSFERS.SEND_MONEY.INFO_ALERT.TITLE',
  icon: 'icons/transfers-transfiya-info.svg',
  description: 'TRANSFERS.SEND_MONEY.INFO_ALERT.DESCRIPTION',
  linkText: 'TRANSFERS.SEND_MONEY.INFO_ALERT.LINK',
  linkIcon: 'icon-info',
  hideCloseButton: true,
  /*itemList: [
    'TRANSFERS.SEND_MONEY.INFO_ALERT.LIST.ITEM_1',
    'TRANSFERS.SEND_MONEY.INFO_ALERT.LIST.ITEM_2'
  ],*/
  buttons: ['ACTIONS.COPY_THAT']
};
