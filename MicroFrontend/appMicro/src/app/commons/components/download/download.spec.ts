import * as actions from '@commons/components/download/store/download.action';
import {
  DownloadState,
  initialDownloadState
} from '@commons/components/download/store/download.state';
import { downloadReducer } from './store/download.reducer';

describe('Download Reducer', () => {
  let initialState: DownloadState;

  beforeEach(() => {
    initialState = { ...initialDownloadState };
  });

  it('should return initial state', () => {
    const action = { type: 'NOOP' } as any;
    const state = downloadReducer(undefined, action);

    expect(state).toBe(initialDownloadState);
  });

  describe('downloadAction', () => {
    it('should set working to true and completed to null', () => {
      const action = actions.downloadAction({
        props: { name: 'ddada', data: '2' }
      });
      const state = downloadReducer(initialState, action);

      expect(state.working).toBe(true);
      expect(state.completed).toBeNull();
      expect(state).not.toBe(initialState);
    });
  });

  describe('downloadSuccessAction', () => {
    it('should set working to false and completed to true', () => {
      const action = actions.downloadSuccessAction();
      const state = downloadReducer(initialState, action);

      expect(state.working).toBe(false);
      expect(state.completed).toBe(true);
      expect(state).not.toBe(initialState);
    });
  });

  describe('downloadErrorAction', () => {
    it('should set working to false, completed to false and include error message', () => {
      const errorMessage = 'Error downloading file';
      const action = actions.downloadErrorAction({ message: errorMessage });
      const state = downloadReducer(initialState, action);

      expect(state.working).toBe(false);
      expect(state.completed).toBe(false);
      expect(state.message).toBe(errorMessage);
      expect(state).not.toBe(initialState);
    });
  });

  describe('downloadCleanAction', () => {
    it('should reset state to initial values', () => {
      const modifiedState: DownloadState = {
        working: true,
        completed: true,
        message: 'some message'
      };

      const action = actions.downloadCleanAction();
      const state = downloadReducer(modifiedState, action);

      expect(state).toEqual(initialDownloadState);
      expect(state).not.toBe(modifiedState);
    });
  });

  describe('toggleWorkingDownloadAction', () => {
    it('should toggle working state', () => {
      const action = actions.toggleWorkingDownloadAction({ working: true });
      const state = downloadReducer(initialState, action);

      expect(state.working).toBe(true);
      expect(state).not.toBe(initialState);
    });
  });
});
