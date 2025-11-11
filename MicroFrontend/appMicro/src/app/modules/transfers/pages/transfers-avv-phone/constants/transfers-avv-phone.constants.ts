import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransferAvvPhoneSlide {
  from = 'from',
  amount = 'amount',
  towardCellPhone = 'towardCellPhone',
  confirmation = 'confirmation'
}

export const TransferAvvPhoneStep = {
  [TransferAvvPhoneSlide.from]: 0,
  [TransferAvvPhoneSlide.amount]: 1,
  [TransferAvvPhoneSlide.towardCellPhone]: 2,
  [TransferAvvPhoneSlide.confirmation]: 3
};

export const TRANSFER_AVV_PHONE_STEPS: Step[] = [
  {
    id: TransferAvvPhoneStep[TransferAvvPhoneSlide.from],
    label: 'TRANSFERS.AVV_PHONE.STEPS.FROM'
  },
  {
    id: TransferAvvPhoneStep[TransferAvvPhoneSlide.amount],
    label: 'TRANSFERS.AVV_PHONE.STEPS.VALUE'
  },
  {
    id: TransferAvvPhoneStep[TransferAvvPhoneSlide.towardCellPhone],
    label: 'TRANSFERS.AVV_PHONE.STEPS.TOWARD'
  },
  {
    id: TransferAvvPhoneStep[TransferAvvPhoneSlide.confirmation],
    label: 'TRANSFERS.AVV_PHONE.STEPS.CONFIRM'
  }
];

export const TRANSFERS_AVV_PHONE_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersAvvPhoneInfo,
  id: 'transfers-avv-phone-alert-info',
  title: 'TRANSFERS.AVV_PHONE.INFO_ALERT.TITLE',
  icon: 'icons/transfers-avv-phone-info.svg',
  description: 'TRANSFERS.AVV_PHONE.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};
