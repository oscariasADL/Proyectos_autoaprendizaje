import {
  Balance,
  TypeProduct
} from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import {
  AvalProduct,
  AvalProductList
} from '@modules/aval/entities/aval-product.interface';
import { mapAvalProductItems } from '@modules/aval/mappers/aval-products-items.mapper';
import { TYPE_ACCOUNT_TRANSFER_ACCOUNTS } from '@modules/contacts/entities/contact-product.interface';
import orderBy from 'lodash/orderBy';

function mapAvalProductIcon(data: Balance): string {
  switch (data.typeProduct) {
    case TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS:
      return 'icon-retiro';
    case TypeProduct.MY_CREDIT_CARDS:
      return 'icon-tarjeta';
    case TypeProduct.ROTATING_CREDITS:
      return 'icon-otros_gastos';
    case TypeProduct.MY_CREDITS:
      return 'icon-otros_gastos';
    case TypeProduct.MY_CDT:
      return 'icon-otros_gastos';
    case TypeProduct.MANDATORY_PENSIONS:
      return 'icon-flecha_subida';
    case TypeProduct.VOLUNTARY_PENSIONS:
      return 'icon-flecha_subida';
    case TypeProduct.CESANTIAS:
      return 'icon-acciones_productos_financieros';
    case TypeProduct.FACILPASS:
      return 'icon-vehiculos';
    case TypeProduct.FIDUCIAS:
      return 'icon-mis_otros_creditos';
    default:
      return 'icon-retiro';
  }
}

function mapAvalProductTitle(product: Product): string {
  switch (product.type) {
    case TypeAccount.CCA:
      return `Tarjeta de Crédito No. ${product.numberProduct}`;
    default:
      return `${product.typeName} No. ${product.numberProduct}`;
  }
}

function mapAvalProductDescription(product: Product, data: Balance): string {
  switch (data.typeProduct) {
    case TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS:
      if (
        TYPE_ACCOUNT_TRANSFER_ACCOUNTS.includes(product.type as TypeAccount)
      ) {
        return 'AVAL.PRODUCTS.FIELDS.AVAILABLE_BALANCE';
      }
      return 'AVAL.PRODUCTS.FIELDS.AVAILABLE_FOR_HOUSING';
    case TypeProduct.MY_CREDIT_CARDS:
      return 'AVAL.PRODUCTS.FIELDS.AVAILABLE_PURCHASES';
    case TypeProduct.ROTATING_CREDITS:
      return 'AVAL.PRODUCTS.FIELDS.AVAILABLE_USE';
    case TypeProduct.MY_CREDITS:
      return 'AVAL.PRODUCTS.FIELDS.TOTAL_PAY';
    case TypeProduct.MY_CDT:
      return 'AVAL.PRODUCTS.FIELDS.VALUE';
    case TypeProduct.MANDATORY_PENSIONS:
    case TypeProduct.VOLUNTARY_PENSIONS:
    case TypeProduct.CESANTIAS:
    case TypeProduct.FACILPASS:
      return 'AVAL.PRODUCTS.FIELDS.BALANCE';
    case TypeProduct.DALE:
      return 'AVAL.PRODUCTS.FIELDS.AVAILABLE_BALANCE';
    default:
      return 'AVAL.PRODUCTS.FIELDS.AVAILABLE';
  }
}

function mapAvalProductAmount(product: Product, data: Balance): number {
  switch (data.typeProduct) {
    case TypeProduct.MY_ACCOUNTS_AND_DEBIT_CARDS:
      if (
        TYPE_ACCOUNT_TRANSFER_ACCOUNTS.includes(product.type as TypeAccount)
      ) {
        return product.availableBalance;
      }
      return product.availableHomePurchase;
    case TypeProduct.MY_CREDIT_CARDS:
      return product.availablePurchasesBalance;
    case TypeProduct.ROTATING_CREDITS:
      return product.availableBalance;
    case TypeProduct.MY_CREDITS:
      return product.forPayment;
    case TypeProduct.MY_CDT:
      return product.startupValue;
    case TypeProduct.CESANTIAS:
      return product.balance;
    case TypeProduct.MANDATORY_PENSIONS:
    case TypeProduct.VOLUNTARY_PENSIONS:
    case TypeProduct.FACILPASS:
      return data.balanceTotal;
    case TypeProduct.DALE:
      return product.balance;
    default:
      return product.availableBalance;
  }
}

function mapAvalProduct(product: Product, data: Balance): AvalProduct {
  return {
    icon: mapAvalProductIcon(data),
    title: mapAvalProductTitle(product),
    description: mapAvalProductDescription(product, data),
    amount: mapAvalProductAmount(product, data),
    items: mapAvalProductItems(product, data),
    bankCode: product.bankCode
  };
}

export function mapAvalProducts(data: Balance[]): AvalProductList[] {
  if (isNullOrUndefined(data)) {
    return null;
  }

  return orderBy(data, ['typeProduct'], ['asc'])
    .filter((item) => item?.products?.length > 0)
    .map((item) => ({
      label: item?.name,
      products: item.products.map((card) => mapAvalProduct(card, item))
    }));
}
