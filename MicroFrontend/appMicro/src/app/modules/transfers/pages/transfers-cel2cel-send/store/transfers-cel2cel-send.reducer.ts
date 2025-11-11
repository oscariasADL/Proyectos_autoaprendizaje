import * as actions from './transfers-cel2cel-send.actions';
import { Action, createReducer, on } from '@ngrx/store';
import {
  initialTransfersCel2celState,
  TransfersCel2celState
} from './transfers-cel2cel-send.state';

const featureReducer = createReducer(
  initialTransfersCel2celState,
  on(
    actions.fetchTowardProductsByPhoneNumberAction,
    (state: TransfersCel2celState) => ({
      ...state,
      working: true
    })
  ),
  on(
    actions.fetchTowardProductsByPhoneNumberSuccessAction,
    (state: TransfersCel2celState, { towardProducts }) => ({
      ...state,
      towardProducts,
      towardBankIds: towardProducts.map(
        (product) => product.account.bankInfo.bankId
      ),
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchTowardProductsByPhoneNumberErrorAction,
    (state: TransfersCel2celState, { message }) => ({
      ...state,
      towardProducts: [],
      towardBankIds: [],
      working: false,
      completed: true,
      message
    })
  ),
  on(actions.completedToFalseAction, (state: TransfersCel2celState) => ({
    ...state,
    completed: false
  })),
  on(
    actions.setUseTransfiyaAction,
    (state: TransfersCel2celState, { useTransfiya }) => ({
      ...state,
      useTransfiya
    })
  )
);

export const transfersCel2celReducer = (
  state: TransfersCel2celState,
  action: Action
): TransfersCel2celState => {
  return featureReducer(state, action);
};
