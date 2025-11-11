import * as actions from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.actions';
import {
  initialTrustRelationState,
  TrustRelationState
} from '@modules/transfers/pages/transfers-trust-relation/store/transfers-trust-relation.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialTrustRelationState,
  on(actions.fetchTrustRelationsAction, (state: TrustRelationState) => ({
    ...state,
    data: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchTrustRelationsSuccessAction,
    (state: TrustRelationState, { data }) => ({
      ...state,
      data,
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchTrustRelationsErrorAction,
    (state: TrustRelationState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  )
);
export const trustRelationReducer = (
  state: TrustRelationState,
  action: Action
): TrustRelationState => {
  return featureReducer(state, action);
};
