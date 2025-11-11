import { faker } from '@faker-js/faker';

import { AbstractFactory } from '@testing/factories/abstract.factory';
import {
  DigitalDebitCard,
  DigitalDebitCardDetail
} from '@modules/digital-debit-card/entities/digital-debit-card.interface';

export class DigitalDebitCardFactory extends AbstractFactory {
  public create(): DigitalDebitCard {
    return {
      relativeParentId: faker.finance.accountNumber(20),
      numberProductParent: faker.finance.accountNumber(),
      numberDigitalCard: faker.finance.creditCardNumber('mastercard'),
      name: faker.lorem.word(),
      isNew: faker.datatype.boolean()
    };
  }

  public digitalDebitCardDetail(): DigitalDebitCardDetail {
    return {
      numberDigitalCard: faker.finance.creditCardNumber('mastercard'),
      expDate: '10/28',
      cvs: faker.finance.creditCardCVV(),
      name: faker.lorem.word(),
      amount: Number(faker.finance.amount({ min: 10000, max: 100000, dec: 0 }))
    };
  }
}
