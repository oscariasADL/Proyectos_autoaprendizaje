import { Product } from '@commons/entities/product/product.interface';
import * as faker from 'faker';

import { AbstractFactory } from './abstract.factory';

export class ProductFactory extends AbstractFactory {
  public create(overrides?: Partial<Product>): Product {
    const defaultProduct = {
      id: faker.datatype.number(),
      idUM: faker.datatype.number(),
      type: faker.lorem.word(),
      typeName: faker.lorem.word(),
      numberProduct: faker.datatype.number().toString(),
      balance: faker.datatype.number(),
      expense: faker.datatype.number(),
      availableBalance: faker.datatype.number({ min: 20000, max: 100000 }),
      availableBarPercentage: faker.datatype.number(),
      accountType: 0,
      dueDate: '01-01-2019'
    };
    return { ...defaultProduct, ...overrides };
  }
}
