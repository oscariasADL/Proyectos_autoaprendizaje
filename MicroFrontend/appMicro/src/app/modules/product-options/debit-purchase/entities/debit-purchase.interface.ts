export interface DebtPurchasePayload {
  productOrigin: {
    accountType: string;
    accountId: string;
  };
  productTarget: {
    accountType: string;
    accountId: string;
    bankId: string;
  };
  amount: number;
  installments?: number;
}

export interface DebtPurchaseInstallmentsPayload {
  installments: number;
}

export interface RatesResponse {
  annualRate: string;
  monthRate: string;
}
