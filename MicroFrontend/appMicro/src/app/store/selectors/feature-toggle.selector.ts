import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { parameterCatalogueSelector } from '@store/selectors/parameter.selector';
import { ParameterType } from '@store/state/parameter.state';
import { userFeatureName, UserState } from '@store/state/user.state';

const userState = createFeatureSelector<UserState>(userFeatureName);

export const complementaryServicesStateSelector = createSelector(
  userState,
  (state: UserState) => state?.complementaryServices
);

export const complementaryServicesErrorSelector = createSelector(
  userState,
  (state: UserState) => state?.complementaryServicesError
);

export const featureToggleDataSelector = createSelector(
  complementaryServicesStateSelector,
  parameterCatalogueSelector,
  mapFeatureToggleData
);

function mapFeatureToggleData(
  state: boolean,
  catalogue: any
): {
  buttons: string[];
  urls: string[];
  urlsOff: string[];
  buttonsOff: string[];
} {
  if (isNullOrUndefined(catalogue)) {
    return {
      buttons: [],
      urls: [],
      urlsOff: [],
      buttonsOff: []
    };
  }

  const featureTogglesList =
    catalogue[ParameterType.featureToggles] &&
    catalogue[ParameterType.featureToggles][0];
  const complementaryServicesList =
    catalogue[ParameterType.complementaryServices] &&
    catalogue[ParameterType.complementaryServices][0];

  if (
    state ||
    isNullOrUndefined(catalogue) ||
    isNullOrUndefined(complementaryServicesList)
  ) {
    return {
      buttons: [],
      urls: [],
      urlsOff: featureTogglesList?.url?.split(';') || [],
      buttonsOff: featureTogglesList?.btn?.split(';') || []
    };
  }

  return {
    buttons: complementaryServicesList.btn.split(';'),
    urls: complementaryServicesList.url.split(';'),
    urlsOff: featureTogglesList?.url?.split(';') || [],
    buttonsOff: featureTogglesList?.btn?.split(';') || []
  };
}
