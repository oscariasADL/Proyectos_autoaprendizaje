import { Product } from '@commons/entities/product/product.interface';

export interface QrPaymentProduct {
  accountNumber: string;
  accountId: string;
  accountBalance: number;
  accountIdUn?: string;
  accountType?: string;
  cardType?: string;
  accountFranchise?: string;
  paymentType?: string;
}

export interface QrPaymentMethod {
  creditCards: Product[] | QrPaymentProduct[];
  debitAccounts: Product[] | QrPaymentProduct[];
}

export interface QrPaymentMethods {
  paymentMethods: QrPaymentProduct[];
}

export interface QrPaymentMethodData {
  paymentMethod: QrPaymentProduct;
  installments: string;
}
