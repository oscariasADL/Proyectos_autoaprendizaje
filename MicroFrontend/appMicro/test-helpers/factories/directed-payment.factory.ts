import { faker } from '@faker-js/faker';

import { AbstractFactory } from '@testing/factories/abstract.factory';
import { GroupedCreditMovements } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';

export class DirectedPaymentFactory extends AbstractFactory {
  public create(): GroupedCreditMovements {
    return {
      date: '',
      values: Array(5).fill(0).map(this.createCreditMovements)
    };
  }

  private createCreditMovements(): CreditMovement {
    const balance = faker.finance.amount({ min: 1000, max: 500000, dec: 0 });
    const installments = faker.finance.amount({ min: 1, max: 36, dec: 0 });
    return {
      approvalId: faker.finance.bic(),
      purchaseDate: faker.date
        .between({
          from: '2023-07-01T00:00:00.000Z',
          to: '2024-01-01T00:00:00.000Z'
        })
        .toString(),
      companyDescription: faker.company.name(),
      purchaseDescription: faker.commerce.productName(),
      balance,
      purchaseValue: faker.finance.amount({
        min: 1000,
        max: Number(balance),
        dec: 0
      }),
      installments: Number(installments),
      pendingInstallments: Number(
        faker.finance.amount({ min: 1, max: Number(installments), dec: 0 })
      ),
      rate: faker.finance.amount({ min: 1, max: 45 }) + '%',
      nextPayment: ''
    };
  }
}
