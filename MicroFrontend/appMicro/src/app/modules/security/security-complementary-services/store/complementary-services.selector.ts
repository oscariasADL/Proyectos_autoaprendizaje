import {
  complementaryServicesFeatureName,
  ComplementaryServicesState
} from '@modules/security/security-complementary-services/store/complementary-services.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const complementaryServicesState =
  createFeatureSelector<ComplementaryServicesState>(
    complementaryServicesFeatureName
  );

export const complementaryServicesStepSelector = createSelector(
  complementaryServicesState,
  (state: ComplementaryServicesState) => state?.step
);

export const toggleProcessIdSelector = createSelector(
  complementaryServicesState,
  (state: ComplementaryServicesState) => state?.toggle?.processId
);

export const toggleAutomaticValidationSelector = createSelector(
  complementaryServicesState,
  (state: ComplementaryServicesState) => state?.toggle?.automaticValidation
);

export const toggleErrorSelector = createSelector(
  complementaryServicesState,
  (state: ComplementaryServicesState) => state.toggleError
);

export const errorMessageSelector = createSelector(
  complementaryServicesState,
  (state: ComplementaryServicesState) => state.errorMessage
);
