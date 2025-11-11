import { Action, createReducer, on } from '@ngrx/store';
import {
  QrAuthorizationState,
  initialQrAuthorizationState
} from './qr-authorization.state';
import * as actions from './qr-authorization.actions';

const featureReducer = createReducer(
  initialQrAuthorizationState,
  on(actions.setQrData, (state: QrAuthorizationState, qrData) => ({
    ...state,
    ...qrData,
    working: false,
    completed: true
  })),
  on(actions.scanningQr, (state: QrAuthorizationState) => ({
    ...state,
    transactionTitle: null,
    decryptedData: null,
    dynamicCode: null,
    working: true,
    completed: false
  }))
);

export const qrAuthorizationReducer = (
  state: QrAuthorizationState,
  action: Action
): QrAuthorizationState => {
  return featureReducer(state, action);
};
