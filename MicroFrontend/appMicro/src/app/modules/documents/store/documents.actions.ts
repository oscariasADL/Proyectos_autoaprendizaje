import { type } from '@commons/utils/util';
import { ProductDetail } from '@modules/product-detail/entities/product-detail.entity';
import { createAction, props } from '@ngrx/store';

export const setProductSelectedForDocumentAction = createAction(
  type('[Global/UI] Set product selected for document'),
  props<{ product: ProductDetail }>()
);
