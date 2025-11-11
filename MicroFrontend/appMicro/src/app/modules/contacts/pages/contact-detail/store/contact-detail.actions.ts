import { type } from '@commons/utils/util';
import {
  ContactId,
  ContactProduct
} from '@modules/contacts/entities/contact.interface';
import { createAction, props } from '@ngrx/store';

export const fetchContactProductsAction = createAction(
  type('[Global/API] Fetch contact products'),
  props<{ payload: ContactId }>()
);

export const fetchContactProductsSuccessAction = createAction(
  type('[Global/API] Fetch contact products success'),
  props<{ products: ContactProduct[] }>()
);

export const fetchContactProductsErrorAction = createAction(
  type('[Global/API] Fetch contact products error'),
  props<{ message: string }>()
);
