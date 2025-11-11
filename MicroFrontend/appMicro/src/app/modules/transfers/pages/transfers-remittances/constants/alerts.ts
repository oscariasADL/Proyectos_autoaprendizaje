import { NotificationTypeEnum } from '@app/commons/components/notification/constants/notification.constants';
import { SecureKeys } from '@app/commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@app/commons/entities/alert/alert-sheet.entities';

export const REMITTANCES_LINK_ALERT_PROPS: AlertSheetProperties = {
  id: 'open-external-remittances-url-alert',
  type: AlertSheetType.question,
  componentType: AlertComponentType.alertSheet,
  icon: 'illustrations/woman-computer.svg',
  description: 'REDIRECT_REMITTANCES.DESCRIPTION',
  buttons: ['REDIRECT_REMITTANCES.CONTINUE', 'REDIRECT_REMITTANCES.CANCEL'],
  utagCategory: 'Remittances',
  utag: 'Remittances - create customer',
  showNotification: true,
  notificationIcon: 'icon-info',
  notificationType: NotificationTypeEnum.info
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
