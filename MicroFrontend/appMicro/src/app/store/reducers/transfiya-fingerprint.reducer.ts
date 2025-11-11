import { Action, createReducer, on } from '@ngrx/store';
import {
  initialTransfiyaFingerprintState,
  TransfiyaFingerprintState
} from '@store/state/transfiya-fingerprint.state';
import { setTransfiyaFingerprint } from '@store/actions/global.actions';

const featureReducer = createReducer(
  initialTransfiyaFingerprintState,
  on(setTransfiyaFingerprint, (state: TransfiyaFingerprintState, data) => ({
    ...state,
    ...data
  }))
);

export const transfiyaFingerprintReducer = (
  state: TransfiyaFingerprintState,
  action: Action
): TransfiyaFingerprintState => {
  return featureReducer(state, action);
};
