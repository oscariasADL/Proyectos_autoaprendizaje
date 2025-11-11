import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import { TransferPocketPayload } from '@modules/pockets/pages/pocket-transfer/entities/pocket-transfer.interface';

export function mapPocketTransferPayload(values: any): TransferPocketPayload {
  let extraFields = {};
  const amount: number = sanitizeCurrency(values.amount);

  if (!!values.targetPocket) {
    const [productType, productId] = values.targetPocket.value.split('__');
    extraFields = {
      targetPocket: {
        productType,
        productId
      }
    };
  }

  return {
    parentAccount: {
      productType: values.pocket.productTypeParent,
      productId: values.pocket.productIdParent
    },
    sourcePocket: {
      productType: values.pocket.type,
      productId: values.pocket.numberProduct
    },
    amount,
    ...extraFields
  };
}
