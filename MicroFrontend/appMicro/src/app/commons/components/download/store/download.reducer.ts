import * as actions from '@commons/components/download/store/download.action';
import {
  DownloadState,
  initialDownloadState
} from '@commons/components/download/store/download.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialDownloadState,
  on(actions.downloadAction, (state: DownloadState) => ({
    ...state,
    working: true,
    completed: null
  })),
  on(actions.downloadSuccessAction, (state: DownloadState) => ({
    ...state,
    working: false,
    completed: true
  })),
  on(actions.downloadErrorAction, (state: DownloadState, { message }) => ({
    ...state,
    working: false,
    completed: false,
    message
  })),
  on(actions.downloadCleanAction, (state: DownloadState) => ({
    ...initialDownloadState
  })),
  on(
    actions.toggleWorkingDownloadAction,
    (state: DownloadState, { working }) => ({
      ...state,
      working
    })
  )
);

export const downloadReducer = (
  state: DownloadState,
  action: Action
): DownloadState => {
  return featureReducer(state, action);
};
