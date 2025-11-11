import { Product } from '@commons/entities/product/product.interface';
import {
  sanitizeCurrency,
  sanitizeDocument
} from '@commons/helpers/text.helpers';
import {
  CashOutType,
  ChannelType,
  WithdrawPayload
} from '@modules/withdraw/entities/withdraw.interface';

export function mapMoneyOrdersPayload(values: any): WithdrawPayload {
  const productOrigin: Product = values.productOrigin;
  const amount: number = sanitizeCurrency(values.amount);
  const channel: ChannelType = values.moneyOrderChannel;
  const beneficiaryDocumentId: string = sanitizeDocument(values.who);

  return {
    channel,
    amount,
    beneficiaryDocumentId,
    sourceProduct: {
      productType: productOrigin.type,
      productId: productOrigin.id.toString()
    },
    cashoutType: CashOutType.MONEY_ORDER
  };
}
