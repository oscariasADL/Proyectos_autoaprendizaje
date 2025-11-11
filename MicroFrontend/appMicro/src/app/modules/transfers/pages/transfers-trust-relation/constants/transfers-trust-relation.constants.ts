import { SecureKeys } from '@commons/constants/keys.constants';
import {
  AlertComponentType,
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';

export const TRANSFERS_TRUST_RELATION_INFO_ALERT: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.option,
  panelKey: SecureKeys.hiddenTransfersTrustRelationInfo,
  id: 'transfers-trust-relation-alert-info',
  icon: 'icons/transfers-trust-relation.svg',
  title: 'TRANSFERS.TRUST_RELATION.INFO_ALERT.TITLE',
  description: 'TRANSFERS.TRUST_RELATION.INFO_ALERT.DESCRIPTION',
  buttons: ['TRANSFERS.TRUST_RELATION.INFO_ALERT.BUTTON_TEXT']
};

export const TRANSFERS_TRUST_RELATION_REMOVE: AlertSheetProperties = {
  componentType: AlertComponentType.alertSheet,
  type: AlertSheetType.question,
  id: 'transfers-trust-relation-remove',
  icon: 'icons/eliminar.svg',
  title: 'TRANSFERS.TRUST_RELATION.REMOVE_ALERT.TITLE',
  description: 'TRANSFERS.TRUST_RELATION.REMOVE_ALERT.DESCRIPTION',
  buttons: ['TRANSFERS.TRUST_RELATION.ACTIONS.REMOVE_RELATION', 'ACTIONS.BACK']
};
