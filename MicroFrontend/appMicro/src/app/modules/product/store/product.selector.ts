import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { mapBalanceByCategory } from '@modules/home/mappers/home.mapper';
import {
  mapHasProducts,
  mapProductByProductId,
  mapProductsByFilter
} from '@modules/product/mappers/product-filter.mapper';
import { mapBalanceHome } from '@modules/product/mappers/product-home.mapper';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureName, ProductState } from './product.state';
import { ProductFilterSelector } from '@commons/entities/product/product-types.interface';
import { Balance } from '@commons/entities/product/balance.interface';

const productState = createFeatureSelector<ProductState>(productFeatureName);

export const balanceSelector = createSelector(
  productState,
  (state: ProductState) => state.balance
);

export const balanceWorkingSelector = createSelector(
  productState,
  (state: ProductState) => state.balanceWorking
);

export const balanceCompletedSelector = createSelector(
  productState,
  (state: ProductState) => state.balanceCompleted
);

export const workingTCSelector = createSelector(
  productState,
  (state: ProductState) => state.workingTC
);

export const completedTCSelector = createSelector(
  productState,
  (state: ProductState) => state.completedTC
);

export const firstCallSelector = createSelector(
  productState,
  (state: ProductState) => state.firstCall
);

export const firstCallTCSelector = createSelector(
  productState,
  (state: ProductState) => state.firstCallTC
);

export const balanceCategorySelector = createSelector(
  productState,
  (state: ProductState) => state.balanceCategory
);

export const balanceCategoriesSelector = createSelector(
  productState,
  (state: ProductState) => state.balanceCategories
);

export const nicknamesSelector = createSelector(
  productState,
  (state: ProductState) => state.nicknames
);

export const spiUserKeysSelector = createSelector(
  productState,
  (state: ProductState) => state.spiUserKeys
);

export const hasBalanceSelector = createSelector(
  productState,
  (state: ProductState) =>
    !isNullOrUndefined(state) && state?.balance?.length > 0
);

export const productsByCategory = createSelector(
  balanceSelector,
  balanceCategorySelector,
  mapBalanceByCategory
);

export const retriesSelector = createSelector(
  productState,
  (state: ProductState) => state.retries
);

export const hiddenBalanceSelector = createSelector(
  productState,
  (state: ProductState) => state.hiddenBalance
);

export const workingHiddenBalanceSelector = createSelector(
  productState,
  (state: ProductState) => state.workingHiddenBalance
);

export const products = createSelector(balanceSelector, mapBalanceByCategory);
export const productsHome = createSelector(balanceSelector, mapBalanceHome);
export const productsSelector = () =>
  createSelector(balanceSelector, mapProductsByFilter);
export const productsSelectorV2 = (filters: ProductFilterSelector) =>
  createSelector(balanceSelector, (balances: Balance[]) =>
    mapProductsByFilter(balances, filters)
  );
export const hasProductsSelector = () =>
  createSelector(productsSelector(), mapHasProducts);

export const findProductInBalances = (productId: string) =>
  createSelector(balanceSelector, (balances: Balance[]) =>
    mapProductByProductId(balances, productId)
  );

export const findSpiUserKeyByKey = (spiUserKey: string) =>
  createSelector(productState, (state: ProductState) =>
    state.spiUserKeys?.find(
      (spiUserKeyItem) => spiUserKeyItem.keyId === spiUserKey
    )
  );
export const isSPIAuthorizationSelector = createSelector(
  productState,
  (state: ProductState) => state.isSPIAuthorization
);
