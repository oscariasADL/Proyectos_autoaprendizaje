import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from '@store/state/config.state';

export const configFeatureName = 'config';

const configState = createFeatureSelector<ConfigState>(configFeatureName);

export const dateSelector = createSelector(configState, (state: ConfigState) =>
  mapDate(state)
);

function mapDate(state: ConfigState): string {
  if (state?.completed) {
    return state.config.date;
  }
}
