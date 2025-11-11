import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './block-account.actions';
import {
  BlockAccountState,
  initialBlockAccountState
} from '@modules/product-options/block-account/store/block-account.state';
import { mapProductMedias } from '@modules/product-options/block-account/components/mappers/block-account.mapper';

const featureReducer = createReducer(
  initialBlockAccountState,
  on(
    actions.fetchBlockAccountProductMediasAction,
    (state: BlockAccountState) => ({
      ...state,
      working: true,
      completed: false
    })
  ),
  on(
    actions.fetchBlockAccountProductMediasSuccessAction,
    (state: BlockAccountState, { medias }) => ({
      ...state,
      productMedias: mapProductMedias(medias, state?.selectedProduct),
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchBlockAccountProductMediasErrorAction,
    (state: BlockAccountState, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  ),
  on(
    actions.setBlockAccountSelectedProductAction,
    (state: BlockAccountState, { ...product }) => ({
      ...state,
      selectedProduct: { ...product.product }
    })
  ),
  on(actions.setBlockAccountErrorAction, (state: BlockAccountState, error) => ({
    ...state,
    error
  })),
  on(
    actions.setBlockAccountResponseAction,
    (state: BlockAccountState, response) => ({
      ...state,
      response
    })
  ),
  on(
    actions.setBlockAccountProductMediasAction,
    (state: BlockAccountState, { productMedias }) => ({
      ...state,
      productMedias
    })
  ),
  on(
    actions.setBlockAccountFormAction,
    (state: BlockAccountState, { relativeId, lockId }) => ({
      ...state,
      blockAccountForm: { relativeId, lockId }
    })
  ),
  on(actions.sendBlockAccountAction, (state: BlockAccountState) => ({
    ...state,
    working: true,
    completed: false,
    message: null
  })),
  on(
    actions.sendBlockAccountSuccessAction,
    (state: BlockAccountState, { ...data }) => ({
      ...state,
      working: true,
      completed: false,
      response: data,
      error: false
    })
  ),
  on(
    actions.sendBlockAccountErrorAction,
    (state: BlockAccountState, { ...data }) => ({
      ...state,
      working: true,
      completed: false,
      response: data,
      error: true
    })
  )
);

export const blockAccountReducer = (
  state: BlockAccountState,
  action: Action
): BlockAccountState => {
  return featureReducer(state, action);
};
