import { TransfiyaAuthorizationItem } from '@commons/entities/notifications/transfiya.entities';
import { ServiceData } from '@modules/payments/payment-services/entities/register-service.interface';
import * as faker from 'faker';
import { AbstractFactory } from './abstract.factory';

export class TransfiyaAuthorizationFactory extends AbstractFactory {
  public create(): TransfiyaAuthorizationItem {
    return {
      amount: faker.datatype.number({ min: 1000, max: 40000 }),
      targetNumber: faker.lorem.word(),
      note: faker.lorem.word(),
      transactionId: faker.lorem.word(),
      isRequest: faker.datatype.boolean()
    };
  }
}
