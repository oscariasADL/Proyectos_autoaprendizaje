import { Product } from '@commons/entities/product/product.interface';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { UpdateInstallmentsPayload } from '../entities/update-installments.interface';

export function mapUpdateInstallmentsPayload(
  values: any
): UpdateInstallmentsPayload {
  const fromProduct: Product = values.fromProduct;
  const movement: CreditMovement = values.movement;
  const installments: number = values.installments;
  const isDebitPurchase: boolean = values.isDebitPurchase;

  const { installments: actualInstallments, pendingInstallments } = movement;

  return {
    productId: fromProduct.id.toString(),
    movementId: movement.approvalId.toString(),
    newInstallments: installments,
    actualInstallments,
    pendingInstallments,
    debitPurchase: isDebitPurchase
  };
}
