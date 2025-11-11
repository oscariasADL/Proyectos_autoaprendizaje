import { Movement } from '@commons/entities/product/movement.interface';

export interface CreditMovement {
  approvalId: string;
  movement?: Movement;
  purchaseDate: string;
  companyDescription: string;
  purchaseDescription: string;
  balance: string;
  purchaseValue: string;
  installments: number;
  pendingInstallments: number;
  rate: string;
  nextPayment: string;
  valueToPay?: number;
  otherValue?: number | string;
}
