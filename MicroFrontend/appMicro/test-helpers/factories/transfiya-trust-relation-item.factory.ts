import * as faker from 'faker';

import { AbstractFactory } from './abstract.factory';
import { TrustRelationItem } from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';

export class TrustRelationItemFactory extends AbstractFactory {
  public create(): TrustRelationItem {
    return {
      nickname: faker.name.firstName(),
      phone: String(faker.datatype.number({ min: 3125678970, max: 3125678950 }))
    };
  }
}
