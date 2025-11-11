import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { createAction, props } from '@ngrx/store';
import { DebtPurchasePayload } from '../entities/debit-purchase.interface';

export const debitPurchaseAction = createAction(
  type('[Global/API] Debit purchase'),
  props<{ payload: DebtPurchasePayload; data: AlertStepData }>()
);

export const debitPurchaseSuccessAction = createAction(
  type('[Global/API] Debit purchase success'),
  props<{ props: AlertSheetProperties }>()
);

export const debitPurchaseErrorAction = createAction(
  type('[Global/API] Debit purchase error'),
  props<{ props: AlertSheetProperties }>()
);
