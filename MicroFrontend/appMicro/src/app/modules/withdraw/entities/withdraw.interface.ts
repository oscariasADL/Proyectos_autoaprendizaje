import { TransferType } from '@modules/transfers/entities/transfers.interface';

export enum CashOutType {
  MONEY_ORDER = 'MONEY_ORDER',
  WITHOUT_CARD = 'WITHOUT_CARD'
}

export enum ChannelType {
  ATM = 'ATM',
  CB = 'CB'
}

export interface ProductPayload {
  productType: string;
  productId: string;
}

export interface WithdrawPayload {
  cashoutType: CashOutType;
  channel: ChannelType;
  sourceProduct: ProductPayload;
  amount: number;
  beneficiaryDocumentId?: string;
}

export const CASH_OUT_TYPE = {
  [CashOutType.MONEY_ORDER]: 'money-order',
  [CashOutType.WITHOUT_CARD]: 'without-card'
};
