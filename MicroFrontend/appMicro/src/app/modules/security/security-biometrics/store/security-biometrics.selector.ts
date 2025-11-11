import {
  securityBiometricsFeatureName,
  SecurityBiometricsState
} from '@modules/security/security-biometrics/store/security-biometrics.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const securityBiometricsState = createFeatureSelector<SecurityBiometricsState>(
  securityBiometricsFeatureName
);

export const securityBiometricsStepSelector = createSelector(
  securityBiometricsState,
  (state: SecurityBiometricsState) => state.step
);
