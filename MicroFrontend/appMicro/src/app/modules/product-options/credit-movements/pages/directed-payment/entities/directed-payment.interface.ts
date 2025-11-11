import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';

export interface DirectedPaymentPayload {
  productOrigin: {
    accountType: string;
    accountId: string;
  };
  productTarget: {
    accountType: string;
    id: string;
    bankId: string;
  };
  purchaseValue: string;
  rate: string;
  purchaseDescription: string;
  companyDescription: string;
  purchaseDate: string;
  installments: number;
  approvalId: string;
  directedPayment: number;
  balance: string;
}

export interface DirectedPaymentResponse
  extends Omit<
    Partial<DirectedPaymentPayload>,
    'productOrigin' | 'productTarget'
  > {
  approvalIdOld: string;
  directedPaymentStatus: boolean;
  checkNum?: string;
  transactionDate?: string;
  messageError?: string;
  codeError?: string;
}

export interface GroupedCreditMovements {
  date: string;
  values: CreditMovement[];
}

export enum DirectedPaymentType {
  totalValue = 'totalValue',
  otherValue = 'otherValue'
}
