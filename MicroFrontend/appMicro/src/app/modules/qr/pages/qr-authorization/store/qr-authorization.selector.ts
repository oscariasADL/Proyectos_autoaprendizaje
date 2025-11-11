import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  QRAuthorizationModuleName,
  QrAuthorizationState
} from '@modules/qr/pages/qr-authorization/store/qr-authorization.state';

const qrAuthorizationState = createFeatureSelector<QrAuthorizationState>(
  QRAuthorizationModuleName
);

export const transactionTitleSelector = createSelector(
  qrAuthorizationState,
  (state: QrAuthorizationState) => state.transactionTitle
);

export const decryptedDataSelector = createSelector(
  qrAuthorizationState,
  (state: QrAuthorizationState) => state.decryptedData
);

export const dynamicCodeSelector = createSelector(
  qrAuthorizationState,
  (state: QrAuthorizationState) => state.dynamicCode
);

export const qrAuthorizationWorkingSelector = createSelector(
  qrAuthorizationState,
  (state: QrAuthorizationState) => state.working
);

export const qrAuthorizationCompletedSelector = createSelector(
  qrAuthorizationState,
  (state: QrAuthorizationState) => state.completed
);
