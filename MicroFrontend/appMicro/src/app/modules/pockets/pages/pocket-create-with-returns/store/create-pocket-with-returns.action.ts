import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@app/commons/entities/alert/alert-sheet.entities';
import { CreatePocketWithReturnsPayload } from '../entities/create-pocket.interface';
import { AlertStepData } from '@modules/templates/generic-stepper/entities/generic-stepper.entity';
import { SuccessResponse } from '@commons/entities/response/response.interface';
import { VoucherItem } from '@commons/components/voucher/entities/voucher.entities';

export const CreatePocketAction = createAction(
  type('[POCKETS WITH RETURNS] Create pocket with returns'),
  props<{ payload: CreatePocketWithReturnsPayload; data: AlertStepData }>()
);

export const CreatePocketSuccessAction = createAction(
  type('[POCKETS WITH RETURNS] Create pocket with returns success'),
  props<{ response: SuccessResponse; items: VoucherItem[] }>()
);

export const CreatePocketErrorAction = createAction(
  type('[POCKETS WITH RETURNS] Create pocket with returns error'),
  props<{ props: AlertSheetProperties }>()
);
