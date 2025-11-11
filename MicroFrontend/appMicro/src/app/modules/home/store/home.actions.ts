import { ProductCategory } from '@commons/entities/product/balance.interface';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';
import {
  HomeAlertIds,
  HomeAlertProperties
} from '../entities/home-alert.entities';

export const setProductCategoryFilterAction = createAction(
  type('[Global/UI] Set product category filter'),
  props<{ category: ProductCategory }>()
);

export const putHomeAlertAction = createAction(
  type('[Global/UI] PUT HOME ALERT'),
  props<{ alert: HomeAlertProperties }>()
);

export const removeHomeAlertAction = createAction(
  type('[Global/UI] REMOVE HOME ALERT'),
  props<{ id: HomeAlertIds }>()
);

export const setHomeTimerAction = createAction(
  type('[Global/UI] SET HOME TIMER'),
  props<{ time: number }>()
);

export const setHomeHasCreditProductsAction = createAction(
  type('[Global/UI] SET HOME HAS CREDIT PRODUCTS'),
  props<{ hasCreditProducts: boolean }>()
);

export const setHomeCreditProductsErrorAction = createAction(
  type('[Global/UI] SET HOME CREDIT PRODUCTS ERROR'),
  props<{ creditProductsError: boolean }>()
);
