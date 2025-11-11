import { Action, createReducer, on } from '@ngrx/store';
import { TaxState, initialTaxState } from './tax.state';
import * as actions from './tax.actions';

const featureReducer = createReducer(
  initialTaxState,

  on(actions.fetchTaxCertificateAction, (state: TaxState, { year }) => ({
    ...state,
    downloadFileYear: year
  })),
  on(actions.fetchTaxCertificateSuccessAction, (state: TaxState) => ({
    ...state,
    downloadFileYear: 0
  })),
  on(
    actions.fetchTaxCertificateErrorAction,
    (state: TaxState, { message }) => ({
      ...state,
      downloadFileYear: 0
    })
  )
);

export const taxReducer = (state: TaxState, action: Action): TaxState => {
  return featureReducer(state, action);
};
