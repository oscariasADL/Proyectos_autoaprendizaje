import {
  Pocket,
  PocketTypeEnum
} from '@modules/pockets/entities/pockets.interface';
import * as faker from 'faker';

import { AbstractFactory } from './abstract.factory';

export class PocketFactory extends AbstractFactory {
  public create(): Pocket {
    return {
      nickname: faker.lorem.word(),
      type: faker.lorem.word(),
      typeName: faker.lorem.word(),
      numberProduct: faker.lorem.word(),
      description: faker.lorem.word(),
      pocketType: PocketTypeEnum.TraditionalPocket,
      pocketCategory: faker.datatype.number(),
      progress: faker.lorem.word(),
      startDate: faker.lorem.word(),
      goal: faker.datatype.number(),
      timeElapsed: faker.lorem.word(),
      targetDate: faker.lorem.word(),
      amountSaved: faker.datatype.number(),
      period: faker.lorem.word(),
      status: faker.datatype.number(),
      instalmentAmount: faker.datatype.number(),
      totalInstalments: faker.lorem.word(),
      productTypeParent: faker.lorem.word(),
      productTypeParentDesc: faker.lorem.word(),
      productNumberParent: faker.lorem.word(),
      productIdParent: faker.lorem.word(),
      elapsedDays: faker.datatype.number(),
      elapsedMonths: faker.datatype.number(),
      remainingInstalments: faker.datatype.number()
    };
  }
}
