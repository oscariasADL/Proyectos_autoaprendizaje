import {
  AlertComponentType,
  AlertSheetProperties
} from '@commons/entities/alert/alert-sheet.entities';
import { SecureKeys } from '@commons/constants/keys.constants';

export const TRANSFERS_ADMIN_TRANSFIYA_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertInfo,
  panelKey: SecureKeys.hiddenTransfersAdminTransfiyaInfo,
  id: 'transfers-avv-cel2cel-alert-info',
  title: 'TRANSFERS.ADMIN_TRANSFIYA.ALERT_INFO.TITLE',
  icon: 'icons/transfers-trust-relation.svg',
  itemList: [
    'TRANSFERS.ADMIN_TRANSFIYA.ALERT_INFO.ITEMS.ITEM_1',
    'TRANSFERS.ADMIN_TRANSFIYA.ALERT_INFO.ITEMS.ITEM_2'
  ],
  buttons: ['ACTIONS.COPY_THAT']
};
