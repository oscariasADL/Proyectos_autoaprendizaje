import { createAction, props } from '@ngrx/store';
import { type } from '@commons/utils/util';
import { AccountAvalKey } from '@modules/transfers/pages/transfers-aval-key/entities/transfers-aval-key.interface';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';

export const fetchAccountAvalKeyAction = createAction(
  type('[Transfer AVAL Key] Fetch Account Aval Key'),
  props<{ avalKey: string }>()
);

export const fetchAccountAvalKeySuccessAction = createAction(
  type('[Transfer AVAL Key] Fetch Account Aval Key success'),
  props<{ accountAvalKey: AccountAvalKey }>()
);

export const fetchAccountAvalKeyErrorAction = createAction(
  type('[Transfer AVAL Key] Fetch Account Aval Key error'),
  props<{ props: AlertSheetProperties }>()
);
