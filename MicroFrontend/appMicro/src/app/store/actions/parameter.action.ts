import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';
import {
  FeatureFlagsBm,
  ParameterList,
  ParameterType
} from '../state/parameter.state';

export const fetchByKeyAction = createAction(
  type('[Global/API] Fetch parameter by key'),
  props<{ key: ParameterType }>()
);

export const fetchByKeySuccessAction = createAction(
  type('[Global/API] Fetch parameter by key success'),
  props<{ key: ParameterType; data: any }>()
);

export const fetchByKeyErrorAction = createAction(
  type('[Global/API] Fetch parameter by key error'),
  props<{ message: string }>()
);

export const fetchParameterAction = createAction(
  type('[Global/API] Fetch parameter')
);

export const fetchParameterSuccessAction = createAction(
  type('[Global/API] Fetch parameter success'),
  props<{ catalogue: ParameterList }>()
);

export const fetchParameterErrorAction = createAction(
  type('[Global/API] Fetch parameter error'),
  props<{ message: string }>()
);

export const fetchFeatureToggleAction = createAction(
  type('[Global/API] Fetch config cat flags')
);

export const fetchFeatureToggleSuccessAction = createAction(
  type('[Global/API] Fetch feature toggle success'),
  props<{ featureToggles: FeatureFlagsBm[] }>()
);

export const fetchFeatureToggleErrorAction = createAction(
  type('[Global/API] Fetch feature toggle error'),
  props<{ message: string }>()
);
