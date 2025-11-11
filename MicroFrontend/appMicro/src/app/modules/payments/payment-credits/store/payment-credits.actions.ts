import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { PaymentPayload } from '@modules/payments/payment-credits/entities/pay-loan.interface';
import {
  PaymentCredit,
  PaymentCredits,
  PaymentFetchFilter
} from '@modules/payments/payment-credits/entities/payment-credits.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';

export const fetchPaymentsFilteredAction = createAction(
  type('[Global/API] Fetch payment filtered'),
  props<{ filter: PaymentFetchFilter }>()
);

export const fetchPaymentsFilteredSuccessAction = createAction(
  type('[Global/API] Fetch payment filtered success'),
  props<{ data: PaymentCredits }>()
);

export const fetchPaymentsFilteredErrorAction = createAction(
  type('[Global/API] Fetch payment filtered error'),
  props<{ message: string }>()
);

export const payLoanAction = createAction(
  type('[Global/API] Pay loan'),
  props<{ payload: PaymentPayload; data: AlertStepData }>()
);

export const payLoanSuccessAction = createAction(
  type('[Global/API] Pay loan success'),
  props<{ props: AlertSheetProperties }>()
);

export const payLoanErrorAction = createAction(
  type('[Global/API] Pay loan error'),
  props<{ props: AlertSheetProperties }>()
);

export const setCreditSelectedAction = createAction(
  type('[Global/UI] Set payment selected'),
  props<{ creditSelected: PaymentCredit }>()
);

export const setPaymentsFilteredAction = createAction(
  type('[Global/UI] Set payment filtered'),
  props<{ filter: PaymentFetchFilter }>()
);
