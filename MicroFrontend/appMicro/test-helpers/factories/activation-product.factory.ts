import { TypeAccount } from '@commons/entities/product/type-account';
import {
  ActivationProduct,
  ProductTypeActivation
} from '@modules/security/security-media-activation/entities/security-media.interface';
import * as faker from 'faker';
import { AbstractFactory } from './abstract.factory';

export class ActivationProductFactory extends AbstractFactory {
  public create(): ActivationProduct {
    return {
      activationType: ProductTypeActivation.M,
      type: faker.lorem.word(),
      id: faker.lorem.word(),
      parentType: TypeAccount.CCA,
      parentId: faker.lorem.word(),
      status: faker.lorem.word(),
      cardId: faker.lorem.word(),
      textInfo: faker.lorem.word(),
      cardType: 'black',
      cardFranchise: 'mastercard'
    };
  }
}
