import * as actions from '@modules/product-options/cdt-renewal/store/cdt-renewal.actions';
import {
  CdtRenewalState,
  initialCdtRenewalState
} from '@modules/product-options/cdt-renewal/store/cdt-renewal.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialCdtRenewalState,
  on(actions.fetchCdtRenewalDetailAction, (state: CdtRenewalState) => ({
    ...state,
    detail: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchCdtRenewalDetailSuccessAction,
    (state: CdtRenewalState, { detail }) => ({
      ...state,
      detail,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchCdtRenewalDetailErrorAction,
    (state: CdtRenewalState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(actions.cleanCdtRenewalDetailAction, (state: CdtRenewalState) => ({
    ...state,
    detail: null,
    working: false,
    completed: false
  }))
);

export const cdtRenewalReducer = (
  state: CdtRenewalState,
  action: Action
): CdtRenewalState => {
  return featureReducer(state, action);
};
