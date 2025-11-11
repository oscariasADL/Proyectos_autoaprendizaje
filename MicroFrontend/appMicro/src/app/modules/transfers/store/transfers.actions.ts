import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { TransferPayload } from '@modules/transfers/entities/transfers.interface';
import { createAction, props } from '@ngrx/store';
import { CheckCustomerResult } from '../pages/transfers-remittances/interfaces/remittance-services.interface';
import { Product } from '@app/commons/entities/product/product.interface';

export const transferAction = createAction(
  type('[Global/API] Transfer'),
  props<{ payload: TransferPayload; data: AlertStepData }>()
);

export const transferSuccessAction = createAction(
  type('[Global/API] Transfer success'),
  props<{ props: AlertSheetProperties }>()
);

export const transferErrorAction = createAction(
  type('[Global/API] Transfer error'),
  props<{ props: AlertSheetProperties }>()
);

export const remittanceAction = createAction(
  type('[Remittances/API] trigger remittance')
);
export const remittanceSuccessAction = createAction(
  type('[Remittances/API] success remittance'),
  props<{ result: CheckCustomerResult }>()
);
export const remittanceErrorAction = createAction(
  type('[Remittances/API] error remittance'),
  props<{ error }>()
);

export const handleCustomerFlowAction = createAction(
  '[Remittances/API] Handle Customer Flow',
  props<{ customerResult: CheckCustomerResult; product: Product }>()
);

export const handleCustomerFlowSuccessAction = createAction(
  '[Remittances/API] Handle Customer Flow Success',
  props<{ result: CheckCustomerResult }>()
);

export const handleCustomerFlowErrorAction = createAction(
  '[Remittances/API] Handle Customer Flow Error',
  props<{ error: any }>()
);
