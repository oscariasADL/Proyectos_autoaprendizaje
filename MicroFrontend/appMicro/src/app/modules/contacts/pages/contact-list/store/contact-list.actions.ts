import { type } from '@commons/utils/util';
import {
  Contact,
  ContactParams
} from '@modules/contacts/entities/contact.interface';
import { createAction, props } from '@ngrx/store';

export const fetchContactsAction = createAction(
  type('[Global/API] Fetch contacts'),
  props<{ payload: ContactParams }>()
);

export const fetchContactsSuccessAction = createAction(
  type('[Global/API] Fetch contacts success'),
  props<{ contacts: Contact[] }>()
);

export const fetchContactsErrorAction = createAction(
  type('[Global/API] Fetch contacts error'),
  props<{ message: string }>()
);

export const setContactFilterAction = createAction(
  type('[Global/UI] Set contact filter'),
  props<{ filter: string }>()
);
