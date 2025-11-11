import {
  AlertSheetProperties,
  AlertSheetType
} from '@commons/entities/alert/alert-sheet.entities';
import { Step } from '@modules/forms-avv/entities/stepper.interface';
import {
  PayLoanPaymentType,
  PayLoanPaymentTypeItem
} from '@modules/payments/payment-credits/entities/pay-loan.interface';
import { DetailTypePayment } from '@modules/payments/payment-credits/entities/payment-credits.interface';

export enum PayLoanSlide {
  from = 'from',
  amount = 'amount',
  type = 'type',
  confirmation = 'confirmation'
}

export const PayLoanStep = {
  [PayLoanSlide.from]: 0,
  [PayLoanSlide.amount]: 1,
  [PayLoanSlide.type]: 1.5,
  [PayLoanSlide.confirmation]: 2
};

export const PAY_LOAN_STEPS: Step[] = [
  {
    id: PayLoanStep[PayLoanSlide.from],
    label: 'PAYMENTS.PAY_LOAN.STEPS.FROM'
  },
  {
    id: PayLoanStep[PayLoanSlide.amount],
    label: 'PAYMENTS.PAY_LOAN.STEPS.VALUE'
  },
  {
    id: PayLoanStep[PayLoanSlide.confirmation],
    label: 'PAYMENTS.PAY_LOAN.STEPS.CONFIRM'
  }
];

export const PAY_LOAN_EXIT_DATA: AlertSheetProperties = {
  type: AlertSheetType.question,
  icon: 'billete.svg',
  id: 'pay-loan-confirm-exit-alert',
  title: 'PAYMENTS.PAY_LOAN.EXIT_DATA',
  description: 'MODAL_CONFIRM_CANCEL_TRANSACTION.DESCRIPTION',
  buttons: [
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_OK',
    'MODAL_CONFIRM_CANCEL_TRANSACTION.BUTTON_CANCEL'
  ]
};

export const PAY_LOAN_AVAILABLE_FIELD = 'availableBalance';
export const PAY_LOAN_VILLAS: DetailTypePayment[] = [
  DetailTypePayment.CREDIT_CARD_VILLAS,
  DetailTypePayment.AVAL_CREDITS_VILLAS
];
export const PAY_LOAN_CONTACTS: DetailTypePayment[] = [
  DetailTypePayment.CREDIT_CARD_OTHERS,
  DetailTypePayment.CREDIT_CARD_CONTACTS,
  DetailTypePayment.AVAL_CREDITS_OTHERS,
  DetailTypePayment.AVAL_CREDITS_CONTACTS
];

export const PAY_LOAN_PAYMENT_TYPE_LIST: PayLoanPaymentTypeItem[] = [
  {
    label: 'PAYMENTS.PAY_LOAN.PAYMENT_TYPE_LIST.QUOTA',
    value: PayLoanPaymentType.quota
  },
  {
    label: 'PAYMENTS.PAY_LOAN.PAYMENT_TYPE_LIST.TERM',
    value: PayLoanPaymentType.term
  }
];

export const PAY_LOAN_PAYMENT_TYPE_TEXT: { [type: string]: string[] } = {
  [PayLoanPaymentType.normal]: [
    'PAYMENTS.PAY_LOAN.PAYMENT_TYPE_TEXT.MONTHLY_INSTALLMENT_PAYMENT'
  ],
  [PayLoanPaymentType.quota]: [
    'PAYMENTS.PAY_LOAN.PAYMENT_TYPE_TEXT.EXTRAORDINARY_PAYMENT',
    'PAYMENTS.PAY_LOAN.PAYMENT_TYPE_TEXT.REDUCE_QUOTA'
  ],
  [PayLoanPaymentType.term]: [
    'PAYMENTS.PAY_LOAN.PAYMENT_TYPE_TEXT.EXTRAORDINARY_PAYMENT',
    'PAYMENTS.PAY_LOAN.PAYMENT_TYPE_TEXT.REDUCE_TERM'
  ]
};
