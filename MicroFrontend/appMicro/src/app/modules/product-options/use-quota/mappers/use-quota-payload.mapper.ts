import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { UseQuotaPayload } from '@modules/product-options/use-quota/entities/use-quota.interface';

export function mapUseQuotaPayload(values: any): UseQuotaPayload {
  const fromProduct: Product = values.fromProduct;
  const towardProduct: Product = values.towardProduct;
  const fee: number = values.installments;
  const amount: string = values.amount;

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
