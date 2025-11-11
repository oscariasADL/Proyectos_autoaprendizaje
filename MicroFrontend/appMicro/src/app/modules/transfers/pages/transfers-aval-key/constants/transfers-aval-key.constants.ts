import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { SecureKeys } from '@commons/constants/keys.constants';

export enum TransferAvalKeySlide {
  from = 'from',
  towardAvalKey = 'towardAvalKey',
  confirmation = 'confirmation'
}

export const TransferAvalKeyStep = {
  [TransferAvalKeySlide.from]: 0,
  [TransferAvalKeySlide.towardAvalKey]: 1,
  [TransferAvalKeySlide.confirmation]: 2
};

export const TRANSFER_AVAL_KEY_STEPS: Step[] = [
  {
    id: TransferAvalKeyStep[TransferAvalKeySlide.from],
    label: 'TRANSFERS.AVAL_KEY.STEPS.FROM'
  },
  {
    id: TransferAvalKeyStep[TransferAvalKeySlide.towardAvalKey],
    label: 'TRANSFERS.AVAL_KEY.STEPS.TOWARD'
  },
  {
    id: TransferAvalKeyStep[TransferAvalKeySlide.confirmation],
    label: 'TRANSFERS.AVAL_KEY.STEPS.CONFIRM'
  }
];

export const TRANSFERS_AVAL_KEY_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersAvalKeyInfo,
  id: 'transfers-avv-cel2cel-alert-info',
  title: 'TRANSFERS.AVAL_KEY.ALERT_INFO.TITLE',
  icon: 'aval-icons/tag-aval-transfers.svg',
  iconList: [
    {
      icon: 'img/icons/transfers-pockets.svg',
      text: 'TRANSFERS.AVAL_KEY.ALERT_INFO.TEXT_1'
    },
    {
      icon: 'img/icons/transfers-transfer.svg',
      text: 'TRANSFERS.AVAL_KEY.ALERT_INFO.TEXT_2'
    },
    {
      icon: 'img/icons/transfers-coin.svg',
      text: 'TRANSFERS.AVAL_KEY.ALERT_INFO.TEXT_3'
    }
  ],
  buttons: ['ACTIONS.COPY_THAT']
};

export const TRANSFER_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'transfer-confirm-exit-alert',
  title: 'TRANSFERS.EXIT_ALERT.TITLE',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION_CEL2CEL',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};
