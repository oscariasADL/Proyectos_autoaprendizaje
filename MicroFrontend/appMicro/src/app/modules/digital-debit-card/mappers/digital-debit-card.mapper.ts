import { Balance } from '@commons/entities/product/balance.interface';
import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { isNullOrUndefined } from '@commons/helpers/text.helpers';
import { DigitalDebitCard } from '@modules/digital-debit-card/entities/digital-debit-card.interface';
import { ProductStyleType } from '@modules/product/entities/product.interface';
import { mapProductsByFilter } from '@modules/product/mappers/product-filter.mapper';
import {
  PRODUCT_ACTIONS,
  ProductAction,
  ProductActionType
} from '@modules/product/entities/product-action.interface';

export function mapDigitalDebitCard(
  cards: DigitalDebitCard[],
  cardsViewed: string
): DigitalDebitCard[] {
  if (isNullOrUndefined(cards)) {
    return cards;
  }

  return cards.map((card) => ({
    ...card,
    type: TypeAccount.CCA,
    franchise: 'MASTERCARD',
    style: ProductStyleType.digitalDebitCard,
    isNew: !cardsViewed.split(',').includes(card?.relativeParentId)
  }));
}

export function mapDigitalDebitCardProducts(
  balance: Balance[],
  cards: DigitalDebitCard[]
): Product[] {
  if (isNullOrUndefined(balance)) {
    return balance;
  }

  const balanceMapped = mapProductsByFilter(balance, {
    typeAccountProducts: [TypeAccount.SDA, TypeAccount.DDA]
  });

  const cardsMapped = cards?.map((card) => card?.relativeParentId) || [];

  return balanceMapped.filter((product) => !cardsMapped.includes(product?.id));
}

export function mapShowDigitalDebitCardPanel(products: Product[]): boolean {
  if (isNullOrUndefined(products)) {
    return false;
  }

  return products.length > 0;
}

export function mapDigitalDebitCardActionsList(): ProductAction[] {
  return [
    PRODUCT_ACTIONS[ProductActionType.EditTDD],
    PRODUCT_ACTIONS[ProductActionType.DeleteTDD],
    PRODUCT_ACTIONS[ProductActionType.ReissueTDD]
  ];
}
