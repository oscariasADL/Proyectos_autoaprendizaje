import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import * as faker from 'faker';
import { AbstractFactory } from './abstract.factory';

export class CreditMovementFactory extends AbstractFactory {
  public create(): CreditMovement {
    return {
      approvalId: faker.datatype.number().toString(),
      movement: null,
      purchaseDate: '01-01-2019',
      companyDescription: faker.lorem.word(),
      purchaseDescription: faker.lorem.word(),
      balance: faker.datatype.number({ min: 20000, max: 100000 }).toString(),
      purchaseValue: faker.datatype
        .number({ min: 20000, max: 100000 })
        .toString(),
      installments: faker.datatype.number({ min: 1, max: 25 }),
      pendingInstallments: faker.datatype.number({ min: 1, max: 10 }),
      rate: faker.datatype.number({ min: 1, max: 25 }).toString(),
      nextPayment: '01-01-2020'
    };
  }
}
