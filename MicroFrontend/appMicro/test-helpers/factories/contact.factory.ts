import {
  Contact,
  ContactProduct,
  ContactProductFilter,
  StatusType
} from '@modules/contacts/entities/contact.interface';
import * as faker from 'faker';
import { AbstractFactory } from './abstract.factory';

export class ContactFactory extends AbstractFactory {
  public create(): Contact {
    return {
      name: faker.lorem.word(),
      nickname: faker.lorem.word(),
      phoneNumber: faker.lorem.word(),
      email: faker.lorem.word(),
      identificationData: {
        idType: 'CC',
        id: faker.datatype.number({ min: 1, max: 1000 }).toString(),
        filter: ContactProductFilter.ALL
      },
      products: [],
      product: this.createContactProduct(),
      urlDetail: faker.lorem.word(),
      urlEdit: faker.lorem.word(),
      isFake: faker.datatype.boolean(),
      status: StatusType.ACTIVE
    };
  }
  public createContactProduct(): ContactProduct {
    return {
      id: faker.datatype.number({ min: 1, max: 1000 }).toString(),
      alias: faker.lorem.word(),
      type: {
        id: faker.datatype.number({ min: 1, max: 1000 }).toString(),
        name: faker.lorem.word()
      },
      number: faker.datatype.number({ min: 1, max: 1000 }).toString(),
      bank: {
        id: faker.datatype.number({ min: 1, max: 1000 }).toString(),
        name: faker.lorem.word(),
        grupo: faker.lorem.word()
      }
    };
  }
}
