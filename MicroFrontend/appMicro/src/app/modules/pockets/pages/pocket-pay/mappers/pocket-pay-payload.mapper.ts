import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { TransferPocketPayload } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';

export function mapPocketPayPayload(values: any): TransferPocketPayload {
  const amount: number = sanitizeCurrency(values.amount);

  return {
    parentAccount: {
      productType: values.pocket.productTypeParent,
      productId: values.pocket.productIdParent
    },
    targetPocket: {
      productType: values.pocket.type,
      productId: values.pocket.numberProduct
    },
    amount
  };
}
