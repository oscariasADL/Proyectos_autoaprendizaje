import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';

export enum TransferContactSlide {
  from = 'from',
  amount = 'amount',
  toward = 'toward',
  ownProducts = 'ownProducts',
  contactProducts = 'contactProducts',
  contactProductType = 'contactProductType',
  confirmation = 'confirmation'
}

export const TransferContactStep = {
  [TransferContactSlide.from]: 0,
  [TransferContactSlide.amount]: 1,
  [TransferContactSlide.toward]: 2,
  [TransferContactSlide.ownProducts]: 3,
  [TransferContactSlide.contactProducts]: 3,
  [TransferContactSlide.contactProductType]: 3.5,
  [TransferContactSlide.confirmation]: 4
};

export const TRANSFER_CONTACTS_STEPS: Step[] = [
  {
    id: TransferContactStep[TransferContactSlide.from],
    label: 'TRANSFERS.STEPS.FROM'
  },
  {
    id: TransferContactStep[TransferContactSlide.amount],
    label: 'TRANSFERS.STEPS.VALUE'
  },
  {
    id: TransferContactStep[TransferContactSlide.toward],
    label: 'TRANSFERS.STEPS.TO'
  },
  {
    id: TransferContactStep[TransferContactSlide.ownProducts],
    label: 'TRANSFERS.STEPS.TOWARD'
  },
  {
    id: TransferContactStep[TransferContactSlide.confirmation],
    label: 'TRANSFERS.STEPS.CONFIRM'
  }
];

export const TRANSFERS_CONTACTS_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersContactsInfo,
  id: 'transfers-contacts-alert-info',
  title: 'TRANSFERS.CONTACTS.INFO_ALERT.TITLE',
  icon: 'icons/transfers-contacts-info.svg',
  description: null,
  iconList: [
    {
      text: 'TRANSFERS.CONTACTS.INFO_ALERT.LIST.ITEM_1',
      icon: 'img/campaign-marketing/icon-wallet.svg'
    },
    {
      text: 'TRANSFERS.CONTACTS.INFO_ALERT.LIST.ITEM_2',
      icon: 'img/campaign-marketing/icon-money-credit.svg'
    },
    {
      text: 'TRANSFERS.CONTACTS.INFO_ALERT.LIST.ITEM_3',
      icon: 'img/campaign-marketing/icon-money-coin.svg'
    }
  ],
  buttons: ['ACTIONS.COPY_THAT']
};
export const TRANSFERS_REMITTANCES_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersRemittancesInfo,
  id: 'transfers-remittances-alert-info',
  title: 'TRANSFERS.REMITTANCES.INFO_ALERT.TITLE',
  icon: 'illustrations/pocket-money.svg',
  description: null,
  iconList: [
    {
      text: 'TRANSFERS.REMITTANCES.INFO_ALERT.LIST.ITEM_1',
      icon: 'img/remittances/icon-world.svg'
    },
    {
      text: 'TRANSFERS.REMITTANCES.INFO_ALERT.LIST.ITEM_2',
      icon: 'img/remittances/icon-money-send.svg'
    },
    {
      text: 'TRANSFERS.REMITTANCES.INFO_ALERT.LIST.ITEM_3',
      icon: 'img/campaign-marketing/icon-money-credit.svg'
    },
    {
      text: 'TRANSFERS.REMITTANCES.INFO_ALERT.LIST.ITEM_4',
      icon: 'img/campaign-marketing/icon-money-coin.svg'
    }
  ],
  checkText: 'TRANSFERS.REMITTANCES.INFO_ALERT.LIST.ITEM_5',
  checkTextLink: 'TRANSFERS.REMITTANCES.INFO_ALERT.LIST.ITEM_6',
  checkTextAfter: 'TRANSFERS.REMITTANCES.INFO_ALERT.LIST.ITEM_7',
  linkUrl:
    'https://www.avvillas.com.co/documents/37648/2382625/20210928+Politica-Proteccion-Datos-Personales-def+%282%29.pdf/0bcf1f1f-531b-ee48-9e33-b8314f301130?t=1686252189487',
  buttons: ['ACTIONS.COPY_THAT']
};
