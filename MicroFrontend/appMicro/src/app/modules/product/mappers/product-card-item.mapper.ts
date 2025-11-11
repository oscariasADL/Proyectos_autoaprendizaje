import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { normalize } from '@commons/helpers/text.helpers';
import { CARD_ADVANCE_AVAILABLE_FIELD } from '@modules/product-options/card-advance/constants/card-advance.constants';
import { DEBIT_PURCHASE_AVAILABLE_FIELD } from '@modules/product-options/debit-purchase/constants/debit-purchase.constants';
import { ProductCard } from '@modules/product/entities/product-card.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';

function productTitleByType(product: Product): string {
  switch (product.type) {
    case TypeAccount.SDA:
      return 'Ahorros';
    case TypeAccount.DDA:
      return 'Corriente';
    case TypeAccount.AFC:
      return 'AFC';
    case TypeAccount.CCA:
      return 'Tarjeta Crédito';
    case TypeAccount.LOC:
      return 'Rotativo';
    case TypeAccount.FID:
      return 'Fiducia';
    case TypeAccount.DLA:
      return 'Crédito';
    case TypeAccount.CDA:
      return 'CDT';
    case TypeAccount.CH:
      return 'Hipotecario';
    default:
      return 'Cta.';
  }
}

function productDescription(product: Product): string {
  switch (product.type) {
    case TypeAccount.SDA:
    case TypeAccount.DLA:
    case TypeAccount.FID:
    case TypeAccount.CDA:
      return 'PRODUCT.DESCRIPTION.AVAILABLE';
    case TypeAccount.LOC:
      return 'PRODUCT.DESCRIPTION.QUOTA';
    case TypeAccount.CCA:
      return 'PRODUCT.DESCRIPTION.AVAILABLE_PURCHASES';
    case TypeAccount.AFC:
      return 'PRODUCT.DESCRIPTION.AVAILABLE_FOR_HOUSING';
    default:
      return 'PRODUCT.DESCRIPTION.AVAILABLE';
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
    case TypeAccount.CDA:
      return product.startupValue;
    case TypeAccount.DLA:
      return product.forPayment;
    case TypeAccount.LOC:
      return product.availableBalance;
    case TypeAccount.FID:
      return product.availableBalance;
    case TypeAccount.CCA:
      return product.availablePurchasesBalance;
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
      return `${productTitleByType(product)} No. ${product.numberProduct}`;
  }
}

function productRightIcon(style: ProductStyleType): string {
  switch (style) {
    case ProductStyleType.standard:
    case ProductStyleType.pocketsSummary:
      return 'icon-tres_puntos';
    case ProductStyleType.standardWithRates:
      return null;
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
      return 'PRODUCT.DESCRIPTION.QUOTA_FOR_ADVANCES';
    case ProductStyleType.creditCardForDebitPurchase:
      return 'PRODUCT.DESCRIPTION.AVAILABLE';
    case ProductStyleType.pocketsSummary:
      return null;
    default:
      return productDescription(product);
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

function productIconWithStyle(
  product: Product,
  style: ProductStyleType
): string {
  switch (style) {
    case ProductStyleType.pocketsSummary:
      return 'icon-bolsillos';
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
      return product.typeName;
    default:
      return productTitle(product);
  }
}

export function mapProductCardItem(
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
    rightIcon: !disabled ? productRightIcon(style) : null,
    toggleValue: !disabled ? productToggleValue(style) : null,
    currency: product.currency || 'COP',
    product,
    balanceTypeProduct: product?.balanceTypeProduct
  };
}
