import { setSecurityBiometricStepAction } from '@modules/security/security-biometrics/store/security-biometrics.actions';
import {
  initialSecurityBiometrics,
  SecurityBiometricsState
} from '@modules/security/security-biometrics/store/security-biometrics.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialSecurityBiometrics,
  on(
    setSecurityBiometricStepAction,
    (state: SecurityBiometricsState, { step }) => ({
      ...state,
      step
    })
  )
);

export const securityBiometricsReducer = (
  state: SecurityBiometricsState,
  action: Action
): SecurityBiometricsState => {
  return featureReducer(state, action);
};
