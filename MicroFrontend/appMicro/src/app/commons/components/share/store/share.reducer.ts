import * as actions from '@commons/components/share/store/share.action';
import {
  initialShareState,
  ShareState
} from '@commons/components/share/store/share.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialShareState,
  on(actions.shareAction, (state: ShareState) => ({
    ...state,
    working: true,
    completed: null
  })),
  on(actions.shareSuccessAction, (state: ShareState) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(actions.shareErrorAction, (state: ShareState, { message }) => ({
    ...state,
    working: false,
    completed: false,
    message
  })),
  on(actions.shareCleanAction, () => ({
    ...initialShareState
  })),
  on(actions.toggleWorkingShareAction, (state: ShareState, { working }) => ({
    ...state,
    working
  }))
);

export const shareReducer = (state: ShareState, action: Action): ShareState => {
  return featureReducer(state, action);
};
