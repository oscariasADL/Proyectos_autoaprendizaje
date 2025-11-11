import { DefaultAccount } from '@modules/transfers/pages/transfers-default-account/entities/transfers-default-account.entities';

export const transfersDefaultAccountFeatureName = 'transfersDefaultAccount';

export type TransfersDefaultAccountState = Readonly<{
  defaultAccount: DefaultAccount;
  working: boolean;
  completed: boolean;
  error: string;
}>;

export const initialTransfersDefaultAccount: TransfersDefaultAccountState = {
  defaultAccount: null,
  working: false,
  completed: false,
  error: null
};
