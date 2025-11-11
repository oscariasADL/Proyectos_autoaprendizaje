import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransferUnregisteredAccountsSlide {
  from = 'from',
  amount = 'amount',
  to = 'to',
  towardAccount = 'towardAccount',
  towardCellPhone = 'towardCellPhone',
  confirmation = 'confirmation'
}

export const TransferUnregisteredAccountsStep = {
  [TransferUnregisteredAccountsSlide.from]: 0,
  [TransferUnregisteredAccountsSlide.amount]: 1,
  [TransferUnregisteredAccountsSlide.to]: 2,
  [TransferUnregisteredAccountsSlide.towardAccount]: 3,
  [TransferUnregisteredAccountsSlide.towardCellPhone]: 3,
  [TransferUnregisteredAccountsSlide.confirmation]: 4
};

export const TRANSFER_UNREGISTERED_ACCOUNTS_STEPS: Step[] = [
  {
    id: TransferUnregisteredAccountsStep[
      TransferUnregisteredAccountsSlide.from
    ],
    label: 'TRANSFERS.UNREGISTER_ACCOUNTS.STEPS.FROM'
  },
  {
    id: TransferUnregisteredAccountsStep[
      TransferUnregisteredAccountsSlide.amount
    ],
    label: 'TRANSFERS.UNREGISTER_ACCOUNTS.STEPS.VALUE'
  },
  {
    id: TransferUnregisteredAccountsStep[TransferUnregisteredAccountsSlide.to],
    label: 'TRANSFERS.UNREGISTER_ACCOUNTS.STEPS.TO'
  },
  {
    id: TransferUnregisteredAccountsStep[
      TransferUnregisteredAccountsSlide.towardAccount
    ],
    label: 'TRANSFERS.UNREGISTER_ACCOUNTS.STEPS.TOWARD'
  },
  {
    id: TransferUnregisteredAccountsStep[
      TransferUnregisteredAccountsSlide.confirmation
    ],
    label: 'TRANSFERS.UNREGISTER_ACCOUNTS.STEPS.CONFIRM'
  }
];

export const TRANSFERS_UNREGISTERED_ACCOUNTS_INFO_ALERT: AlertSheetProperties =
  {
    componentType: AlertComponentType.alertInfo,
    panelKey: SecureKeys.hiddenTransfersUnregisteredAccountsInfo,
    id: 'transfers-unregister-accounts-alert-info',
    title: 'TRANSFERS.UNREGISTER_ACCOUNTS.INFO_ALERT.TITLE',
    icon: 'icons/transferir.svg',
    description: 'TRANSFERS.UNREGISTER_ACCOUNTS.INFO_ALERT.DESCRIPTION',
    itemList: [
      'TRANSFERS.UNREGISTER_ACCOUNTS.INFO_ALERT.LIST.ITEM_1',
      'TRANSFERS.UNREGISTER_ACCOUNTS.INFO_ALERT.LIST.ITEM_2'
    ],
    message: 'TRANSFERS.UNREGISTER_ACCOUNTS.INFO_ALERT.MESSAGE',
    buttons: ['ACTIONS.COPY_THAT']
  };
