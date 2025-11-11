import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransferAvvAccountSlide {
  from = 'from',
  amount = 'amount',
  towardAccount = 'towardAccount',
  confirmation = 'confirmation'
}

export const TransferAvvAccountStep = {
  [TransferAvvAccountSlide.from]: 0,
  [TransferAvvAccountSlide.amount]: 1,
  [TransferAvvAccountSlide.towardAccount]: 2,
  [TransferAvvAccountSlide.confirmation]: 3
};

export const TRANSFER_AVV_ACCOUNT_STEPS: Step[] = [
  {
    id: TransferAvvAccountStep[TransferAvvAccountSlide.from],
    label: 'TRANSFERS.AVV_ACCOUNT.STEPS.FROM'
  },
  {
    id: TransferAvvAccountStep[TransferAvvAccountSlide.amount],
    label: 'TRANSFERS.AVV_ACCOUNT.STEPS.VALUE'
  },
  {
    id: TransferAvvAccountStep[TransferAvvAccountSlide.towardAccount],
    label: 'TRANSFERS.AVV_ACCOUNT.STEPS.TOWARD'
  },
  {
    id: TransferAvvAccountStep[TransferAvvAccountSlide.confirmation],
    label: 'TRANSFERS.AVV_ACCOUNT.STEPS.CONFIRM'
  }
];

export const TRANSFERS_AVV_ACCOUNT_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersAvvAccountInfo,
  id: 'transfers-avv-account-alert-info',
  title: 'TRANSFERS.AVV_ACCOUNT.INFO_ALERT.TITLE',
  icon: 'illustrationsV2/transferencia-regular.svg',
  description: 'TRANSFERS.AVV_ACCOUNT.INFO_ALERT.DESCRIPTION',
  buttons: ['ACTIONS.COPY_THAT']
};
