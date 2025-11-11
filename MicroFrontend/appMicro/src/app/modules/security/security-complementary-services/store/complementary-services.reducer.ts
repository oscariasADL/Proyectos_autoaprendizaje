import * as actions from '@modules/security/security-complementary-services/store/complementary-services.actions';
import {
  ComplementaryServicesState,
  initialComplementaryServicesState
} from '@modules/security/security-complementary-services/store/complementary-services.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialComplementaryServicesState,
  on(
    actions.setComplementaryServicesStepAction,
    (state: ComplementaryServicesState, { step }) => ({
      ...state,
      step
    })
  ),
  on(
    actions.toggleComplementaryServicesAction,
    (state: ComplementaryServicesState, { payload }) => ({
      ...state,
      toggle: {
        automaticValidation: payload?.content?.automaticValidation,
        turnOn: payload?.content?.turnOn
      },
      toggleError: false
    })
  ),
  on(
    actions.toggleSilenceComplementaryServicesAction,
    (state: ComplementaryServicesState, { payload }) => ({
      ...state,
      toggle: {
        automaticValidation: payload?.content?.automaticValidation,
        turnOn: payload?.content?.turnOn
      }
    })
  ),
  on(
    actions.seedSowingComplementaryServicesAction,
    (state: ComplementaryServicesState, { response }) => ({
      ...state,
      toggle: {
        ...state.toggle,
        processId: response.processId
      }
    })
  ),
  on(
    actions.setToggleProcessId,
    (state: ComplementaryServicesState, { processId }) => ({
      ...state,
      toggle: {
        ...state.toggle,
        processId
      }
    })
  ),
  on(
    actions.toggleComplementaryServicesErrorAction,
    (state: ComplementaryServicesState, {}) => ({
      ...state,
      toggleError: true
    })
  ),
  on(
    actions.setErrorMessageAction,
    (state: ComplementaryServicesState, { errorMessage }) => ({
      ...state,
      errorMessage
    })
  )
);

export const complementaryServicesReducer = (
  state: ComplementaryServicesState,
  action: Action
): ComplementaryServicesState => {
  return featureReducer(state, action);
};
