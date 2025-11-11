import { SideMenuItem } from '@commons/components/side-menu/entities/side-menu.interface';
import { SecureKeys } from '@commons/constants/keys.constants';
import {
  PENDING_TRANSFERS,
  REQUEST_TRANSFIYA_TRANSFER,
  SEND_TRANSFIYA_TRANSFER,
  TRUST_RELATION
} from '@commons/constants/navigate.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const TRANSFERS_TRANSFIYA_LIST: SideMenuItem[] = [
  {
    label: 'TRANSFERS.TRANSFIYA.ITEMS.SEND_TRANSFIYA',
    icon: 'icon-giros_y_transferencias',
    url: SEND_TRANSFIYA_TRANSFER,
    id: 'send-transfiya-transfer-btn'
  },
  {
    label: 'TRANSFERS.TRANSFIYA.ITEMS.REQUEST_TRANSFIYA',
    icon: 'icon-mis_otros_creditos',
    url: REQUEST_TRANSFIYA_TRANSFER,
    id: 'request-transfiya-transfer-btn'
  },
  {
    label: 'TRANSFERS.TRANSFIYA.ITEMS.PENDING_TRANSFIYA',
    icon: 'icon-formulario',
    url: PENDING_TRANSFERS,
    id: 'pending-transfiya-transfer-btn'
  },
  {
    label: 'TRANSFERS.TRANSFIYA.ITEMS.TRUST_RELATION',
    icon: 'icon-contacts',
    url: TRUST_RELATION,
    id: 'trust-relation-transfer-btn'
  }
];

export const TRANSFERS_TRANSFIYA_HOME_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.question,
  panelKey: SecureKeys.hiddenTransfersTransfiyaHomeInfo,
  id: 'transfers-avv-phone-alert-info',
  title: 'TRANSFERS.TRANSFIYA.INFO_HOME_ALERT.TITLE',
  icon: 'icons/transfers-transfiya-info.svg',
  description: 'TRANSFERS.TRANSFIYA.INFO_HOME_ALERT.DESCRIPTION',
  linkText: 'TRANSFERS.TRANSFIYA.INFO_HOME_ALERT.LINK',
  linkIcon: 'icon-info',
  hideCloseButton: true,
  buttons: ['ACTIONS.COPY_THAT']
};
