import * as faker from 'faker';

import { AbstractFactory } from './abstract.factory';
import { GMFData } from '@app/commons/entities/gmf/gmf.interface';

export class GMFFactory extends AbstractFactory {
  public create(): GMFData {
    return {
      limitIndicator: faker.lorem.word(),
      isExempt: faker.lorem.word(),
      allowTransaction: faker.lorem.word(),
      costGmf: faker.datatype.number(),
      totalTransaction: faker.datatype.number(),
      amountTransaction: faker.datatype.number(),
      availableBalance: faker.datatype.number(),
      currentBalance: faker.datatype.number(),
      rateGmf: faker.datatype.number()
    };
  }
}
