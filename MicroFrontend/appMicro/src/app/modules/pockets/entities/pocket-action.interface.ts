import { FeatureFlagsKey } from '@commons/entities/parameters/feature-flags.entities';
import {
  DELETE_POCKET_EVENT,
  DELETE_POCKET_R_EVENT,
  MODIFY_POCKET_EVENT,
  MODIFY_POCKET_R_EVENT,
  POCKET_ADD_CASH_EVENT,
  POCKET_ADD_CASH_R_EVENT,
  TRANSFER_FROM_POCKET_EVENT,
  TRANSFER_FROM_POCKET_R_EVENT
} from '../constants/resume.constants';

export interface PocketAction {
  type: PocketActionType;
  label: string;
  icon: string;
  id: string;
  featureFlagKey?: FeatureFlagsKey;
  utag: string;
  utagCategory: string;
}

export enum PocketActionType {
  Pay = 'Pay',
  Modify = 'Modify',
  Remove = 'Remove',
  Transfer = 'Transfer',
  ChangeStatus = 'ChangeStatus',
  Movements = 'Movements'
}

export const POCKET_WITH_RETURNS_ACTIONS: PocketAction[] = [
  {
    label: 'Abonar',
    icon: '/assets/images/illustrations/pockets/payment.svg',
    type: PocketActionType.Pay,
    id: 'pay-action',
    featureFlagKey: FeatureFlagsKey.PocketsPay,
    utag: POCKET_ADD_CASH_R_EVENT.event_label,
    utagCategory: POCKET_ADD_CASH_R_EVENT.event_category
  },
  {
    label: 'Modificar',
    icon: '/assets/images/illustrations/pockets/list.svg',
    type: PocketActionType.Modify,
    id: 'edit-action',
    featureFlagKey: FeatureFlagsKey.PocketsEdit,
    utag: MODIFY_POCKET_R_EVENT.event_label,
    utagCategory: MODIFY_POCKET_R_EVENT.event_category
  },
  {
    label: 'Eliminar',
    icon: '/assets/images/illustrations/pockets/delete.svg',
    type: PocketActionType.Remove,
    id: 'remove-action',
    featureFlagKey: FeatureFlagsKey.PocketsDelete,
    utag: DELETE_POCKET_R_EVENT.event_label,
    utagCategory: DELETE_POCKET_R_EVENT.event_category
  },
  {
    label: 'Transferir',
    icon: '/assets/images/illustrations/pockets/transfer.svg',
    type: PocketActionType.Transfer,
    id: 'transfer-action',
    featureFlagKey: FeatureFlagsKey.PocketsTransfer,
    utag: TRANSFER_FROM_POCKET_R_EVENT.event_label,
    utagCategory: TRANSFER_FROM_POCKET_R_EVENT.event_category
  }
];

export const POCKET_ACTIONS: PocketAction[] = [
  {
    label: 'Abonar',
    icon: '/assets/images/illustrations/pockets/payment.svg',
    type: PocketActionType.Pay,
    id: 'pay-action',
    featureFlagKey: FeatureFlagsKey.PocketsPay,
    utag: POCKET_ADD_CASH_EVENT.event_label,
    utagCategory: POCKET_ADD_CASH_EVENT.event_category
  },
  {
    label: 'Modificar',
    icon: '/assets/images/illustrations/pockets/list.svg',
    type: PocketActionType.Modify,
    id: 'edit-action',
    featureFlagKey: FeatureFlagsKey.PocketsEdit,
    utag: MODIFY_POCKET_EVENT.event_label,
    utagCategory: MODIFY_POCKET_EVENT.event_category
  },
  {
    label: 'Eliminar',
    icon: '/assets/images/illustrations/pockets/delete.svg',
    type: PocketActionType.Remove,
    id: 'remove-action',
    featureFlagKey: FeatureFlagsKey.PocketsDelete,
    utag: DELETE_POCKET_EVENT.event_label,
    utagCategory: DELETE_POCKET_EVENT.event_category
  },
  {
    label: 'Transferir',
    icon: '/assets/images/illustrations/pockets/transfer.svg',
    type: PocketActionType.Transfer,
    id: 'transfer-action',
    featureFlagKey: FeatureFlagsKey.PocketsTransfer,
    utag: TRANSFER_FROM_POCKET_EVENT.event_label,
    utagCategory: TRANSFER_FROM_POCKET_EVENT.event_category
  }
];
