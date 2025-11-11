import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { SecureKeys } from '@commons/constants/keys.constants';

export const TRANSFERS_AVV_CEL2CEL_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransferSCel2CelInfo,
  id: 'transfers-avv-cel2cel-alert-info',
  title: 'TRANSFERS.CEL2CEL.ALERT_INFO.TITLE',
  icon: 'illustrationsV2/celular-billete-small.svg',
  iconList: [
    {
      icon: 'img/icons/transfers-transfer.svg',
      text: 'TRANSFERS.CEL2CEL.ALERT_INFO.TEXT_1'
    },
    {
      icon: 'img/icons/transfers-money.svg',
      text: 'TRANSFERS.CEL2CEL.ALERT_INFO.TEXT_2'
    },
    {
      icon: 'img/icons/transfers-pockets.svg',
      text: 'TRANSFERS.CEL2CEL.ALERT_INFO.TEXT_3'
    },
    {
      icon: 'img/icons/transfers-coin.svg',
      text: 'TRANSFERS.CEL2CEL.ALERT_INFO.TEXT_4'
    }
  ],
  buttons: ['ACTIONS.COPY_THAT']
};
