import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { CreditMovement } from '@modules/product-options/credit-movements/entities/credit-movements.interface';
import { DirectedPaymentPayload } from '@modules/product-options/credit-movements/pages/directed-payment/entities/directed-payment.interface';
import { UpdateInstallmentsPayload } from '@modules/product-options/credit-movements/pages/update-installments/entities/update-installments.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';
import { ToastProperties } from '@commons/entities/toast/toast.entities';

export const fetchCreditMovementsAction = createAction(
  type('[Global/API] Fetch credit movements'),
  props<{ productId: string }>()
);

export const fetchCreditMovementsSuccessAction = createAction(
  type('[Global/API] Fetch credit movements success'),
  props<{ movements: CreditMovement[] }>()
);

export const fetchCreditMovementsErrorAction = createAction(
  type('[Global/API] Fetch credit movements error'),
  props<{ message: string }>()
);

export const directedPaymentAction = createAction(
  type('[Global/API] Directed payment'),
  props<{ payload: DirectedPaymentPayload[]; data: AlertStepData }>()
);

export const directedPaymentSuccessAction = createAction(
  type('[Global/API] Directed payment success'),
  props<{ props: AlertSheetProperties }>()
);

export const directedPaymentErrorAction = createAction(
  type('[Global/API] Directed payment error'),
  props<{ props: AlertSheetProperties }>()
);

export const updateInstallmentsAction = createAction(
  type('[Global/API] Update installments'),
  props<{ payload: UpdateInstallmentsPayload; data: AlertStepData }>()
);

export const updateInstallmentsSuccessAction = createAction(
  type('[Global/API] Update installments success'),
  props<{ props: ToastProperties }>()
);

export const updateInstallmentsErrorAction = createAction(
  type('[Global/API] Update installments error'),
  props<{ props: AlertSheetProperties }>()
);
