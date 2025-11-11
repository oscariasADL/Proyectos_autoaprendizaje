import { PocketTransferType } from '@modules/pockets/pages/pocket-transfer/constants/pocket-transfer.constants';

export interface TransferPocketPayload {
  parentAccount: {
    productType: string;
    productId: string;
  };
  sourcePocket?: {
    productType: string;
    productId: string;
  };
  targetPocket?: {
    productType: string;
    productId: string;
  };
  amount: number;
}

export interface PocketTransferItemType {
  label: string;
  value: PocketTransferType;
}
