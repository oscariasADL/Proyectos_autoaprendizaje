import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FeatureFlagsBm,
  parameterFeatureName,
  ParameterState
} from '@store/state/parameter.state';
import { stringToBoolean } from '@commons/helpers/text.helpers';

const parameterState =
  createFeatureSelector<ParameterState>(parameterFeatureName);

export const featureFlagsParameterSelector = createSelector(
  parameterState,
  (state: ParameterState) => state?.catalogue?.featureFlagsBm
);

export const featureFlagsMapParameterSelector = createSelector(
  parameterState,
  (state: ParameterState) =>
    state?.catalogue?.featureFlagsBm?.reduce(
      (map, feature) =>
        map.set(feature.featureName, {
          ...feature,
          value: feature.value
        }),
      new Map<string, FeatureFlagsBm>()
    )
);
