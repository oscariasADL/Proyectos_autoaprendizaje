import * as actions from '@modules/products/store/products.actions';
import {
  initialProductsState,
  ProductsState
} from '@modules/products/store/products.state';
import { Action, createReducer, on } from '@ngrx/store';

const featureReducer = createReducer(
  initialProductsState,
  on(actions.setProductFilter, (state: ProductsState, { productFilter }) => ({
    ...state,
    productFilter
  }))
);

export const productsReducer = (
  state: ProductsState,
  action: Action
): ProductsState => {
  return featureReducer(state, action);
};
