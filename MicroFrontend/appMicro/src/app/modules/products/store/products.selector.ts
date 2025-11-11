import {
  stocksSelector,
  tuplusSelector
} from '@modules/aval/store/aval.selector';
import { digitalDebitCardsSelector } from '@modules/digital-debit-card/store/digital-debit-card.selector';
import { balanceSelector } from '@modules/product/store/product.selector';
import {
  mapProductsByTypeFilter,
  mapProductsTypeCategories
} from '@modules/products/mappers/products.mapper';
import {
  productsFeatureName,
  ProductsState
} from '@modules/products/store/products.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const productsState = createFeatureSelector<ProductsState>(productsFeatureName);

export const productFilterSelector = createSelector(
  productsState,
  (state: ProductsState) => state.productFilter
);

export const productsFiltered = createSelector(
  balanceSelector,
  productFilterSelector,
  tuplusSelector,
  stocksSelector,
  digitalDebitCardsSelector,
  mapProductsByTypeFilter
);

export const productTypeCategoriesSelector = createSelector(
  balanceSelector,
  mapProductsTypeCategories
);
