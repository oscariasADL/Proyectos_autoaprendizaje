import * as actions from '@modules/documents/pages/extracts/store/extracts.actions';
import {
  ExtractsState,
  initialExtractsState
} from '@modules/documents/pages/extracts/store/extracts.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialExtractsState,
  on(actions.fetchPeriodsAction, (state: ExtractsState) => ({
    ...state,
    periods: null,
    working: true,
    completed: false
  })),
  on(
    actions.fetchPeriodsSuccessAction,
    (state: ExtractsState, { periods }) => ({
      ...state,
      periods,
      working: false,
      completed: true
    })
  ),
  on(actions.fetchPeriodsErrorAction, (state: ExtractsState, { message }) => ({
    ...state,
    working: false,
    completed: false,
    message
  })),
  on(actions.fetchExtractAction, (state: ExtractsState, { payload }) => ({
    ...state,
    downloadFileName: payload.periodInfo.fileDesc
  })),
  on(actions.fetchExtractSuccessAction, (state: ExtractsState) => ({
    ...state,
    downloadFileName: null
  })),
  on(actions.fetchExtractErrorAction, (state: ExtractsState, { message }) => ({
    ...state,
    downloadFileName: null
  }))
);

export const extractsReducer = (
  state: ExtractsState,
  action: Action
): ExtractsState => {
  return featureReducer(state, action);
};
