import { AlertSheetProperties } from '@commons/entities/alert/alert-sheet.entities';
import { type } from '@commons/utils/util';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import {
  CdtRenewalRequest,
  CdtRenewalResponse
} from '@modules/product-options/cdt-renewal/entities/cdt-renewal.entity';
import { createAction, props } from '@ngrx/store';

export const fetchCdtRenewalDetailAction = createAction(
  type('[Global/API] Fetch CDT renewal detail'),
  props<{ id: string }>()
);

export const fetchCdtRenewalDetailSuccessAction = createAction(
  type('[Global/API] Fetch CDT renewal detail success'),
  props<{ detail: CdtRenewalResponse }>()
);

export const fetchCdtRenewalDetailErrorAction = createAction(
  type('[Global/API] Fetch CDT renewal detail error'),
  props<{ message: string }>()
);

export const cleanCdtRenewalDetailAction = createAction(
  type('[Global/UI] Clean CDT renewal detail')
);

export const renewalCdtAction = createAction(
  type('[Global/API] Renewal CDT'),
  props<{ payload: CdtRenewalRequest; cdt: ProductDetail }>()
);

export const renewalCdtSuccessAction = createAction(
  type('[Global/API] Renewal CDT success'),
  props<{ props: AlertSheetProperties }>()
);

export const renewalCdtErrorAction = createAction(
  type('[Global/API] Renewal CDT error'),
  props<{ props: AlertSheetProperties }>()
);

export const cancelRenewalCdtAction = createAction(
  type('[Global/API] Cancel renewal CDT'),
  props<{ payload: CdtRenewalRequest }>()
);

export const cancelRenewalCdtSuccessAction = createAction(
  type('[Global/API] Cancel renewal CDT success'),
  props<{ props: AlertSheetProperties }>()
);

export const cancelRenewalCdtErrorAction = createAction(
  type('[Global/API] Cancel renewal CDT error'),
  props<{ props: AlertSheetProperties }>()
);
