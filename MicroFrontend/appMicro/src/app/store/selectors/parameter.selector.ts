import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  parameterFeatureName,
  ParameterState
} from '@store/state/parameter.state';
import { stringToBoolean } from '@commons/helpers/text.helpers';

const parameterState =
  createFeatureSelector<ParameterState>(parameterFeatureName);

export const parameterCatalogueSelector = createSelector(
  parameterState,
  (state: ParameterState) => state?.catalogue
);

export const cardCromalineMapParameterSelector = createSelector(
  parameterState,
  (state: ParameterState) => state?.catalogue?.cardCromalinesMap ?? []
);
