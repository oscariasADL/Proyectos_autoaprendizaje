import { TypeAccount } from '@commons/entities/product/type-account';

export interface UseQuotaPayload {
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

export interface UseQuotaInstallmentsResponse {
  installments: number;
}
