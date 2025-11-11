import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { CardAdvancePayload } from '@modules/product-options/card-advance/entities/card-advance.interface';

export function mapCardAdvancePayload(values: any): CardAdvancePayload {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const amount: string = values.amount;
  const fee: number = values.installments;

  return {
    sourceAccount: {
      productType: fromProduct.type as TypeAccount,
      productId: fromProduct.id.toString()
    },
    targetAccount: {
      productType: towardProduct.type as TypeAccount,
      productId: towardProduct.id.toString()
    },
    amount: sanitizeCurrency(amount),
    fee
  };
}
