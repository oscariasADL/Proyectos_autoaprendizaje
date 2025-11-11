import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { mapProductDetailData } from '@modules/product-detail/mappers/product-detail.mapper';
import {
  nicknamesSelector,
  spiUserKeysSelector
} from '@modules/product/store/product.selector';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  productDetailFeatureName,
  ProductDetailState
} from './product-detail.state';
import { productList } from '@modules/security/security-media-activation/store/security-media.selector';

const productDetailState = createFeatureSelector<ProductDetailState>(
  productDetailFeatureName
);

export const productDetailDataSelector = createSelector(
  productDetailState,
  (state: ProductDetailState) => state.data
);

export const productDetailDataPayrollAdvanceSelector = createSelector(
  productDetailState,
  (state: ProductDetailState) => state.data
);

export const productDetailWorkingSelector = createSelector(
  productDetailState,
  (state: ProductDetailState) => state.working
);

export const productDetailCompletedSelector = createSelector(
  productDetailState,
  (state: ProductDetailState) => state.completed && !!state.data?.numberProduct
);

export const productDetailHasMovementsSelector = createSelector(
  productDetailState,
  (state: ProductDetailState) => state.hasMovements
);

export const productSelectedSelector = createSelector(
  productDetailState,
  (state: ProductDetailState) =>
    !isNullOrUndefined(state) ? state.selected : null
);

export const productDetailInfoSelector = createSelector(
  productDetailDataSelector,
  nicknamesSelector,
  productList,
  spiUserKeysSelector,
  mapProductDetailData
);
