import { Product } from '@commons/entities/product/product.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { CreatePocketPayload } from '@modules/pockets/pages/pocket-create/entities/pocket-create.interface';

export function mapPocketCreatePayload(values: any): CreatePocketPayload {
  const name: string = values.name.trim();
  const product: Product = values.product;
  const period: string = values.period.label.toString().toUpperCase();
  const pocketCategory: number = values.category.value;
  const goal: number = sanitizeCurrency(values.goal);
  const quota: number = sanitizeCurrency(values.quota);
  const openAmount: number = sanitizeCurrency(values.openAmount) || 0;

  return {
    openAmount,
    goal,
    name,
    period,
    quota,
    pocketCategory,
    productNumberParent: product.numberProduct,
    productTypeParent: product.type as TypeAccount,
    productIdParent: product.id.toString()
  };
}
