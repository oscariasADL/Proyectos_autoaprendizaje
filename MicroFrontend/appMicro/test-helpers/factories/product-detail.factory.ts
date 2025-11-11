import { TypeAccount } from '@commons/entities/product/type-account';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import * as faker from 'faker';

import { AbstractFactory } from './abstract.factory';

export class ProductDetailFactory extends AbstractFactory {
  public create(): ProductDetail {
    return {
      id: faker.datatype.number(),
      type: TypeAccount.SDA,
      typeName: faker.lorem.word(),
      numberProduct: faker.datatype.number().toString(),
      balance: faker.datatype.number(),
      expense: faker.datatype.number(),
      availableBalance: faker.datatype.number({ min: 20000, max: 100000 }),
      availableBarPercentage: faker.datatype.number(),
      accountType: 0,
      dueDate: '01-01-2019'
    };
  }
}
