import {
  AVAL_STOCKS,
  AVAL_TUPLUS,
  POCKETS,
  PRODUCT_DETAIL
} from '@commons/constants/navigate.constants';
import {
  Balance,
  HomeProduct,
  HomeProductType,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import {
  priorityOrder,
  ProductSpiUserKey,
  SpiKeyType,
  StatusDirectory
} from '@modules/product/entities/product-spi-user-key';
import { TypeAccount } from '@app/commons/entities/product/type-account';

export const MAX_PRODUCTS_QUANTITY_TO_SHOW = 6;
export const MIN_PRODUCTS_QUANTITY_TO_GROUP = 2;

function balanceDescriptionText(typeProduct: TypeProduct): string {
  switch (typeProduct) {
    case TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS:
      return 'cuentas';
    case TypeProduct.MY_CREDIT_CARDS:
      return 'tarjetas';
    case TypeProduct.ROTATING_CREDITS:
    case TypeProduct.MY_CREDITS:
      return 'créditos';
    case TypeProduct.FIDUCIAS:
      return 'fiducias';
    case TypeProduct.MY_CDT:
      return 'CDTs';
    default:
      return 'productos';
  }
}

function balanceDescription(balance: Balance): string {
  return (
    balance.description +
    ' en ' +
    balance.quantity +
    ' ' +
    balanceDescriptionText(balance.typeProduct)
  );
}

function groupBalances(balances: Balance[]): HomeProduct[] {
  const balanceMapped: HomeProduct[] = [];

  balances.map((balance: Balance) => {
    if (balance.products.length >= MIN_PRODUCTS_QUANTITY_TO_GROUP) {
      balanceMapped.push({
        type: HomeProductType.group,
        description: balanceDescription(balance),
        balance: balance.balanceTotal,
        filter: balance.typeProduct,
        productType: balance.products[0].type,
        categoryName: balance.name,
        balanceTypeProduct: balance?.typeProduct
      });
    } else {
      balance.products.forEach((product: Product) =>
        balanceMapped.push(mapProductItem(balance, product))
      );
    }
  });
  return balanceMapped;
}

function productsBalances(balances: Balance[]): HomeProduct[] {
  return balances
    .map((balance: Balance) =>
      balance.products.map((product: Product) =>
        mapProductItem(balance, product)
      )
    )
    .reduce((beforeValue, value) => [...beforeValue, ...value], []);
}

function sortBalances(balances: Balance[]): Balance[] {
  return balances
    .slice()
    .sort((beforeValue, value) =>
      beforeValue.typeProduct === value.typeProduct
        ? 0
        : beforeValue.typeProduct < value.typeProduct
        ? -1
        : 1
    );
}

function productsQuantity(balances: Balance[]): number {
  return balances.reduce(
    (beforeValue, value) => beforeValue + value.products.length,
    0
  );
}

export function mapProductDetailUrl(product: Product): string {
  return product?.style === ProductStyleType.pocketsSummary
    ? POCKETS.toString()
    : product?.style === ProductStyleType.tuplusSummary
    ? AVAL_TUPLUS.toString()
    : product?.style === ProductStyleType.stocksSummary
    ? AVAL_STOCKS.toString()
    : `${PRODUCT_DETAIL.toString()}/${product.type}/${product.id}`;
}

export function mapProductItem(
  balance: Balance,
  product: Product
): HomeProduct {
  return {
    type: HomeProductType.product,
    url: mapProductDetailUrl(product),
    categoryName: balance.name,
    product,
    balanceTypeProduct: balance.typeProduct
  };
}

export function mapBalanceHome(balances: Balance[]): HomeProduct[] {
  if (!balances) {
    return [];
  }

  const balanceSorted = sortBalances(balances);

  return productsQuantity(balanceSorted) > MAX_PRODUCTS_QUANTITY_TO_SHOW
    ? groupBalances(balanceSorted).slice(0, MAX_PRODUCTS_QUANTITY_TO_SHOW)
    : productsBalances(balanceSorted).slice(0, MAX_PRODUCTS_QUANTITY_TO_SHOW);
}

export function mapSPIInformation(
  balances: Balance[],
  spiUserKeys: ProductSpiUserKey[]
): Balance[] {
  const spiUserKeyMap = new Map<string, ProductSpiUserKey[]>();

  spiUserKeys.forEach((key) => {
    const existingKeys = spiUserKeyMap.get(key.numberProduct);
    if (existingKeys) {
      existingKeys.push(key);
    } else {
      spiUserKeyMap.set(key.numberProduct, [key]);
    }
  });

  return balances.map((balance: Balance) => ({
    ...balance,
    products: balance.products.map((product: Product) => {
      const spiUserKeys = spiUserKeyMap.get(product.numberProduct);
      const avalTagKey = spiUserKeys && getAvalKey(spiUserKeys);
      const breBUserKeys = spiUserKeys && getBrebKeys(spiUserKeys);

      return spiUserKeys ? { ...product, avalTagKey, breBUserKeys } : product;
    })
  }));
}

export function getAvalKey(spiUserKeys: ProductSpiUserKey[]) {
  return spiUserKeys.filter(
    (x) => x.keyType === SpiKeyType.AlphanumericIdentifier
  );
}

export function getBrebKeys(spiUserKeys: ProductSpiUserKey[]) {
  const breBKeys = spiUserKeys.filter(
    (x) => x.keyType !== SpiKeyType.AlphanumericIdentifier
  );

  const sortedKeys = sortUserKeysByKeyType(breBKeys);

  return sortedKeys;
}

export function sortUserKeysByKeyType(spiUserKeys: ProductSpiUserKey[]) {
  const sortedKeys = [...spiUserKeys].sort((a, b) => {
    return priorityOrder[a.keyType] - priorityOrder[b.keyType];
  });
  return sortedKeys;
}

export function sortUserKeysByAccountTypeAndPriority(
  spiUserKeys: ProductSpiUserKey[]
): ProductSpiUserKey[] {
  return [...spiUserKeys].sort((a, b) => {
    const keyTypeA = a.keyType === SpiKeyType.AlphanumericIdentifier ? 0 : 1;
    const keyTypeB = b.keyType === SpiKeyType.AlphanumericIdentifier ? 0 : 1;
    if (keyTypeA !== keyTypeB) return keyTypeA - keyTypeB;

    const statusRank = (s: string) =>
      s === StatusDirectory.DICE ? 0 : s === StatusDirectory.DIRAVAL ? 1 : 2;
    const statusA = statusRank(a.statusDirectory);
    const statusB = statusRank(b.statusDirectory);
    if (statusA !== statusB) return statusA - statusB;

    const dateA = new Date(a.effDt).getTime();
    const dateB = new Date(b.effDt).getTime();
    return dateB - dateA;
  });
}
