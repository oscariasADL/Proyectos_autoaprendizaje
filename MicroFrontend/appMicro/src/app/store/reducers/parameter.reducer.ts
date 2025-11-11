import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/parameter.action';
import {
  initialParameterState,
  ParameterState
} from '../state/parameter.state';

const featureReducer = createReducer(
  initialParameterState,
  on(
    actions.fetchParameterAction,
    actions.fetchByKeyAction,
    (state: ParameterState) => ({
      ...state,
      working: true,
      completed: false,
      message: ''
    })
  ),
  on(
    actions.fetchParameterSuccessAction,
    (state: ParameterState, { catalogue }) => ({
      ...state,
      catalogue: {
        featureFlagsBm: state.catalogue?.featureFlagsBm,
        ...catalogue
      },
      working: false,
      completed: true,
      message: ''
    })
  ),
  on(
    actions.fetchByKeySuccessAction,
    (state: ParameterState, { key, data }) => ({
      ...state,
      catalogue: { ...state.catalogue, [key]: data },
      working: false,
      completed: true,
      message: ''
    })
  ),
  on(
    actions.fetchParameterErrorAction,
    actions.fetchByKeyErrorAction,
    actions.fetchFeatureToggleErrorAction,
    (state: ParameterState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(
    actions.fetchFeatureToggleSuccessAction,
    (state: ParameterState, { featureToggles }) => ({
      ...state,
      catalogue: { ...state.catalogue, featureFlagsBm: featureToggles },
      working: false,
      completed: true,
      message: ''
    })
  )
);

export const parameterReducer = (
  state: ParameterState,
  action: Action
): ParameterState => {
  return featureReducer(state, action);
};
