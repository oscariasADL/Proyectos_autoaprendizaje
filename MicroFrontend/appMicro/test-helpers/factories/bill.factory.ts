import { faker } from '@faker-js/faker';

import { ServiceData } from '@modules/payments/payment-services/entities/register-service.interface';
import { AbstractFactory } from './abstract.factory';

export class BillFactory extends AbstractFactory {
  public create(): ServiceData {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      orgIdNum: faker.finance.routingNumber(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'abstract' }),
      isBiller: faker.datatype.boolean(),
      cityInfo: {
        code: faker.number.int({ min: 10, max: 90 }).toString(),
        name: faker.location.city()
      }
    };
  }

  public mockToBarcode(): ServiceData {
    return {
      name: 'ASO COPROPIETARIOS PAR CERRITO',
      description: 'Bogotá D.C. - Fondo de empleados',
      orgIdNum: '00000923',
      imageUrl: faker.lorem.word(),
      isBiller: true,
      cityInfo: {
        code: '11001',
        name: 'Bogotá D.C.'
      }
    };
  }
}
