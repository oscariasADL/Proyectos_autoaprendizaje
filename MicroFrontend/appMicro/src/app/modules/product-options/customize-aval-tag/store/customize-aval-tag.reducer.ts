import { createReducer, on } from '@ngrx/store';
import { RandomKeyResponse } from '../entities/customize-aval-tag.interface';
import {
  getRandomKeyAction,
  getRandomKeySuccess,
  getRandomKeyFailure
} from './customize-aval-tag.actions';

export interface CustomizeAvalTagState {
  randomKey: RandomKeyResponse | null;
  loading: boolean;
  error: any;
}

export const initialState: CustomizeAvalTagState = {
  randomKey: null,
  loading: false,
  error: null
};

export const customizeAvalTagReducer = createReducer(
  initialState,
  on(getRandomKeyAction, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(getRandomKeySuccess, (state, { response }) => ({
    ...state,
    randomKey: response,
    loading: false,
    error: null
  })),
  on(getRandomKeyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
