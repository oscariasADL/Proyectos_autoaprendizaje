import { Balance } from '@commons/entities/product/balance.interface';
import { ProductFilterSelector } from '@commons/entities/product/product-types.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import has from 'lodash/has';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';

export function mapProductsByFilter(
  _balances: Balance[],
  _filters?: ProductFilterSelector
): Product[] {
  if (!_balances || _balances?.length === 0) return null;

  const accountsFiltered = has(_filters, 'typeProduct')
    ? _balances.filter((item) => item.typeProduct === _filters.typeProduct)
    : has(_filters, 'typeProducts')
    ? _balances.filter((item) =>
        _filters.typeProducts.includes(item.typeProduct)
      )
    : _balances;

  const _products = accountsFiltered.flatMap((item) =>
    item.products.map((product) => ({
      ...product,
      typeProduct: item.typeProduct
    }))
  );

  if (_products.length === 0) return _products;

  const hasSingleType = has(_filters, 'typeAccountProduct');
  const hasMultipleTypes = has(_filters, 'typeAccountProducts');
  const hasSubtypeExclusions = has(_filters, 'excludeSubtypeAccountProducts');

  const filterByAccountType = (product: Product) =>
    hasSingleType
      ? product.type === _filters.typeAccountProduct
      : hasMultipleTypes
      ? _filters.typeAccountProducts.includes(product.type as TypeAccount)
      : true;

  const filterByExcludeSubtype = (product: Product) =>
    (hasSingleType || hasMultipleTypes) && hasSubtypeExclusions
      ? !_filters.excludeSubtypeAccountProducts.includes(
          product.productTypeDetailKey
        )
      : true;

  return _products.filter(
    (product) => filterByAccountType(product) && filterByExcludeSubtype(product)
  );
}

export function mapHasProducts(products: Product[]): boolean {
  if (!!!products) {
    return null;
  }

  return products.length > 0;
}

export function mapProductByProductId(
  _balances: Balance[],
  productRelativeId: string
): Product {
  if (!!!_balances) {
    return null;
  }

  return _balances
    .map((balance) => balance.products)
    .reduce((beforeValue, value) => [...beforeValue, ...value], [])
    .find(
      (product) =>
        !isNullOrUndefined(product.id) &&
        !isNullOrUndefined(productRelativeId) &&
        product.id.toString() === productRelativeId.toString()
    );
}
