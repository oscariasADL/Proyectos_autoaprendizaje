import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { normalize } from '@commons/helpers/text.helpers';
import { CARD_ADVANCE_AVAILABLE_FIELD } from '@modules/product-options/card-advance/constants/card-advance.constants';
import { DEBIT_PURCHASE_AVAILABLE_FIELD } from '@modules/product-options/debit-purchase/constants/debit-purchase.constants';
import { ProductCard } from '@modules/product/entities/product-card.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { getFullProductType } from '@modules/product/helpers/product.helper';
import {
  priorityOrder,
  ProductSpiUserKey,
  SpiKeyType
} from '../entities/product-spi-user-key';
import { Balance } from '@app/commons/entities/product/balance.interface';

// TODO Remove on change T1
function productDescription(product: Product): string {
  switch (product.type) {
    case TypeAccount.SDA:
      return 'PRODUCT.MY_ACCOUNT_DETAIL.AVAILABLE_BALANCE';
    case TypeAccount.CDA:
      return 'PRODUCT.CDT_DETAIL.TOTAL_BALANCE';
    case TypeAccount.DLA:
      return 'PRODUCT.CREDIT_DETAIL.TOTAL_DEBT_BALANCE';
    case TypeAccount.LOC:
      return 'PRODUCT.ROTATING_CREDITS.AVAILABLE_QUOTA';
    case TypeAccount.CCA:
      return 'PRODUCT.CREDIT_CARD_DETAIL.AVAILABLE_PURCHASES';
    case TypeAccount.AFC:
      return 'PRODUCT.AFC_DETAIL.AVAILABLE_FOR_HOUSING';
    default:
      return 'PRODUCT.MY_ACCOUNT_DETAIL.AVAILABLE_BALANCE';
  }
}

function productValue(product: Product): number {
  switch (product.type) {
    case TypeAccount.SDA:
      return product.availableBalance;
    case TypeAccount.DDA:
      return product.availableBalance;
    case TypeAccount.AFC:
      return product.availableHomePurchase;
    case TypeAccount.CCA:
      return product.availablePurchasesBalance;
    case TypeAccount.LOC:
      return product.availableBalance;
    case TypeAccount.FID:
      return product.availableBalance;
    case TypeAccount.DLA:
      return product.availableBalance;
    case TypeAccount.CDA:
      return product.availableBalance;
    default:
      return product.balance;
  }
}

function productIcon(product: Product): string {
  switch (product.type) {
    case TypeAccount.LOC:
    case TypeAccount.DLA:
      return 'icon-depositos';
    case TypeAccount.CDA:
      return 'icon-mis_otros_creditos';
    case TypeAccount.FID:
      return 'icon-mis_otros_creditos';
    case TypeAccount.CCA:
      return null;
    default:
      return 'icon-retiro';
  }
}

function productIconImage(product: Product): string {
  switch (product.type) {
    case TypeAccount.CCA:
      return product.franchise;
    default:
      return null;
  }
}

function productTitle(product: Product): string {
  if (product?.nickname) {
    return `${product.nickname} No. ${product.numberProduct}`;
  }
  switch (product.type) {
    case TypeAccount.CCA:
      return `${product.cardType} No. ${product.numberProduct}`;
    default:
      return `${product.typeName} No. ${product.numberProduct}`;
  }
}

function productRightIcon(style: ProductStyleType): string {
  switch (style) {
    case ProductStyleType.standard:
    case ProductStyleType.pocketsSummary:
      return 'icon-tres_puntos';
    default:
      return 'icon-next';
  }
}

function productToggleValue(style: ProductStyleType): boolean {
  switch (style) {
    case ProductStyleType.standard:
    case ProductStyleType.pocketsSummary:
      return true;
    default:
      return false;
  }
}

function productIsNew(product: Product, style: ProductStyleType): boolean {
  switch (style) {
    case ProductStyleType.digitalDebitCard:
      return product?.isNew;
    default:
      return false;
  }
}

function productCardImage(product: Product, style: ProductStyleType): string {
  switch (style) {
    case ProductStyleType.creditCardForQRPay:
    case ProductStyleType.creditCardForAdvance:
    case ProductStyleType.creditCardForDebitPurchase:
      return `cromalites/${product.franchise.toLowerCase()}-${normalize(
        product.cardType.toLowerCase()
      )}.png`;
    case ProductStyleType.debitCardForQRPay:
      return `cromalites/maestro-debit.png`;
    default:
      return null;
  }
}

function productDescriptionWithStyle(
  product: Product,
  style: ProductStyleType
): string {
  switch (style) {
    case ProductStyleType.creditCardForAdvance:
      return 'CARD_ADVANCE.QUOTA_FOR_ADVANCES';
    case ProductStyleType.creditCardForDebitPurchase:
      return 'DEBT_PURCHASE.AVAILABLE';
    case ProductStyleType.pocketsSummary:
    case ProductStyleType.tuplusSummary:
    case ProductStyleType.stocksSummary:
      return null;
    case ProductStyleType.digitalDebitCard:
      return `${getFullProductType({ type: product.acctTypeParent })} No. ${
        product.numberProductParent
      }`;
    default:
      return product.description;
    // return productDescription(product);
  }
}

function productValueWithStyle(
  product: Product,
  style: ProductStyleType
): number {
  switch (style) {
    case ProductStyleType.creditCardForAdvance:
      return product[CARD_ADVANCE_AVAILABLE_FIELD];
    case ProductStyleType.creditCardForDebitPurchase:
      return product[DEBIT_PURCHASE_AVAILABLE_FIELD];
    default:
      return productValue(product);
  }
}

function productValueIsText(
  product: Product,
  style: ProductStyleType
): boolean {
  switch (style) {
    case ProductStyleType.tuplusSummary:
    case ProductStyleType.stocksSummary:
      return true;
    default:
      return false;
  }
}

function productIconWithStyle(
  product: Product,
  style: ProductStyleType
): string {
  switch (style) {
    case ProductStyleType.pocketsSummary:
      return 'icon-bolsillos';
    case ProductStyleType.tuplusSummary:
      return 'icon-estrella';
    case ProductStyleType.stocksSummary:
      return 'icon-flecha_subida';
    default:
      return productIcon(product);
  }
}

function productTitleWithStyle(
  product: Product,
  style: ProductStyleType
): string {
  switch (style) {
    case ProductStyleType.pocketsSummary:
    case ProductStyleType.tuplusSummary:
    case ProductStyleType.stocksSummary:
      return product.typeName;
    case ProductStyleType.digitalDebitCard:
      return `${product.name} No. ${product.numberDigitalCard}`;
    default:
      return productTitle(product);
  }
}

export function mapProductCard(
  product: Product,
  style: ProductStyleType,
  disabled: boolean
): ProductCard {
  return {
    icon: productIconWithStyle(product, style),
    iconImage: productIconImage(product),
    title: productTitleWithStyle(product, style),
    description: productDescriptionWithStyle(product, style),
    value: productValueWithStyle(product, style),
    cardImage: productCardImage(product, style),
    valueIsText: productValueIsText(product, style),
    rightIcon: !disabled ? productRightIcon(style) : null,
    toggleValue: !disabled ? productToggleValue(style) : null,
    isNew: !disabled ? productIsNew(product, style) : false,
    type: product.type as TypeAccount,
    typeDetail: product.productTypeDetailValue,
    avalTagKey: product?.avalTagKey,
    breBUserKeys: product?.breBUserKeys,
    balanceTypeProduct: product?.typeProduct
  };
}
