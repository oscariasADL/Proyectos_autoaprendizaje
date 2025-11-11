import { mapQrPaymentMethodData } from '@modules/qr/pages/qr-pay/mappers/qr-pay-product.mapper';
import {
  qrPayFeatureName,
  QrPayState
} from '@modules/qr/pages/qr-pay/store/qr-pay.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const qrPayState = createFeatureSelector<QrPayState>(qrPayFeatureName);

export const qrScanSelector = createSelector(
  qrPayState,
  (state: QrPayState) => state.qrScan
);

export const qrPayDataSelector = createSelector(
  qrPayState,
  (state: QrPayState) => state.qrData
);

export const qrPayTypeSelector = createSelector(
  qrPayState,
  (state: QrPayState) => state.qrData.trxPurpose
);

export const qrPaymentMethodsSelector = createSelector(
  qrPayState,
  (state: QrPayState) => state.qrPaymentMethods
);

export const qrPaymentMethodDataSelector = createSelector(
  qrPayState,
  (state: QrPayState) => mapQrPaymentMethodData(state.qrPaymentMethodData)
);

export const qrTypeSelector = createSelector(
  qrPayState,
  (state: QrPayState) => state.qrType
);

export const qrIsItBetweenAccountsSelector = createSelector(
  qrPayState,
  (state: QrPayState) => state.isItBetweenAccounts
);

export const qrSpiUserKeySelector = createSelector(
  qrPayState,
  (state: QrPayState) => state.spiUserKey
);
