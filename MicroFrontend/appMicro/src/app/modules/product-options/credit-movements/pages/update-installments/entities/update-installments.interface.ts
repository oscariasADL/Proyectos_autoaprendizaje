export interface UpdateInstallmentsPayload {
  productId: string;
  movementId: string;
  actualInstallments: number;
  newInstallments: number;
  pendingInstallments: number;
  debitPurchase?: boolean;
}
