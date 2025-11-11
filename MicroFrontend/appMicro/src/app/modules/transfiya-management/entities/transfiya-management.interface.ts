import { TypeAccount } from '@commons/entities/product/type-account';

export interface TransfiyaManagementPayload {
  productOrigin: {
    accountType: TypeAccount;
    accountId: string;
    availableBalance: number;
    typeName: string;
    numberProduct: string;
  };
  mobileOperator: string;
  amount: number;
  phoneNumber: string;
}

export interface TransfiyaManagementTooltip {
  id: string;
  title: string;
  text: string;
}
