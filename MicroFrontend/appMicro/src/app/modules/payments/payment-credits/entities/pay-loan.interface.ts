export interface PaymentPayload {
  productOrigin: {
    accountType: string;
    accountId: string;
    bankId: string;
  };
  productTarget: {
    accountType: string;
    accountId: string;
    bankId: string;
    owner?: {
      idType?: string;
      id?: string;
    };
  };
  isOwnLoan?: string;
  amount: number;
}

export interface PayLoanPaymentTypeItem {
  label: string;
  value: PayLoanPaymentType;
}

export enum PayLoanAmountType {
  minPayment = 'minPayment',
  minReduced = 'minReduced',
  totalValue = 'totalValue',
  otherValue = 'otherValue'
}

export enum PayLoanPaymentType {
  normal = 'FN',
  term = 'PT',
  quota = 'PF'
}

export enum CurrencyType {
  COP = 'COP',
  USD = 'USD'
}
