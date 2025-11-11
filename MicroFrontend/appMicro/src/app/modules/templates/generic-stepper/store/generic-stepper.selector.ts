import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  genericStepperFeatureName,
  GenericStepperState
} from './generic-stepper.state';

const genericStepperState = createFeatureSelector<GenericStepperState>(
  genericStepperFeatureName
);

export const gmfSelector = createSelector(
  genericStepperState,
  (state: GenericStepperState) => state.gmf
);

export const genericStepperWorkingSelector = createSelector(
  genericStepperState,
  (state: GenericStepperState) => state.working
);

export const genericStepperCompletedSelector = createSelector(
  genericStepperState,
  (state: GenericStepperState) => state.completed
);
