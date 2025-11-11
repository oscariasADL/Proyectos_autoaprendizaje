import * as actions from '@modules/qr/pages/qr-pay/store/qr-pay.actions';
import {
  initialQrPayState,
  QrPayState
} from '@modules/qr/pages/qr-pay/store/qr-pay.state';

import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialQrPayState,
  on(actions.resetQRPayAction, (state: QrPayState) => ({
    ...initialQrPayState
  })),
  on(actions.setQRScanAction, (state: QrPayState, { qrScan }) => ({
    ...state,
    qrScan
  })),
  on(actions.setQRDataAction, (state: QrPayState, { qrData }) => ({
    ...state,
    qrData
  })),
  on(
    actions.setQRPaymentMethodsAction,
    (state: QrPayState, { qrPaymentMethods }) => ({
      ...state,
      qrPaymentMethods
    })
  ),
  on(
    actions.setQRPaymentMethodDataAction,
    (state: QrPayState, { qrPaymentMethodData }) => ({
      ...state,
      qrPaymentMethodData
    })
  ),
  on(actions.setQrTypeAction, (state: QrPayState, { qrType }) => ({
    ...state,
    qrType
  })),
  on(
    actions.setIsItBetweenAccountsAction,
    (state: QrPayState, { isItBetweenAccounts }) => ({
      ...state,
      isItBetweenAccounts
    })
  ),
  on(actions.setSpiUserKeyAction, (state: QrPayState, { spiUserKey }) => ({
    ...state,
    spiUserKey
  }))
);

export const qrPayReducer = (state: QrPayState, action: Action): QrPayState => {
  return featureReducer(state, action);
};
