import { type } from '@commons/utils/util';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import * as extractsActions from '@modules/documents/pages/extracts/store/extracts.actions';
import * as taxActions from '@modules/documents/pages/tax/store/tax.actions';
import { pocketDeleteSuccessAction } from '@modules/pockets/pages/pocket-delete/store/pocket-delete.actions';
import { pocketEditSuccessAction } from '@modules/pockets/pages/pocket-edit/store/pocket-edit.actions';
import { pocketPaySuccessAction } from '@modules/pockets/pages/pocket-pay/store/pocket-pay.actions';
import { updatePocketStatusSuccessAction } from '@modules/pockets/pages/pocket-status/store/pocket-status.actions';
import { pocketTransferSuccessAction } from '@modules/pockets/pages/pocket-transfer/store/pocket-transfer.actions';
import { createAction, props } from '@ngrx/store';
import * as notificationsActions from './notifications.action';
import * as removeTrustRelationActions from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.actions';
import * as favoritesCreateActions from '@commons/components/favorites/store/favorites-common.action';
import * as favoritesHomeActions from '@modules/favorites/pages/favorites-home/store/favorites-home.actions';
import * as favoritesEditActions from '@modules/favorites/pages/favorites-edit/store/favorites-edit.actions';
import * as pfmActions from '@modules/pfm/store/pfm.action';
import * as creditMovements from '@modules/product-options/credit-movements/store/credit-movements.action';
import { validateAndPushCardSuccessAction } from '@modules/wallets/store/wallets.actions';
import {
  deleteDefaultAccountErrorAction,
  deleteDefaultAccountSuccessAction
} from '@modules/transfers/pages/transfers-default-account/store/transfers-default-account.actions';
import * as securityMediaActions from '@modules/security/security-media-activation/store/security-media.action';
import * as pocketWithReturnsEditActions from '@modules/pockets/pages/edit-pocket-with-returns/store/edit-pocket-with-returns.actions';
import * as pocketDetailWithReturnsActions from '@modules/pockets/pages/pocket-detail-with-returns/store/pocket-detail-with-returns.actions';
import * as qrAuthorizationActions from '@app/modules/qr/pages/qr-authorization/store/qr-authorization.actions';
import * as breBTransfersActions from '@modules/transfers/pages/bre-b-transfers/store/bre-b-transfers.actions';

export const toastAction = createAction(
  type('[Global/UI] Set toast'),
  props<{ props?: ToastProperties }>()
);

export const closeToastsAction = createAction(type('[Global/UI] Close toasts'));

export const ToastObserverActionsTypes = [
  updatePocketStatusSuccessAction,
  pocketTransferSuccessAction,
  pocketDeleteSuccessAction,
  pocketEditSuccessAction,
  pocketPaySuccessAction,
  extractsActions.fetchExtractErrorAction,
  taxActions.fetchTaxCertificateErrorAction,
  notificationsActions.rejectTransfiyaAuthorizationSuccessAction,
  removeTrustRelationActions.removeTrustRelationSuccessAction,
  favoritesCreateActions.favoriteCreateErrorAction,
  favoritesHomeActions.deleteFavoritesErrorAction,
  favoritesEditActions.favoriteEditErrorAction,
  pfmActions.changeCategorySuccess,
  pfmActions.changeCategoryError,
  creditMovements.updateInstallmentsSuccessAction,
  validateAndPushCardSuccessAction,
  deleteDefaultAccountSuccessAction,
  deleteDefaultAccountErrorAction,
  securityMediaActions.temporaryBlockProductV2SuccessAction,
  securityMediaActions.unlockProductV2SuccessAction,
  pocketWithReturnsEditActions.pocketWithReturnsEditSuccessAction,
  pocketDetailWithReturnsActions.pocketWithReturnsDeleteSuccessAction,
  pocketDetailWithReturnsActions.updatePocketWithReturnsStatusSuccessAction,
  qrAuthorizationActions.sendTokenSuccess,
  qrAuthorizationActions.sendTokenFailure,
  breBTransfersActions.addSpiContactSuccessAction,
  breBTransfersActions.updateSpiContactSuccessAction
];
