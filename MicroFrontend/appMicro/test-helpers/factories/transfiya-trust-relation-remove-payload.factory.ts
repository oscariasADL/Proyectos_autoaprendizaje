import { RemoveTrustRelationPayload } from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';

import { AbstractFactory } from '@testing/factories/abstract.factory';
import * as faker from 'faker';

export class RemoveTrustRelationPayloadFactory extends AbstractFactory {
  public create(): RemoveTrustRelationPayload {
    return {
      relativeId: faker.random.alphaNumeric(),
      phone: faker.datatype.number({ min: 3125678970, max: 3125678950 })
    };
  }
}
