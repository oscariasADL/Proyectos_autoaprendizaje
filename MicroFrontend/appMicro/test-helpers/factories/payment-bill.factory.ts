import { faker } from '@faker-js/faker';
import * as fakerLegacy from 'faker';

import { AbstractFactory } from './abstract.factory';
import {
  SearchBillBarcodeResponse,
  SearchBillReferenceResponse,
  ServiceData
} from '@modules/payments/payment-services/entities/register-service.interface';
import {
  PaymentBill,
  PaymentServiceCardItemInfo,
  PaymentServiceCardItemLabels,
  PaymentServiceScheduleCreatePayload,
  PaymentServicesResponse,
  ServicePaymentScheduleType
} from '@modules/payments/payment-services/entities/payment-services.interface';

export class PaymentBillFactory extends AbstractFactory {
  public create(): PaymentBill {
    return {
      alias: fakerLegacy.lorem.word(),
      referenceId: fakerLegacy.lorem.word(),
      organizationName: fakerLegacy.lorem.word(),
      maxPaymentDate: fakerLegacy.lorem.word(),
      currency: fakerLegacy.lorem.word(),
      amount: fakerLegacy.datatype.number({ min: 10, max: 10000 }).toString(),
      paid: fakerLegacy.datatype.boolean(),
      enablePaymentButton: fakerLegacy.datatype.boolean(),
      organizationId: fakerLegacy.lorem.word(),
      amountType: fakerLegacy.lorem.word(),
      invoiceNumber: fakerLegacy.lorem.word(),
      agreementType: fakerLegacy.datatype.number({ min: 10, max: 90 }),
      maxPaymentDateComplete: fakerLegacy.lorem.word(),
      biller: fakerLegacy.datatype.boolean(),
      scheduleType: ServicePaymentScheduleType.BANK_RECEIVES_BILL,
      schedulePayment: fakerLegacy.datatype.boolean(),
      maxAmountRecurring: fakerLegacy.datatype.number({ min: 10, max: 10000 })
    };
  }

  public buildPaymentServicesResponse(): PaymentServicesResponse {
    const total = 50;
    return {
      biller: this.createBulk(total).filter((bill) => bill.biller),
      noBiller: this.createBulk(total).filter((bill) => !bill.biller)
    };
  }

  public buildSearchBillReferenceResponse(): SearchBillReferenceResponse {
    return {
      referenceId: fakerLegacy.lorem.word(),
      agreementType: fakerLegacy.datatype.number({ min: 10, max: 90 }),
      invoiceNumber: fakerLegacy.lorem.word(),
      maxPaymentDate: fakerLegacy.lorem.word(),
      maxPaymentDateComplete: fakerLegacy.lorem.word(),
      amount: fakerLegacy.datatype.number({ min: 10, max: 90 }),
      amountType: fakerLegacy.lorem.word(),
      biller: fakerLegacy.datatype.boolean()
    };
  }

  public buildServiceData(): ServiceData {
    return {
      name: fakerLegacy.lorem.word(),
      description: fakerLegacy.lorem.word(),
      orgIdNum: fakerLegacy.lorem.word(),
      imageUrl: fakerLegacy.lorem.word(),
      isBiller: fakerLegacy.datatype.boolean(),
      cityInfo: {
        code: fakerLegacy.lorem.word(),
        name: fakerLegacy.lorem.word()
      }
    };
  }

  public buildBarcodeServiceData(): SearchBillBarcodeResponse {
    return {
      amount: fakerLegacy.datatype.number({ min: 10, max: 90 }),
      serviceType: fakerLegacy.lorem.word(),
      invoiceNum: fakerLegacy.lorem.word(),
      nie: fakerLegacy.lorem.word(),
      orgId: {
        orgIdNum: fakerLegacy.lorem.word(),
        optOrgIdNum: fakerLegacy.lorem.word()
      },
      biller: fakerLegacy.datatype.boolean(),
      amountType: fakerLegacy.lorem.word()
    };
  }

  public buildBillSchedulePayloadData(): PaymentServiceScheduleCreatePayload {
    return {
      recurringType: faker.helpers.arrayElement(['1', '2']),
      amount: faker.number.int({ min: 100000, max: 500000 }),
      productId: faker.string.numeric(20),
      nickname: faker.company.name(),
      orgIdNum: faker.string.numeric(7),
      nie: faker.string.numeric(9)
    };
  }

  public buildPaymentServiceCardItemInfo(): PaymentServiceCardItemInfo[] {
    return [
      {
        id: PaymentServiceCardItemLabels.PAYMENT_REFERENCE,
        label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_REFERENCE',
        valueText: `No. ${faker.number.int({ min: 10 })}`
      },
      {
        id: PaymentServiceCardItemLabels.PAYMENT_AMOUNT,
        label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_AMOUNT',
        value: faker.number.int()
      },
      {
        id: PaymentServiceCardItemLabels.PAYMENT_LIMIT,
        label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_LIMIT',
        valueText: faker.date.anytime().toString()
      },
      {
        id: PaymentServiceCardItemLabels.PAY,
        label: 'PAYMENTS.SERVICES.HOME.CARD.LABELS.PAYMENT_LIMIT',
        valueText: faker.date.anytime().toString()
      }
    ];
  }
}
