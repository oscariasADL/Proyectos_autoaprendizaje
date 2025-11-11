import { type } from '@commons/utils/util';
import { Product } from '@commons/entities/product/product.interface';
import {
  RemoveTrustRelationPayload,
  TrustRelationItem
} from '@modules/transfers/pages/transfers-trust-relation/entities/transfer-trust-relation.interface';
import { createAction, props } from '@ngrx/store';
import { ToastProperties } from '@commons/entities/toast/toast.entities';
import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';

export const fetchTrustRelationsAction = createAction(
  type('[Global/API] Fetch trust relations'),
  props<{ product: Product }>()
);

export const fetchTrustRelationsSuccessAction = createAction(
  type('[Global/API] Fetch trust relations success'),
  props<{ data: TrustRelationItem[] }>()
);

export const fetchTrustRelationsErrorAction = createAction(
  type('[Global/API] Fetch trust relations error'),
  props<{ message: string }>()
);

export const removeTrustRelationAction = createAction(
  type('[Global/API] Remove trust relation'),
  props<{ payload: RemoveTrustRelationPayload; product: Product }>()
);

export const removeTrustRelationSuccessAction = createAction(
  type('[Global/API] Remove trust relation success'),
  props<{ props: ToastProperties }>()
);

export const removeTrustRelationErrorAction = createAction(
  type('[Global/API] Remove trust relation error'),
  props<{ props: AlertSheetProperties }>()
);
