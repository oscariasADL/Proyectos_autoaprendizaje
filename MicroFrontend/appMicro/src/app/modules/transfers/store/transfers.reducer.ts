import { createReducer, on } from '@ngrx/store';
import * as RemittanceActions from './transfers.actions';
import { CheckCustomerResult } from '../pages/transfers-remittances/interfaces/remittance-services.interface';

export interface RemittanceState {
  loading: boolean;
  result: CheckCustomerResult | null;
  error: any;
}

export const initialState: RemittanceState = {
  loading: false,
  result: null,
  error: null
};

export const remittanceReducer = createReducer(
  initialState,
  on(RemittanceActions.remittanceAction, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(RemittanceActions.remittanceSuccessAction, (state, { result }) => ({
    ...state,
    loading: false,
    result
  })),
  on(RemittanceActions.remittanceErrorAction, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
