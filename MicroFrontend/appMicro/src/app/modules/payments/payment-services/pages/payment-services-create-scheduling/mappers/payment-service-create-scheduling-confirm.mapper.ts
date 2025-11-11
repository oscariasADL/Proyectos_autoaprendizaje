import {
  PaymentBill,
  ServicePaymentScheduleType
} from '@modules/payments/payment-services/entities/payment-services.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';
import { Product } from '@commons/entities/product/product.interface';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';

export function mapPaymentServiceCreateSchedulingConfirm(
  bill: PaymentBill,
  product: Product
): VoucherItem[] {
  const currencyFormatPipe = new CurrencyFormatPipe('en-US');
  return [
    {
      id: 'service',
      label: 'Servicio',
      fields: [bill.organizationName]
    },
    {
      id: 'referenceId',
      label: 'Referencia de pago',
      fields: [bill.referenceId]
    },
    {
      id: 'name',
      label: 'Nombre',
      fields: [bill.alias]
    },
    {
      id: 'maxAmountRecurring',
      label: 'Valor máximo de pago',
      fields: [currencyFormatPipe.transform(bill.maxAmountRecurring)]
    },
    {
      id: 'from',
      label: 'Desde',
      fields: [`${product.typeName} No. ${product.numberProduct}`]
    },
    {
      id: 'paymentDate',
      label: 'Fecha de pago',
      fields: [
        bill.scheduleType.toString() ===
        ServicePaymentScheduleType.BANK_RECEIVES_BILL.toString()
          ? 'PAYMENTS.SERVICES.SCHEDULING.CREATE.FIELDS.OPTIONS.ON_INVOICE_DATE'
          : 'PAYMENTS.SERVICES.SCHEDULING.CREATE.FIELDS.OPTIONS.ON_DUE_DATE'
      ]
    }
  ];
}
