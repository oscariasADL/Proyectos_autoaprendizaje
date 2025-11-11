export interface FeePayload {
  transactionId: number;
  accountId: string;
  accountType: string;
  amount?: number;
}

export interface Fee {
  id: number;
  code: string;
  amount: number;
}

export const TransactionCostIds = {
  TransferToAVVillas: 200022,
  TransferToAVAL: 200100,
  TransferToACH: 200023,
  PaymentCreditCardAVVillas: 200020,
  PaymentCreditCardAVAL: 200101,
  PaymentCreditCardOtherBanks: 200101,
  PaymentLoanAVVillas: 0,
  PaymentLoanAVAL: 200102,
  PaymentBills: 200069,
  WithdrawalWithoutCard: 200304,
  WithdrawalMoneyOrder: 200411,
  DebtPurchase: 200101,
  CardAdvance: 200061,
  UseQuota: 0,
  PaymentPile: 200081,
  PhoneRecharge: 0,
  DirectedPayment: 0,
  Transfiya: 200916,
  RequestTransfiya: 0,
  TransfiyaManagement: 0,
  AVVillasCellPhones: 0,
  PaymentTaxes: 200407
};

export const DEFAULT_FEE = {
  code: 'COP',
  amount: null,
  id: 0
};
