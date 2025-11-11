import { RadioInput } from '@modules/forms-avv/entities/radio.interface';

export const SCHEDULE_TYPES_OPTIONS: RadioInput[] = [
  {
    label: 'PAYMENTS.SERVICES.SCHEDULING.CREATE.FIELDS.OPTIONS.ON_INVOICE_DATE',
    value: '1'
  },
  {
    label: 'PAYMENTS.SERVICES.SCHEDULING.CREATE.FIELDS.OPTIONS.ON_DUE_DATE',
    value: '2'
  }
];
