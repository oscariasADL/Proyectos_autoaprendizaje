import { TypeAccount } from '@commons/entities/product/type-account';

export interface DefaultAccount {
  accountId: string;
  accountType: TypeAccount;
  accountStatus: boolean;
}
