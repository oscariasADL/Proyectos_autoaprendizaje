import { TypeAccount } from '@commons/entities/product/type-account';
import { type } from '@commons/utils/util';
import { createAction, props } from '@ngrx/store';
import { ProductDetail } from '../entities/product-detail.entity';

export const fetchProductDetailAction = createAction(
  type('[Global/API] Fetch product detail'),
  props<{ productType: TypeAccount; id: string }>()
);

export const fetchProductDetailSuccessAction = createAction(
  type('[Global/API] Fetch product detail success'),
  props<{ data: ProductDetail; id: string }>()
);

export const fetchProductDetailErrorAction = createAction(
  type('[Global/API] Fetch product detail error'),
  props<{ message: string }>()
);

export const setProductSelectedAction = createAction(
  type('[Global/UI] Set product selected'),
  props<{ product: ProductDetail }>()
);

export const fetchProductPayrollAdvanceAction = createAction(
  type('[Global/API] Fetch product payroll advance'),
  props<{ productNumber: string }>()
);

export const fetchProductPayrollAdvanceSuccessAction = createAction(
  type('[Global/API] Fetch product payroll advance success'),
  props<{ data: ProductDetail }>()
);

export const fetchProductPayrollAdvanceErrorAction = createAction(
  type('[Global/API] Fetch product payroll advance error'),
  props<{ message: string }>()
);

export const fetchProductPayrollAdvanceConfirmAction = createAction(
  type('[Global/API] Fetch product payroll advance confirm'),
  props<{ productNumber: string; totalAmount: number }>()
);

export const fetchProductPayrollAdvanceConfirmSuccessAction = createAction(
  type('[Global/API] Fetch product payroll advance confirm success'),
  props<{ data: ProductDetail }>()
);

export const fetchProductPayrollAdvanceConfirmErrorAction = createAction(
  type('[Global/API] Fetch product payroll advance confirm error'),
  props<{ message: string }>()
);
