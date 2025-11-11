import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { CancelAccountPayload } from '@modules/product-options/cancel-account/entities/cancel-account.interface';

export const cancelAccountAction = createAction(
  type('[CancelAccount] Cancel account'),
  props<{ cancelAccountPayload: CancelAccountPayload }>()
);

export const cancelAccountSuccessAction = createAction(
  type('[CancelAccount] Cancel account success'),
  props<{ props: AlertSheetProperties }>()
);

export const cancelAccountErrorAction = createAction(
  type('[CancelAccount] Cancel account error'),
  props<{ props: AlertSheetProperties }>()
);
