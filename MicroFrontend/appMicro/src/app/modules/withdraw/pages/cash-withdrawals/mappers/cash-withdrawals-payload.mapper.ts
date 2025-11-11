import { Product } from '@commons/entities/product/product.interface';
import { sanitizeCurrency } from '@commons/helpers/text.helpers';
import {
  CashOutType,
  ChannelType,
  WithdrawPayload
} from '@modules/withdraw/entities/withdraw.interface';

export function mapCashWithdrawalsPayload(values: any): WithdrawPayload {
  const productOrigin: Product = values.productOrigin;
  const amount: number = sanitizeCurrency(values.amount);
  const channel: ChannelType = values.cashWithdrawalChannel;

  return {
    channel,
    amount,
    sourceProduct: {
      productType: productOrigin.type,
      productId: productOrigin.id.toString()
    },
    cashoutType: CashOutType.WITHOUT_CARD
  };
}
