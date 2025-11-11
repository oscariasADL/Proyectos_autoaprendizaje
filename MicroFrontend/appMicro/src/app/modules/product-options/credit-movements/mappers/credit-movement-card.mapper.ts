import { FilterMove } from '@commons/entities/product/movement.interface';
import { TypeAccount } from '@commons/entities/product/type-account';
import { capitalizeAll } from '@commons/helpers/text.helpers';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';

export function mapCreditMovementCard(movement: CreditMovement): any {
  return {
    date: new Date(movement?.purchaseDate),
    description: `${capitalizeAll(
      movement?.purchaseDescription
    )} - ${capitalizeAll(movement.companyDescription)}`,
    state: FilterMove.Up,
    valueMove: movement?.purchaseValue,
    totalInstalments: movement?.installments.toString(),
    instalmentsPaid: (
      movement?.installments - movement?.pendingInstallments
    ).toString(),
    rate: movement?.rate,
    typeAccount: TypeAccount.CCA,
    rightIcon: 'icon-next'
  };
}
