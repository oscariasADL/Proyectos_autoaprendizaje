import { PRODUCT_HAS_MOVEMENTS } from '@modules/product/constants/product.constants';
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './product-detail.actions';
import {
  initialProductDetailState,
  ProductDetailState
} from './product-detail.state';

const featureReducer = createReducer(
  initialProductDetailState,
  on(
    actions.fetchProductDetailAction,
    (state: ProductDetailState, { productType }) => ({
      ...state,
      data: { ...state.data },
      working: true,
      completed: false,
      hasMovements: PRODUCT_HAS_MOVEMENTS.includes(productType)
    })
  ),
  on(
    actions.fetchProductDetailSuccessAction,
    (state: ProductDetailState, { data, id }) => ({
      ...state,
      data: { ...state.data, ...data, id },
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchProductDetailErrorAction,
    (state: ProductDetailState, { message }) => ({
      ...state,
      working: false,
      completed: true,
      message
    })
  ),
  on(
    actions.fetchProductPayrollAdvanceSuccessAction,
    (state: ProductDetailState, { data }) => ({
      ...state,
      data: {
        ...state.data,
        ...data
      },
      working: true,
      completed: false
    })
  ),
  on(
    actions.fetchProductPayrollAdvanceErrorAction,
    (state: ProductDetailState, { message }) => ({
      ...state,
      data: { ...state.data, isPreApprovedPayrollAdvance: false },
      message
    })
  ),
  on(
    actions.fetchProductPayrollAdvanceConfirmSuccessAction,
    (state: ProductDetailState, { data }) => ({
      ...state,
      data: {
        ...state.data,
        ...data
      },
      working: false,
      completed: true
    })
  ),
  on(
    actions.fetchProductPayrollAdvanceConfirmErrorAction,
    (state: ProductDetailState, { message }) => ({
      ...state,
      data: { ...state.data, isPreApprovedPayrollAdvance: false },
      message
    })
  ),
  on(
    actions.setProductSelectedAction,
    (state: ProductDetailState, { product: selected }) => ({
      ...state,
      selected
    })
  )
);

export const productDetailReducer = (
  state: ProductDetailState,
  action: Action
): ProductDetailState => {
  return featureReducer(state, action);
};
