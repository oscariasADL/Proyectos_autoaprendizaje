export const transfersCel2celFeatureName = 'transfersCel2celModule';

export type TransfersCel2celState = Readonly<{
  towardProducts: any[];
  towardBankIds: string[];
  working: boolean;
  completed: boolean;
  message: string;
  useTransfiya: boolean;
}>;

export const initialTransfersCel2celState: TransfersCel2celState = {
  towardBankIds: null,
  towardProducts: null,
  working: false,
  completed: false,
  message: null,
  useTransfiya: false
};
