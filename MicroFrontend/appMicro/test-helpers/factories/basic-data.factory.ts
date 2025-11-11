import { faker } from '@faker-js/faker';
import { AbstractFactory } from '@testing/factories/abstract.factory';

export class BasicDataClientFactory extends AbstractFactory {
  public create() {
    return {
      lastAuthInfo: faker.date.recent().toISOString(),
      clientName: faker.person.fullName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      documentType: faker.helpers.arrayElement(['CC', 'TI', 'CE']),
      documentNumber: faker.string.alphanumeric(8),
      ip: faker.internet.ip(),
      signStatus: faker.number.int({ min: 0, max: 3 }),
      adviserEmail: faker.internet.email(),
      adviserPhone: faker.phone.number(),
      phoneNumberStatus: faker.helpers.arrayElement([
        'Verificado',
        'No Verificado',
        'Pendiente'
      ]),
      channelState: faker.helpers.arrayElement([
        'Activo',
        'Inactivo',
        'Suspendido'
      ]),
      phoneNumber: faker.phone.number(),
      emailType: faker.helpers.arrayElement(['Personal', 'Trabajo', 'Otro']),
      adviserName: faker.person.fullName(),
      email: faker.internet.email(),
      hasCreditProducts: faker.datatype.boolean(),
      hasDigitalCard: faker.datatype.boolean()
    };
  }
}
