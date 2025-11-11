import { TypeAccount } from '@commons/entities/product/type-account';

export interface CardAdvancePayload {
  sourceAccount: {
    productType: TypeAccount;
    productId: string;
  };
  targetAccount: {
    productType: TypeAccount;
    productId: string;
  };
  amount: number;
  fee: number;
}
