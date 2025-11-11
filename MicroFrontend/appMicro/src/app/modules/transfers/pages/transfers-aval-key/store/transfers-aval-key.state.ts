import { AccountAvalKey } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';

export const transfersAvalKeyFeatureName = 'transfersAvalKey';

export type TransfersAvalKeyState = Readonly<{
  accountAvalKey: AccountAvalKey;
  working: boolean;
  completed: boolean;
}>;

export const initialTransfersAvalKeyState: TransfersAvalKeyState = {
  accountAvalKey: null,
  working: false,
  completed: false
};
